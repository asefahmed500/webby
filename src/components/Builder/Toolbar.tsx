import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useBuilder } from "@/context/BuilderContext";
import { Button } from "@/components/ui/button";
import PreviewMode from "./PreviewMode";
import PublishControl from "./PublishControl";
import { 
  Save, 
  Upload, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Trash, 
  Download,
  FileText,
  LayoutDashboard,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import PageManager from "./PageManager";
import SEOSettings from "./SEOSettings";

const Toolbar = () => {
  const { components, setComponents, previewMode, pages, currentPageId, websiteName, saveWebsite } = useBuilder();
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth if not logged in
  if (!user) {
    navigate("/auth");
    return null;
  }

  const [seoDialogOpen, setSeoDialogOpen] = useState(false);

  const handleSave = async () => {
    try {
      await saveWebsite();
      toast.success("Website saved successfully!");
    } catch (error) {
      console.error("Error saving website:", error);
      toast.error("Failed to save website");
    }
  };

  const handleLoad = () => {
    try {
      const savedData = localStorage.getItem("saved-website");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.pages) {
          window.location.reload(); // Reload the page to load the saved data
          toast.success("Website loaded successfully!");
        } else {
          toast("No saved website found");
        }
      } else {
        toast("No saved website found");
      }
    } catch (error) {
      toast.error("Failed to load website");
      console.error(error);
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the canvas? This action cannot be undone.")) {
      setComponents([]);
      toast("Canvas cleared");
    }
  };

  const handleExport = () => {
    const data = JSON.stringify({ pages }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "website-layout.json";
    a.click();
    
    URL.revokeObjectURL(url);
    toast("Website exported successfully!");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const currentPage = pages.find(page => page.id === currentPageId);

  return (
    <div className="h-14 border-b border-gray-200 bg-white px-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold mr-6">Webby</h1>
        
        {!previewMode && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleLoad}>
              <Upload className="h-4 w-4 mr-1" />
              Load
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear} className="text-red-500 hover:text-red-700">
              <Trash className="h-4 w-4 mr-1" />
              Clear
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Pages
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <PageManager />
              </SheetContent>
            </Sheet>
            
            <Button variant="outline" size="sm" onClick={handleDashboard}>
              <LayoutDashboard className="h-4 w-4 mr-1" />
              Dashboard
            </Button>
            
            <Sheet open={seoDialogOpen} onOpenChange={setSeoDialogOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  SEO
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SEOSettings onClose={() => setSeoDialogOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {!previewMode && (
          <div className="px-3 py-1.5 bg-gray-100 rounded text-sm text-gray-700 flex items-center">
            <span className="font-medium mr-1">Page:</span> 
            {pages.find(page => page.id === currentPageId)?.name || "Unknown"}
          </div>
        )}
        
        {previewMode && (
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={viewportSize === "mobile" ? "default" : "ghost"} 
              size="sm" 
              className="rounded-none px-2" 
              onClick={() => setViewportSize("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewportSize === "tablet" ? "default" : "ghost"} 
              size="sm" 
              className="rounded-none px-2" 
              onClick={() => setViewportSize("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewportSize === "desktop" ? "default" : "ghost"} 
              size="sm" 
              className="rounded-none px-2" 
              onClick={() => setViewportSize("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <PreviewMode />
        <PublishControl />
      </div>
    </div>
  );
};

export default Toolbar;
