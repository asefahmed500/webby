import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Globe, Settings, Edit } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Website } from "@/types/database.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Page } from "@/lib/pageData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, Plus, Globe, FileEdit, Trash2, BookOpen, Briefcase, ShoppingBag, Calendar } from "lucide-react";
import { useRequireAuth } from "@/hooks/useRedirectAuth";
import { defaultTemplates } from "@/lib/templateData";

export default function Dashboard() {
  const { user } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Require authentication for this page
  useRequireAuth();

  // Load user websites function
  const loadUserWebsites = async (userId: string, setWebsites: React.Dispatch<React.SetStateAction<Website[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      setWebsites(data as Website[]);
    } catch (error) {
      console.error('Error loading websites:', error);
      toast.error('Failed to load your websites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserWebsites(user.id, setWebsites, setLoading);
    }
  }, [user]);

  const handleNewWebsite = () => {
    navigate("/templates");
  };

  const handleEditWebsite = () => {
    navigate("/");
  };

  const handleDeleteWebsite = async () => {
    if (confirm("Are you sure you want to delete this website?")) {
      try {
        // Try to delete from Supabase first
        if (user) {
          const { error } = await supabase
            .from('websites')
            .delete()
            .eq('user_id', user.id);
            
          if (error) throw error;
        }
      } catch (error) {
        console.error("Error deleting from Supabase:", error);
      }
      
      // Delete from localStorage as fallback
      localStorage.removeItem("saved-website");
      localStorage.removeItem("published-website");
      setWebsites([]);
      toast.success("Website deleted successfully");
    }
  };

  const handlePreviewWebsite = () => {
    navigate("/preview");
  };

  const handleUseTemplate = (templateId: string) => {
    navigate(`/templates`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Webby Dashboard</h1>
          <p className="text-gray-600">Manage your websites and templates</p>
        </div>
        
        <Tabs defaultValue="websites" className="w-full">
          <TabsList>
            <TabsTrigger value="websites">My Websites</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="websites" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Your Websites</h2>
              <Button onClick={handleNewWebsite}>
                <Plus className="h-4 w-4 mr-1" />
                New Website
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading your websites...</p>
              ) : websites.length > 0 ? (
                websites.map((website) => (
                  <Card key={website.id} className="overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <Layout className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{website.name}</CardTitle>
                      <CardDescription>
                        {new Date(website.created_at).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{website.pages} pages</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          website.status === "published" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {website.status === "published" ? "Published" : "Draft"}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={handleEditWebsite}>
                        <FileEdit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePreviewWebsite}>
                        <Globe className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={handleDeleteWebsite}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="mb-4">
                    <Layout className="h-12 w-12 mx-auto text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No websites yet</h3>
                  <p className="text-gray-500 mb-4">Get started by creating your first website</p>
                  <Button onClick={handleNewWebsite}>
                    <Plus className="h-4 w-4 mr-1" />
                    Create Website
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Website Templates</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defaultTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    {template.id === 'education' && <BookOpen className="h-16 w-16 text-blue-500" />}
                    {template.id === 'portfolio' && <Briefcase className="h-16 w-16 text-indigo-500" />}
                    {template.id === 'ecommerce' && <ShoppingBag className="h-16 w-16 text-purple-500" />}
                    {template.id === 'booking' && <Calendar className="h-16 w-16 text-green-500" />}
                    {!['education', 'portfolio', 'ecommerce', 'booking'].includes(template.id) && 
                      <Layout className="h-16 w-16 text-gray-400" />}
                  </div>
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button onClick={() => handleUseTemplate(template.id)}>Use Template</Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/preview/${template.id}`)}
                    >
                      Preview
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
