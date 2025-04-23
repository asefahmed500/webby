
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { defaultPages, Page } from "@/lib/pageData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

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
  websiteId: string | null;
  setWebsiteId: React.Dispatch<React.SetStateAction<string | null>>;
  websiteName: string;
  setWebsiteName: React.Dispatch<React.SetStateAction<string>>;
  saveWebsite: () => Promise<void>;
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
  const { user } = useAuth();
  const [pages, setPages] = useState<Page[]>(defaultPages);
  const [currentPageId, setCurrentPageId] = useState<string>("home");
  const [publishStatus, setPublishStatus] = useState<"draft" | "published">("draft");
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [websiteName, setWebsiteName] = useState<string>("My Website");
  
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const generateId = () => `component-${Math.random().toString(36).substr(2, 9)}`;

  // Initial load from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("saved-website");
      const publishedData = localStorage.getItem("published-website");
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.pages) {
          console.log("Loading pages from saved data:", parsedData.pages.length);
          setPages(parsedData.pages);
          
          if (parsedData.publishStatus) {
            setPublishStatus(parsedData.publishStatus);
          }
          
          if (parsedData.websiteId) {
            setWebsiteId(parsedData.websiteId);
          }
          
          if (parsedData.websiteName) {
            setWebsiteName(parsedData.websiteName);
          }
          
          if (parsedData.currentPageId) {
            setCurrentPageId(parsedData.currentPageId);
          } else {
            // Find home page or use first page
            const homePage = parsedData.pages.find((p: Page) => p.isHome) || parsedData.pages[0];
            if (homePage) {
              setCurrentPageId(homePage.id);
            }
          }
        }
      } else if (publishedData) {
        // If no saved data but there's published data, use that
        const parsedData = JSON.parse(publishedData);
        if (parsedData.pages) {
          console.log("No saved data, using published data");
          setPages(parsedData.pages);
          setPublishStatus("published");
          
          if (parsedData.websiteName) {
            setWebsiteName(parsedData.websiteName);
          }
          
          if (parsedData.currentPageId) {
            setCurrentPageId(parsedData.currentPageId);
          } else {
            const homePage = parsedData.pages.find((p: Page) => p.isHome) || parsedData.pages[0];
            if (homePage) {
              setCurrentPageId(homePage.id);
            }
          }
        }
      }
      
      setInitialLoadDone(true);
    } catch (error) {
      console.error("Error loading saved website:", error);
      setInitialLoadDone(true);
    }
  }, []);

  // Check for published status
  useEffect(() => {
    if (!initialLoadDone) return;
    
    try {
      const publishedData = localStorage.getItem("published-website");
      if (publishedData) {
        const parsedData = JSON.parse(publishedData);
        if (parsedData.publishStatus === "published") {
          setPublishStatus("published");
        }
      }
    } catch (error) {
      console.error("Error checking published status:", error);
    }
  }, [initialLoadDone]);

  // Load components when changing pages
  useEffect(() => {
    if (!initialLoadDone) return;
    
    const currentPage = pages.find(page => page.id === currentPageId);
    if (currentPage) {
      console.log("Setting components from current page:", currentPage.id, currentPage.components?.length || 0);
      setComponents(currentPage.components || []);
      setSelectedComponent(null);
    }
  }, [currentPageId, pages, initialLoadDone]);

  // Save components when they change
  const updatePageComponents = useCallback(() => {
    if (!initialLoadDone) return;
    
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === currentPageId ? { ...page, components } : page
      )
    );
  }, [components, currentPageId, initialLoadDone]);
  
  useEffect(() => {
    if (!initialLoadDone) return;
    updatePageComponents();
  }, [components, updatePageComponents, initialLoadDone]);

  const saveWebsite = async () => {
    try {
      // Update the current page with the latest components first
      const updatedPages = pages.map(page => 
        page.id === currentPageId ? { ...page, components } : page
      );
      
      const websiteData = {
        pages: updatedPages,
        publishStatus,
        websiteId: websiteId || `website-${Math.random().toString(36).substr(2, 9)}`,
        websiteName,
        updatedAt: new Date().toISOString(),
        userId: user?.id,
        currentPageId
      };
      
      console.log("Saving website data:", JSON.stringify(websiteData));
      localStorage.setItem("saved-website", JSON.stringify(websiteData));
      
      if (!websiteId) {
        setWebsiteId(websiteData.websiteId);
      }
      
      setPages(updatedPages);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error saving website:", error);
      return Promise.reject(error);
    }
  };

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
    
    // Save current page components before switching
    const updatedPages = pages.map(page => 
      page.id === currentPageId ? { ...page, components } : page
    );
    
    setPages([...updatedPages, newPage]);
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
        setPublishStatus,
        websiteId,
        setWebsiteId,
        websiteName,
        setWebsiteName,
        saveWebsite
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
