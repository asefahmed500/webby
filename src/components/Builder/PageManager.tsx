
import { useState } from "react";
import { useBuilder } from "@/context/BuilderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilePlus, FileX, File } from "lucide-react";
import { toast } from "sonner";

const PageManager = () => {
  const { 
    pages, 
    currentPageId, 
    setCurrentPageId, 
    addPage,
    removePage
  } = useBuilder();
  
  const [newPageName, setNewPageName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddPage = () => {
    if (!newPageName.trim()) {
      toast.error("Please enter a page name");
      return;
    }
    
    // Check if page name already exists
    const existingPage = pages.find(p => 
      p.name.toLowerCase() === newPageName.toLowerCase() ||
      p.id === newPageName.toLowerCase().replace(/\s+/g, '-')
    );
    
    if (existingPage) {
      toast.error("A page with this name already exists");
      return;
    }
    
    addPage(newPageName);
    setNewPageName("");
    setIsDialogOpen(false);
    toast.success(`Page "${newPageName}" created`);
  };
  
  const handleDeletePage = (id: string) => {
    const page = pages.find(p => p.id === id);
    
    if (page?.isHome) {
      toast.error("Cannot delete the home page");
      return;
    }
    
    if (confirm(`Are you sure you want to delete the page "${page?.name}"?`)) {
      removePage(id);
      toast.success(`Page deleted`);
    }
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-4 py-2">
        <h3 className="text-sm font-medium">Pages</h3>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 px-2">
              <FilePlus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  placeholder="Page name"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddPage()}
                />
              </div>
              <Button onClick={handleAddPage}>Create Page</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-1 px-2">
        {pages.map((page) => (
          <div 
            key={page.id}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer
              ${currentPageId === page.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            onClick={() => setCurrentPageId(page.id)}
          >
            <div className="flex items-center space-x-2">
              <File className="h-4 w-4" />
              <span className="text-sm">{page.name}</span>
              {page.isHome && (
                <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">Home</span>
              )}
            </div>
            
            {!page.isHome && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeletePage(page.id);
                }}
              >
                <FileX className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageManager;
