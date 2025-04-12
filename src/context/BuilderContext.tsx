
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Component {
  id: string;
  type: string;
  content: string;
  styles: Record<string, string>;
  children: Component[];
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  components: Component[];
}

interface BuilderContextType {
  components: Component[];
  setComponents: React.Dispatch<React.SetStateAction<Component[]>>;
  selectedComponent: Component | null;
  setSelectedComponent: React.Dispatch<React.SetStateAction<Component | null>>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  draggedComponent: string | null;
  setDraggedComponent: React.Dispatch<React.SetStateAction<string | null>>;
  addComponent: (type: string, targetId?: string) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  removeComponent: (id: string) => void;
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ 
  children 
}) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const generateId = () => `component-${Math.random().toString(36).substr(2, 9)}`;

  const addComponent = (type: string, targetId?: string) => {
    const newComponent: Component = {
      id: generateId(),
      type,
      content: type === "text" ? "Edit this text" : "",
      styles: {},
      children: [],
    };

    if (!targetId) {
      setComponents(prev => [...prev, newComponent]);
      return;
    }

    // Add as a child of the target component
    setComponents(prev => 
      prev.map(component => {
        if (component.id === targetId) {
          return {
            ...component,
            children: [...component.children, newComponent]
          };
        }
        return component;
      })
    );
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    const updateComponentRecursive = (components: Component[]): Component[] => {
      return components.map(component => {
        if (component.id === id) {
          return { ...component, ...updates };
        }
        if (component.children.length > 0) {
          return {
            ...component,
            children: updateComponentRecursive(component.children)
          };
        }
        return component;
      });
    };

    setComponents(prev => updateComponentRecursive(prev));
  };

  const removeComponent = (id: string) => {
    const removeComponentRecursive = (components: Component[]): Component[] => {
      return components
        .filter(component => component.id !== id)
        .map(component => ({
          ...component,
          children: removeComponentRecursive(component.children)
        }));
    };

    setComponents(prev => removeComponentRecursive(prev));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  return (
    <BuilderContext.Provider
      value={{
        components,
        setComponents,
        selectedComponent,
        setSelectedComponent,
        isDragging,
        setIsDragging,
        draggedComponent,
        setDraggedComponent,
        addComponent,
        updateComponent,
        removeComponent,
        previewMode,
        setPreviewMode
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
