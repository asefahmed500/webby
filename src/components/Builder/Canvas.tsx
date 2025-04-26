
import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useBuilder } from "@/context/BuilderContext";
import DraggableComponent from "./DraggableComponent";
import { cn } from "@/lib/utils";
import { templates } from "@/lib/componentData";
import { Button } from "@/components/ui/button";
import { Home, User } from "lucide-react";

const Canvas = () => {
  const { 
    components, 
    setComponents, 
    draggedComponent, 
    setDraggedComponent, 
    setSelectedComponent,
    addComponent,
    previewMode
  } = useBuilder();

  // Use memoization for better performance and to avoid re-renders
  const memoizedComponents = useMemo(() => components, [components]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedComponent) return;
    
    if (draggedComponent.startsWith("template:")) {
      // Handle template drop
      const templateId = draggedComponent.replace("template:", "");
      const template = templates.find(t => t.id === templateId);
      
      if (template) {
        // Create deep copy of template components to avoid reference issues
        const templateComponentsCopy = JSON.parse(JSON.stringify(template.components));
        setComponents(prev => [...prev, ...templateComponentsCopy]);
      }
    } else {
      // Handle component drop
      addComponent(draggedComponent);
    }
    
    setDraggedComponent(null);
  }, [draggedComponent, setDraggedComponent, setComponents, addComponent]);

  const handleCanvasDragStart = useCallback((e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData("componentType", componentType);
  }, []);

  const handleCanvasClick = useCallback(() => {
    setSelectedComponent(null);
  }, [setSelectedComponent]);

  return (
    <>
      {/* Add navbar */}
      {!previewMode && (
        <div className="h-14 border-b border-gray-200 bg-white px-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="transition-colors hover:bg-gray-100">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="transition-colors hover:bg-gray-100">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      <div 
        className={cn(
          "flex-1 overflow-auto",
          previewMode ? "bg-white" : "bg-gray-50"
        )}
        onClick={handleCanvasClick}
      >
        <div
          className={cn(
            "min-h-full w-full p-8",
            previewMode ? "" : "shadow-sm"
          )}
          onDragOver={handleDragOver}
          onDrop={!previewMode ? handleDrop : undefined}
          onDragStart={(e) => draggedComponent && handleCanvasDragStart(e, draggedComponent)}
        >
          {components.length === 0 && !previewMode ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 animate-fade-in">
              <p className="mb-2">Drag and drop components here</p>
              <p className="text-sm">or select a template from the sidebar</p>
            </div>
          ) : (
            memoizedComponents.map((component) => (
              <DraggableComponent 
                key={component.id} 
                component={component} 
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Canvas);
