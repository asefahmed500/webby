
import React, { useCallback } from "react";
import { useBuilder } from "@/context/BuilderContext";
import DraggableComponent from "./DraggableComponent";
import { cn } from "@/lib/utils";
import { templates } from "@/lib/componentData";

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

  // Check if components is ready to render to avoid flickering
  const showEmptyState = components.length === 0 && !previewMode;

  return (
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
        {showEmptyState ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <p className="mb-2">Drag and drop components here</p>
            <p className="text-sm">or select a template from the sidebar</p>
          </div>
        ) : (
          components.map((component) => (
            <DraggableComponent 
              key={component.id} 
              component={component} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(Canvas);
