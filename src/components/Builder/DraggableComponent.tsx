
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

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComponent(component);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const componentType = e.dataTransfer.getData("componentType");
    if (componentType && componentType.startsWith("template:")) {
      // Handle template drop
      return;
    }
    
    if (componentType && (component.type === "container" || component.type === "card" || component.type === "navigation" || component.type === "footer")) {
      addComponent(componentType, component.id);
    }
  };

  const renderComponentContent = () => {
    switch (component.type) {
      case "container":
      case "card":
      case "navigation":
      case "footer":
        return (
          <div 
            className={cn(
              "relative",
              !previewMode && "min-h-[50px]"
            )}
            style={component.styles}
          >
            {component.children.map((child) => (
              <DraggableComponent 
                key={child.id} 
                component={child} 
                depth={depth + 1} 
              />
            ))}
            {!previewMode && component.children.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                Drop components here
              </div>
            )}
          </div>
        );
      case "text":
        return <p style={component.styles}>{component.content}</p>;
      case "heading":
        return <h2 style={component.styles}>{component.content}</h2>;
      case "image":
        return (
          <img 
            src={component.content || "https://placehold.co/600x400?text=Image"} 
            alt="Draggable component" 
            style={component.styles} 
          />
        );
      case "button":
        return (
          <button 
            className={previewMode ? "cursor-pointer" : "cursor-default"} 
            style={component.styles}
            onClick={(e) => previewMode ? null : e.preventDefault()}
          >
            {component.content || "Button"}
          </button>
        );
      case "divider":
        return <hr style={component.styles} />;
      default:
        return <div>Unknown component type: {component.type}</div>;
    }
  };

  // Don't show selection UI in preview mode
  const selectionClasses = previewMode 
    ? "" 
    : cn(
        "transition-all",
        isSelected && "outline outline-2 outline-blue-500",
        isDragging && "opacity-50"
      );

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

export default DraggableComponent;
