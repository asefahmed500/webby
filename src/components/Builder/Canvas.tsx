
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBuilder } from "@/context/BuilderContext";
import DraggableComponent from "./DraggableComponent";
import { cn } from "@/lib/utils";
import { templates } from "@/lib/componentData";
import { Button } from "@/components/ui/button";
import { Home, User, Smartphone, Tablet, Monitor, Plus } from "lucide-react";

const Canvas = () => {
  const { 
    components, 
    setComponents, 
    draggedComponent, 
    setDraggedComponent, 
    setSelectedComponent,
    addComponent,
    previewMode,
    viewportSize,
    setViewportSize,
    lastSaved,
    isSaving
  } = useBuilder();

  // Show drag preview when dragging a component
  const [dragPreview, setDragPreview] = useState({
    visible: false,
    x: 0,
    y: 0,
    type: ""
  });

  // Use memoization for better performance and to avoid re-renders
  const memoizedComponents = useMemo(() => components, [components]);

  // Handle mousemove to update drag preview position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedComponent && !draggedComponent.includes('component-')) {
        setDragPreview({
          visible: true,
          x: e.clientX,
          y: e.clientY,
          type: draggedComponent
        });
      } else {
        setDragPreview({
          visible: false,
          x: 0,
          y: 0,
          type: ""
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [draggedComponent]);

  // Clear drag preview when drag ends
  useEffect(() => {
    const handleMouseUp = () => {
      setDragPreview({
        visible: false,
        x: 0,
        y: 0,
        type: ""
      });
    };
    
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  // Format last saved time
  const formattedLastSaved = useMemo(() => {
    if (!lastSaved) return 'Not saved yet';
    
    const now = new Date();
    const diffMs = now.getTime() - lastSaved.getTime();
    const diffSec = Math.round(diffMs / 1000);
    
    if (diffSec < 60) return 'Just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    
    return lastSaved.toLocaleDateString();
  }, [lastSaved]);

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

  // Get viewport class based on selected size
  const viewportClass = useMemo(() => {
    switch (viewportSize) {
      case 'mobile':
        return 'max-w-[375px] mx-auto border-x shadow-sm h-[80vh] overflow-auto';
      case 'tablet':
        return 'max-w-[768px] mx-auto border-x shadow-sm h-[80vh] overflow-auto';
      default:
        return 'w-full h-[80vh] overflow-auto';
    }
  }, [viewportSize]);

  return (
    <div className="flex flex-col h-full">
      {/* Add navbar */}
      {!previewMode && (
        <div className="h-14 border-b border-gray-200 bg-white backdrop-blur-sm px-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
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
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {isSaving ? 'Saving...' : `Saved: ${formattedLastSaved}`}
            </div>
            
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={viewportSize === "mobile" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-none px-2" 
                onClick={() => setViewportSize("mobile")}
                title="Mobile view"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewportSize === "tablet" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-none px-2" 
                onClick={() => setViewportSize("tablet")}
                title="Tablet view"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewportSize === "desktop" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-none px-2" 
                onClick={() => setViewportSize("desktop")}
                title="Desktop view"
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div 
        className={cn(
          "flex-1 bg-gray-100 p-6",
          previewMode ? "bg-white" : "bg-gray-100"
        )}
        onClick={handleCanvasClick}
      >
        <div
          className={cn(
            "bg-white min-h-full transition-all duration-300 mx-auto",
            viewportClass,
            previewMode ? "" : "shadow-lg rounded-md"
          )}
          onDragOver={handleDragOver}
          onDrop={!previewMode ? handleDrop : undefined}
          onDragStart={(e) => draggedComponent && handleCanvasDragStart(e, draggedComponent)}
        >
          {components.length === 0 && !previewMode ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-12 text-center max-w-md">
                <div className="mx-auto bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">Your canvas is empty</p>
                <p className="mb-6 text-gray-500">Drag and drop components from the sidebar to start building your website</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-white"
                  onClick={() => addComponent('container')}
                >
                  Add a Container
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              {memoizedComponents.map((component) => (
                <DraggableComponent 
                  key={component.id} 
                  component={component} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Component drag preview */}
      {dragPreview.visible && (
        <div 
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 opacity-70 bg-white p-2 rounded border shadow-md"
          style={{
            left: `${dragPreview.x}px`,
            top: `${dragPreview.y}px`,
            maxWidth: '120px'
          }}
        >
          <div className="text-xs font-medium">{dragPreview.type}</div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Canvas);
