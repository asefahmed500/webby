
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Page } from "@/lib/pageData";
import { toast } from "sonner";
import { Layout, Plus, Globe, FileEdit, Trash2, LogOut, User } from "lucide-react";

export default function Dashboard() {
  const { user, isLoading, signOut } = useAuth();
  const [websites, setWebsites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user) {
      // In a real app, this would fetch websites from Supabase
      // For now, we'll use localStorage and simulate storing by user ID
      try {
        const savedData = localStorage.getItem("saved-website");
        if (savedData) {
          const data = JSON.parse(savedData);
          setWebsites([{
            id: "1",
            name: "My Website",
            created_at: new Date().toISOString(),
            pages: data.pages?.length || 0,
            status: "published"
          }]);
        }
      } catch (error) {
        console.error("Error loading websites:", error);
      }
      setLoading(false);
    }
  }, [user]);

  const handleNewWebsite = () => {
    navigate("/");
  };

  const handleEditWebsite = () => {
    navigate("/");
  };

  const handleDeleteWebsite = () => {
    if (confirm("Are you sure you want to delete this website?")) {
      localStorage.removeItem("saved-website");
      setWebsites([]);
      toast.success("Website deleted successfully");
    }
  };

  const handlePreviewWebsite = () => {
    navigate("/preview");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard navbar */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Website Builder Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleProfile}>
              <User className="h-4 w-4 mr-1" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {website.status}
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
                <div className="col-span-3 text-center py-12">
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
              {/* Template cards would go here */}
              <Card>
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <Layout className="h-12 w-12 text-gray-400" />
                </div>
                <CardHeader>
                  <CardTitle>Business Website</CardTitle>
                  <CardDescription>Professional template for small businesses</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={() => navigate("/")}>Use Template</Button>
                </CardFooter>
              </Card>
              <Card>
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <Layout className="h-12 w-12 text-gray-400" />
                </div>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>Showcase your work with this template</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={() => navigate("/")}>Use Template</Button>
                </CardFooter>
              </Card>
              <Card>
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <Layout className="h-12 w-12 text-gray-400" />
                </div>
                <CardHeader>
                  <CardTitle>E-commerce Store</CardTitle>
                  <CardDescription>Start selling products online</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={() => navigate("/")}>Use Template</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
