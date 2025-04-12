
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
} from "@/components/ui/dialog";
import { Globe, Check } from "lucide-react";

const PublishControl = () => {
  const { user } = useAuth();
  const { publishStatus, setPublishStatus, pages } = useBuilder();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handlePublish = () => {
    if (!user) {
      toast.error("Please log in to publish your website");
      setIsDialogOpen(false);
      return;
    }
    
    setIsPublishing(true);
    
    // Save the website data with publication details
    const websiteData = {
      pages,
      publishedAt: new Date().toISOString(),
      userId: user.id
    };
    
    // Simulate publishing process
    setTimeout(() => {
      localStorage.setItem("saved-website", JSON.stringify(websiteData));
      setPublishStatus("published");
      setIsPublishing(false);
      setIsDialogOpen(false);
      
      toast.success("Website published successfully!", {
        description: "Your website is now live.",
        action: {
          label: "View Site",
          onClick: () => window.open("/preview", "_blank"),
        },
      });
    }, 2000);
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
