
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useBuilder } from "@/context/BuilderContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { publishWebsite } from "@/lib/supabaseHelpers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Globe, Check, ExternalLink, Loader2 } from "lucide-react";

const PublishControl = () => {
  const { user } = useAuth();
  const { publishStatus, setPublishStatus, pages, websiteName, saveWebsite, currentPageId, websiteId } = useBuilder();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [liveUrl, setLiveUrl] = useState("");
  
  useEffect(() => {
    // Set the live URL
    setLiveUrl(getLiveUrl());
  }, []);
  
  const getLiveUrl = () => {
    // Generate a URL for the live site preview
    return `${window.location.origin}/preview`;
  };
  
  const handlePublish = async () => {
    if (!user) {
      toast.error("Please log in to publish your website");
      setIsDialogOpen(false);
      return;
    }
    
    setIsPublishing(true);
    
    try {
      // First save the website to make sure all changes are stored
      setPublishProgress(20);
      await saveWebsite();
      setPublishProgress(40);
      
      // Get the latest saved data from localStorage
      const savedData = localStorage.getItem("saved-website");
      if (!savedData) {
        throw new Error("No saved website data found");
      }
      
      setPublishProgress(60);
      const parsedData = JSON.parse(savedData);
      
      // Then prepare the published version data
      const websiteData = {
        ...parsedData,
        pages: parsedData.pages || [],
        publishedAt: new Date().toISOString(),
        userId: user.id,
        publishStatus: "published",
        websiteName: websiteName || "My Website",
        currentPageId
      };
      
      console.log("Publishing website data:", JSON.stringify(websiteData));
      setPublishProgress(80);
      
      // Save to Supabase and localStorage
      await publishWebsite(websiteData);
      
      // Update publish status
      setPublishStatus("published");
      setIsDialogOpen(false);
      setPublishProgress(100);
      
      toast.success("Website published successfully!", {
        description: "Your website is now live.",
        action: {
          label: "View Site",
          onClick: () => window.open(getLiveUrl(), "_blank"),
        },
      });
    } catch (error) {
      console.error("Error publishing website:", error);
      toast.error("Failed to publish website");
    } finally {
      setIsPublishing(false);
      // Reset progress after a delay
      setTimeout(() => setPublishProgress(0), 1000);
    }
  };
  
  const handleViewLive = () => {
    window.open(getLiveUrl(), "_blank");
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={publishStatus === "published" ? "default" : "outline"}
          className={cn(
            publishStatus === "published" ? "bg-green-600 hover:bg-green-700" : "",
            "transition-colors"
          )}
        >
          {publishStatus === "published" ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Published
            </>
          ) : (
            <>
              <Globe className="h-4 w-4 mr-1" />
              Publish
            </>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Publish Website</DialogTitle>
          <DialogDescription>
            This will make your website publicly accessible via the preview URL.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <p>
              {publishStatus === "published" 
                ? "Your website is currently published. Do you want to update it with your latest changes?" 
                : "This will make your website live and accessible to the public."}
            </p>
            
            {!user && (
              <div className="border-l-4 border-amber-500 bg-amber-50 p-3 rounded animate-fade-in">
                <p className="text-amber-800 text-sm">
                  You need to be logged in to publish your website. Your changes will be saved but not published.
                </p>
              </div>
            )}
            
            {publishStatus === "published" && (
              <div className="border rounded-md p-3 bg-blue-50 animate-fade-in">
                <p className="text-blue-800 text-sm font-medium mb-2">Your website is live at:</p>
                <div className="flex items-center justify-between">
                  <code className="bg-white px-2 py-1 rounded text-sm">{getLiveUrl()}</code>
                  <Button variant="outline" size="sm" onClick={handleViewLive} className="ml-2">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            )}
            
            <div className="border rounded-md p-3 bg-gray-50">
              <h4 className="font-medium mb-2">Website details:</h4>
              <p className="text-sm">Name: {websiteName || "My Website"}</p>
              <p className="text-sm">Pages: {pages.length}</p>
              <p className="text-sm">Status: {publishStatus === "published" ? "Live" : "Draft"}</p>
            </div>

            {isPublishing && publishProgress > 0 && (
              <div className="space-y-2 animate-fade-in">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${publishProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {publishProgress < 100 ? 'Publishing...' : 'Complete!'}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handlePublish} 
            disabled={isPublishing}
            className={cn(
              publishStatus === "published" ? "bg-blue-600 hover:bg-blue-700" : "",
              "transition-colors"
            )}
          >
            {isPublishing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : (
              publishStatus === "published" ? "Update Site" : "Publish Site"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishControl;
