
import React, { useCallback, useMemo } from "react";
import { useBuilder, Component } from "@/context/BuilderContext";
import { cn } from "@/lib/utils";

interface DraggableComponentProps {
  component: Component;
  depth?: number;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ 
  component,
  depth = 0
}) => {
  const { 
    selectedComponent, 
    setSelectedComponent, 
    isDragging,
    addComponent,
    previewMode
  } = useBuilder();
  
  const isSelected = selectedComponent?.id === component.id;

  // Use memoization to prevent unnecessary re-renders
  const memoizedChildren = useMemo(() => component.children, [component.children]);
  const memoizedStyles = useMemo(() => component.styles, [component.styles]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComponent(component);
  }, [component, setSelectedComponent]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const componentType = e.dataTransfer.getData("componentType");
    if (componentType && componentType.startsWith("template:")) {
      // Handle template drop
      return;
    }
    
    if (componentType && (component.type === "container" || component.type === "card" || component.type === "navigation" || component.type === "footer" || component.type === "form" || component.type === "testimonial")) {
      addComponent(componentType, component.id);
    }
  }, [component, addComponent]);

  const renderComponentContent = () => {
    switch (component.type) {
      case "container":
      case "card":
      case "navigation":
      case "footer":
      case "form":
      case "testimonial":
        return (
          <div 
            className={cn(
              "relative",
              !previewMode && "min-h-[50px]"
            )}
            style={memoizedStyles}
          >
            {memoizedChildren.map((child) => (
              <DraggableComponent 
                key={child.id} 
                component={child} 
                depth={depth + 1} 
              />
            ))}
            {!previewMode && memoizedChildren.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                Drop components here
              </div>
            )}
          </div>
        );
      case "text":
        return <p style={memoizedStyles} className="transition-all">{component.content}</p>;
      case "heading":
        return <h2 style={memoizedStyles} className="transition-all">{component.content}</h2>;
      case "image":
        return (
          <img 
            src={component.content || "https://placehold.co/600x400?text=Image"} 
            alt="Draggable component" 
            style={memoizedStyles}
            className="transition-all" 
            loading="lazy"
          />
        );
      case "button":
        return (
          <button 
            className={cn(
              previewMode ? "cursor-pointer" : "cursor-default",
              "transition-all"
            )} 
            style={memoizedStyles}
            onClick={(e) => previewMode ? null : e.preventDefault()}
          >
            {component.content || "Button"}
          </button>
        );
      case "divider":
        return <hr style={memoizedStyles} className="transition-all" />;
      case "input":
        return (
          <input 
            type="text" 
            placeholder={component.content || "Enter text..."} 
            style={memoizedStyles} 
            className={cn(
              previewMode ? "cursor-text" : "cursor-default",
              "transition-all"
            )}
            onClick={(e) => previewMode ? null : e.stopPropagation()}
            readOnly={!previewMode}
          />
        );
      case "pricing":
        return (
          <div style={memoizedStyles} className="pricing-block transition-all">
            {memoizedChildren.map((child) => (
              <DraggableComponent 
                key={child.id} 
                component={child} 
                depth={depth + 1} 
              />
            ))}
            {!previewMode && memoizedChildren.length === 0 && (
              <div className="flex items-center justify-center text-gray-400 text-sm h-[100px]">
                Pricing component (add content)
              </div>
            )}
          </div>
        );
      default:
        return <div>Unknown component type: {component.type}</div>;
    }
  };

  // Optimize selection UI render
  const selectionClasses = useMemo(() => {
    if (previewMode) return "";
    return cn(
      "transition-all",
      isSelected && "outline outline-2 outline-blue-500",
      isDragging && "opacity-50"
    );
  }, [previewMode, isSelected, isDragging]);

  return (
    <div
      className={cn(
        "relative",
        selectionClasses,
        !previewMode && "hover:outline hover:outline-1 hover:outline-gray-300"
      )}
      onClick={!previewMode ? handleClick : undefined}
      onDragOver={!previewMode ? handleDragOver : undefined}
      onDrop={!previewMode ? handleDrop : undefined}
    >
      {renderComponentContent()}
    </div>
  );
};

export default React.memo(DraggableComponent);
