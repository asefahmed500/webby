
import { useState } from "react";
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
  AlertCircle,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import PageManager from "./PageManager";

const Toolbar = () => {
  const { components, setComponents, previewMode, pages, currentPageId } = useBuilder();
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const handleSave = () => {
    const data = JSON.stringify({ pages });
    localStorage.setItem("saved-website", data);
    toast.success("Website saved successfully!");
  };

  const handleLoad = () => {
    try {
      const savedData = localStorage.getItem("saved-website");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.pages) {
          // Handle legacy format or new format
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

  const currentPage = pages.find(page => page.id === currentPageId);

  return (
    <div className="h-14 border-b border-gray-200 bg-white px-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold mr-6">Website Builder</h1>
        
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
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {!previewMode && (
          <div className="px-3 py-1.5 bg-gray-100 rounded text-sm text-gray-700 flex items-center">
            <span className="font-medium mr-1">Page:</span> 
            {currentPage?.name || "Unknown"}
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
        
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
          <AlertCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
