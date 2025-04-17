
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Globe } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { useRequireAuth } from "@/hooks/useRedirectAuth";

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [websites, setWebsites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Require authentication for this page
  useRequireAuth();

  useEffect(() => {
    if (user) {
      // Set default name from email
      setName(user.email?.split('@')[0] || "");
      
      // In a real app, this would fetch websites from Supabase
      // For now, we'll use localStorage and simulate storing by user ID
      try {
        const savedData = localStorage.getItem("saved-website");
        if (savedData) {
          const data = JSON.parse(savedData);
          setWebsites([{
            id: "1",
            name: data.websiteName || "My Website",
            created_at: new Date().toISOString(),
            url: "/preview"
          }]);
        }
      } catch (error) {
        console.error("Error loading websites:", error);
      }
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would update the user's profile in Supabase
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Your Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">Your email address cannot be changed</p>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Display Name</label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  <Button type="submit" className="mt-2" disabled={loading}>
                    <Save className="h-4 w-4 mr-1" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Published websites */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Published Websites</CardTitle>
              </CardHeader>
              <CardContent>
                {websites.length > 0 ? (
                  <ul className="space-y-4">
                    {websites.map(website => (
                      <li key={website.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="font-medium">{website.name}</div>
                        <div className="text-sm text-gray-500 mb-1">
                          {new Date(website.created_at).toLocaleDateString()}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(website.url)}
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          View Site
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No published websites yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
