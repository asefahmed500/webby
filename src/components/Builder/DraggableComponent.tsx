
import React, { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { useBuilder, Component } from "@/context/BuilderContext";
import { cn } from "@/lib/utils";
import { calculateGuidelines, springAnimate, applyShimmerEffect } from "@/lib/animationUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash, Move, Copy, ChevronDown, ChevronUp } from "lucide-react";

interface DraggableComponentProps {
  component: Component;
  depth?: number;
  preview?: boolean;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ 
  component,
  depth = 0,
  preview = false
}) => {
  const { 
    selectedComponent, 
    setSelectedComponent, 
    isDragging,
    addComponent,
    previewMode,
    removeComponent,
    updateComponent
  } = useBuilder();
  
  // Use preview prop or context's previewMode
  const isPreview = preview || previewMode;
  
  const isSelected = selectedComponent?.id === component.id;
  const componentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [guidelines, setGuidelines] = useState<{ position: number; type: 'horizontal' | 'vertical'; strength: number; }[]>([]);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [isDraggingSelf, setIsDraggingSelf] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Use memoization to prevent unnecessary re-renders
  const memoizedChildren = useMemo(() => component.children, [component.children]);
  const memoizedStyles = useMemo(() => component.styles, [component.styles]);

  // Handle keyboard shortcuts for selected component
  useEffect(() => {
    if (!isSelected || isPreview) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle delete
      if ((e.key === 'Delete' || e.key === 'Backspace') && isSelected) {
        e.preventDefault();
        removeComponent(component.id);
      }
      
      // Handle arrow keys for nudging elements
      if (isSelected && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        
        const delta = e.shiftKey ? 10 : 1;
        const currentStyles = {...component.styles};
        
        // Calculate position changes
        if (e.key === 'ArrowUp') {
          currentStyles.marginTop = `${parseInt(currentStyles.marginTop || '0') - delta}px`;
        } else if (e.key === 'ArrowDown') {
          currentStyles.marginTop = `${parseInt(currentStyles.marginTop || '0') + delta}px`;
        } else if (e.key === 'ArrowLeft') {
          currentStyles.marginLeft = `${parseInt(currentStyles.marginLeft || '0') - delta}px`;
        } else if (e.key === 'ArrowRight') {
          currentStyles.marginLeft = `${parseInt(currentStyles.marginLeft || '0') + delta}px`;
        }
        
        updateComponent(component.id, { styles: currentStyles });
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected, component.id, isPreview, removeComponent, updateComponent, component.styles]);

  // Apply shimmer effect when component is loading
  useEffect(() => {
    if (isLoading && componentRef.current) {
      const removeShimmer = applyShimmerEffect(componentRef.current);
      return () => removeShimmer();
    }
  }, [isLoading]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComponent(component);
  }, [component, setSelectedComponent]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    if (isPreview) return;
    
    // Show guidelines when dragging over component
    if (componentRef.current && e.dataTransfer.types.includes('componentType')) {
      const elementRect = componentRef.current.getBoundingClientRect();
      const newGuidelines = calculateGuidelines([], elementRect);
      setGuidelines(newGuidelines);
    }
  }, [isPreview]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (isPreview) return;
    
    componentRef.current?.classList.add('ring-2', 'ring-blue-400', 'ring-opacity-70');
  }, [isPreview]);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (isPreview) return;
    
    componentRef.current?.classList.remove('ring-2', 'ring-blue-400', 'ring-opacity-70');
    setGuidelines([]);
  }, [isPreview]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPreview) return;
    
    setGuidelines([]);
    componentRef.current?.classList.remove('ring-2', 'ring-blue-400', 'ring-opacity-70');
    
    const componentType = e.dataTransfer.getData("componentType");
    if (componentType && componentType.startsWith("template:")) {
      // Handle template drop
      return;
    }
    
    if (componentType && (component.type === "container" || component.type === "card" || component.type === "navigation" || component.type === "footer" || component.type === "form" || component.type === "testimonial")) {
      setIsLoading(true);
      
      // Add component with a slight delay for visual feedback
      setTimeout(() => {
        addComponent(componentType, component.id);
        setIsLoading(false);
      }, 300);
    }
  }, [component, addComponent, isPreview]);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    if (isPreview) {
      e.preventDefault();
      return;
    }
    
    setIsDraggingSelf(true);
    
    // Set drag image (show a small preview)
    if (componentRef.current) {
      // Create ghost image with reduced opacity
      const rect = componentRef.current.getBoundingClientRect();
      const ghostElement = componentRef.current.cloneNode(true) as HTMLDivElement;
      
      ghostElement.style.position = 'absolute';
      ghostElement.style.top = '0';
      ghostElement.style.left = '0';
      ghostElement.style.width = `${rect.width}px`;
      ghostElement.style.height = `${rect.height}px`;
      ghostElement.style.opacity = '0.6';
      ghostElement.style.pointerEvents = 'none';
      ghostElement.style.zIndex = '9999';
      ghostElement.style.transform = 'scale(0.5)';
      
      document.body.appendChild(ghostElement);
      e.dataTransfer.setDragImage(ghostElement, rect.width / 4, rect.height / 4);
      
      // Capture starting position
      const initialX = e.clientX;
      const initialY = e.clientY;
      setDragStartPos({ x: initialX, y: initialY });
      
      // Clean up ghost element after drag
      setTimeout(() => {
        document.body.removeChild(ghostElement);
      }, 0);
    }
    
    e.dataTransfer.setData('text/plain', component.id);
    e.dataTransfer.effectAllowed = 'move';
  }, [component.id, isPreview]);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    if (isPreview) return;
    
    setIsDraggingSelf(false);
    setGuidelines([]);
    
    // Apply spring animation when dropping the element
    if (componentRef.current) {
      const endX = e.clientX - dragStartPos.x;
      const endY = e.clientY - dragStartPos.y;
      
      if (Math.abs(endX) > 5 || Math.abs(endY) > 5) {
        springAnimate(componentRef.current, { x: 0, y: 0 }, { x: 0, y: 0 }, 300);
      }
    }
  }, [dragStartPos, isPreview]);

  // Handle component duplication
  const handleDuplicate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create a deep copy of the component
    const componentCopy = JSON.parse(JSON.stringify(component));
    componentCopy.id = `component-${Math.random().toString(36).substr(2, 9)}`;
    
    // If the component has children, generate new IDs for them
    const generateNewIds = (comp: Component): Component => {
      return {
        ...comp,
        id: `component-${Math.random().toString(36).substr(2, 9)}`,
        children: comp.children.map(generateNewIds)
      };
    };
    
    const newComponent = generateNewIds(componentCopy);
    
    // Add the new component to the parent's children or to the root level
    const parentId = null; // In a real implementation, you'd track parent IDs
    if (parentId) {
      // Add to parent's children
      // This would require tracking parent-child relationships
    } else {
      // Add to root level
      addComponent(newComponent.type);
    }
  }, [component, addComponent]);

  const renderComponentContent = () => {
    if (isLoading) {
      return <Skeleton className="w-full h-20" />;
    }
    
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
              !isPreview && "min-h-[50px]"
            )}
            style={memoizedStyles}
          >
            {memoizedChildren.map((child) => (
              <DraggableComponent 
                key={child.id} 
                component={child} 
                depth={depth + 1} 
                preview={isPreview}
              />
            ))}
            {!isPreview && memoizedChildren.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300">
                  Drop components here
                </div>
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
            onLoad={() => setIsLoading(false)}
          />
        );
      case "button":
        return (
          <button 
            className={cn(
              isPreview ? "cursor-pointer" : "cursor-default",
              "transition-all"
            )} 
            style={memoizedStyles}
            onClick={(e) => isPreview ? null : e.preventDefault()}
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
              isPreview ? "cursor-text" : "cursor-default",
              "transition-all"
            )}
            onClick={(e) => isPreview ? null : e.stopPropagation()}
            readOnly={!isPreview}
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
                preview={isPreview}
              />
            ))}
            {!isPreview && memoizedChildren.length === 0 && (
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

  // Component toolbar with actions
  const ComponentToolbar = () => {
    if (isPreview || !isSelected) return null;
    
    return (
      <div className="absolute -top-8 right-0 bg-white rounded-t-md shadow-md flex z-10">
        <button
          className="p-1 hover:bg-gray-100 text-gray-700 rounded-tl-md"
          title="Duplicate"
          onClick={handleDuplicate}
        >
          <Copy size={14} />
        </button>
        <button 
          className="p-1 hover:bg-gray-100 text-gray-700"
          title="Move"
        >
          <Move size={14} />
        </button>
        <button 
          className="p-1 hover:bg-red-100 text-red-500 rounded-tr-md"
          title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            removeComponent(component.id);
          }}
        >
          <Trash size={14} />
        </button>
      </div>
    );
  };

  // Component label
  const ComponentLabel = () => {
    if (isPreview) return null;
    
    return (
      <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-t-md z-10">
        {component.type}
      </div>
    );
  };

  // Optimize selection UI render
  const selectionClasses = useMemo(() => {
    if (isPreview) return "";
    return cn(
      "transition-all duration-200",
      isSelected && "outline outline-2 outline-blue-500",
      isDragging && "opacity-50",
      isDraggingSelf && "opacity-70 shadow-lg"
    );
  }, [isPreview, isSelected, isDragging, isDraggingSelf]);

  return (
    <div
      ref={componentRef}
      className={cn(
        "relative mb-3",
        selectionClasses,
        !isPreview && "hover:outline hover:outline-1 hover:outline-gray-300",
        !isPreview && hovered && "shadow-sm"
      )}
      onClick={!isPreview ? handleClick : undefined}
      onDragOver={!isPreview ? handleDragOver : undefined}
      onDragEnter={!isPreview ? handleDragEnter : undefined}
      onDragLeave={!isPreview ? handleDragLeave : undefined}
      onDrop={!isPreview ? handleDrop : undefined}
      onDragStart={!isPreview ? handleDragStart : undefined}
      onDragEnd={!isPreview ? handleDragEnd : undefined}
      draggable={!isPreview}
      data-component-id={component.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isSelected && <ComponentToolbar />}
      {hovered && !isPreview && <ComponentLabel />}
      
      {renderComponentContent()}
      
      {/* Guidelines */}
      {guidelines.map((guide, index) => (
        <div 
          key={`${guide.type}-${index}`}
          className={cn(
            "absolute pointer-events-none",
            guide.type === 'horizontal' ? 'left-0 right-0 h-px' : 'top-0 bottom-0 w-px',
            'bg-blue-500 z-50'
          )}
          style={{
            [guide.type === 'horizontal' ? 'top' : 'left']: `${guide.position}px`,
            opacity: guide.strength * 0.8
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(DraggableComponent);
