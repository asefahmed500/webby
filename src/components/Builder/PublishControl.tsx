
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useBuilder } from "@/context/BuilderContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Globe, Check } from "lucide-react";

const PublishControl = () => {
  const { user } = useAuth();
  const { publishStatus, setPublishStatus, pages, websiteName, saveWebsite, currentPageId } = useBuilder();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handlePublish = async () => {
    if (!user) {
      toast.error("Please log in to publish your website");
      setIsDialogOpen(false);
      return;
    }
    
    setIsPublishing(true);
    
    try {
      // Save the website using the context's saveWebsite function first
      await saveWebsite();
      
      // Get the latest saved data from localStorage
      const savedData = localStorage.getItem("saved-website");
      if (!savedData) {
        throw new Error("No saved website data found");
      }
      
      const parsedData = JSON.parse(savedData);
      
      // Then prepare the published version data with the saved pages
      const websiteData = {
        pages: parsedData.pages || [],
        publishedAt: new Date().toISOString(),
        userId: user.id,
        publishStatus: "published",
        websiteName: websiteName || "My Website",
        currentPageId
      };
      
      console.log("Publishing website data:", JSON.stringify(websiteData));
      
      // Specifically save the published version
      localStorage.setItem("published-website", JSON.stringify(websiteData));
      
      setPublishStatus("published");
      setIsDialogOpen(false);
      
      toast.success("Website published successfully!", {
        description: "Your website is now live.",
        action: {
          label: "View Site",
          onClick: () => window.open("/preview", "_blank"),
        },
      });
    } catch (error) {
      console.error("Error publishing website:", error);
      toast.error("Failed to publish website");
    } finally {
      setIsPublishing(false);
    }
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={publishStatus === "published" ? "default" : "outline"}
          className={publishStatus === "published" ? "bg-green-600 hover:bg-green-700" : ""}
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
              <div className="border-l-4 border-amber-500 bg-amber-50 p-3 rounded">
                <p className="text-amber-800 text-sm">
                  You need to be logged in to publish your website. Your changes will be saved but not published.
                </p>
              </div>
            )}
            
            <div className="border rounded-md p-3 bg-gray-50">
              <h4 className="font-medium mb-2">Website details:</h4>
              <p className="text-sm">Name: {websiteName || "My Website"}</p>
              <p className="text-sm">Pages: {pages.length}</p>
              <p className="text-sm">Status: {publishStatus === "published" ? "Live" : "Draft"}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handlePublish} 
            disabled={isPublishing}
            className={publishStatus === "published" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            {isPublishing ? "Publishing..." : 
              (publishStatus === "published" ? "Update Site" : "Publish Site")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishControl;
