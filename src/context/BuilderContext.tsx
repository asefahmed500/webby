
import React, { createContext, useContext, useState, ReactNode } from "react";
import { defaultPages, Page } from "@/lib/pageData";

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
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  currentPageId: string;
  setCurrentPageId: React.Dispatch<React.SetStateAction<string>>;
  addPage: (name: string) => void;
  removePage: (id: string) => void;
  publishStatus: "draft" | "published";
  setPublishStatus: React.Dispatch<React.SetStateAction<"draft" | "published">>;
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
  const [pages, setPages] = useState<Page[]>(defaultPages);
  const [currentPageId, setCurrentPageId] = useState<string>("home");
  const [publishStatus, setPublishStatus] = useState<"draft" | "published">("draft");
  
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
      
      // Also update the component in the current page
      setPages(prev => prev.map(page => 
        page.id === currentPageId ? {
          ...page,
          components: [...page.components, newComponent]
        } : page
      ));
      
      return;
    }

    // Add as a child of the target component
    const updatedComponents = components.map(component => {
      if (component.id === targetId) {
        return {
          ...component,
          children: [...component.children, newComponent]
        };
      }
      return component;
    });
    
    setComponents(updatedComponents);
    
    // Also update the component in the current page
    setPages(prev => prev.map(page => 
      page.id === currentPageId ? {
        ...page,
        components: updatedComponents
      } : page
    ));
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

    const updatedComponents = updateComponentRecursive(components);
    setComponents(updatedComponents);
    
    // Also update the component in the current page
    setPages(prev => prev.map(page => 
      page.id === currentPageId ? {
        ...page,
        components: updatedComponents
      } : page
    ));
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

    const updatedComponents = removeComponentRecursive(components);
    setComponents(updatedComponents);
    
    // Also update the component in the current page
    setPages(prev => prev.map(page => 
      page.id === currentPageId ? {
        ...page,
        components: updatedComponents
      } : page
    ));
    
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };
  
  // Add a new page
  const addPage = (name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    const path = id === 'home' ? '/' : `/${id}`;
    
    const newPage: Page = {
      id,
      name,
      path,
      components: [],
      isHome: false
    };
    
    setPages(prev => [...prev, newPage]);
    setCurrentPageId(id);
    setComponents([]);
    setSelectedComponent(null);
  };
  
  // Remove a page
  const removePage = (id: string) => {
    // Don't remove the last page
    if (pages.length <= 1) return;
    
    const updatedPages = pages.filter(page => page.id !== id);
    setPages(updatedPages);
    
    // If the current page is being removed, switch to the first available page
    if (currentPageId === id) {
      setCurrentPageId(updatedPages[0].id);
      setComponents(updatedPages[0].components || []);
    }
  };
  
  // When changing pages, update the components
  React.useEffect(() => {
    const currentPage = pages.find(page => page.id === currentPageId);
    if (currentPage) {
      setComponents(currentPage.components || []);
      setSelectedComponent(null);
    }
  }, [currentPageId]);

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
        setPreviewMode,
        pages,
        setPages,
        currentPageId,
        setCurrentPageId,
        addPage,
        removePage,
        publishStatus,
        setPublishStatus
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
