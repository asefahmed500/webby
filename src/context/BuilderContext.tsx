import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo, useRef } from "react";
import { defaultPages, Page } from "@/lib/pageData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { SEOSettings as SEOSettingsType, defaultSEOSettings } from '@/lib/seoUtils';
import { storageService } from '@/lib/supabaseServices';

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
  undoChange: () => void;
  redoChange: () => void;
  canUndo: boolean;
  canRedo: boolean;
  lastSaved: Date | null;
  isSaving: boolean;
  viewportSize: "desktop" | "tablet" | "mobile";
  setViewportSize: React.Dispatch<React.SetStateAction<"desktop" | "tablet" | "mobile">>;
  seoSettings: SEOSettingsType | null;
  setSEOSettings: React.Dispatch<React.SetStateAction<SEOSettingsType | null>>;
  uploadImage: (file: File) => Promise<string>;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};

interface HistoryState {
  pages: Page[];
  currentPageId: string;
  components: Component[];
}

const MAX_HISTORY_STATES = 50;

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
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [seoSettings, setSEOSettings] = useState<SEOSettingsType | null>(null);

  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const [updateTimeout, setUpdateTimeout] = useState<NodeJS.Timeout | null>(null);

  const generateId = () => `component-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (initialLoadDone) {
      const initialState: HistoryState = {
        pages,
        currentPageId,
        components
      };
      setHistory([initialState]);
      setHistoryIndex(0);
    }
  }, [initialLoadDone]);

  useEffect(() => {
    setCanUndo(historyIndex > 0);
    setCanRedo(historyIndex < history.length - 1);
  }, [history, historyIndex]);

  const undoChange = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      
      setPages(previousState.pages);
      setCurrentPageId(previousState.currentPageId);
      setComponents(previousState.components);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const redoChange = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      
      setPages(nextState.pages);
      setCurrentPageId(nextState.currentPageId);
      setComponents(nextState.components);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault();
        undoChange();
      } else if (
        (e.key === 'y' && (e.ctrlKey || e.metaKey)) || 
        (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey)
      ) {
        e.preventDefault();
        redoChange();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [undoChange, redoChange]);

  const addToHistory = useCallback((state: HistoryState) => {
    setHistory(prevHistory => {
      const newHistory = prevHistory.slice(0, historyIndex + 1);
      const updatedHistory = [...newHistory, state];
      if (updatedHistory.length > MAX_HISTORY_STATES) {
        return updatedHistory.slice(updatedHistory.length - MAX_HISTORY_STATES);
      }
      return updatedHistory;
    });
    
    setHistoryIndex(prevIndex => {
      const newIndex = Math.min(prevIndex + 1, MAX_HISTORY_STATES - 1);
      return newIndex;
    });
  }, [historyIndex]);

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
          
          if (parsedData.seoSettings) {
            setSEOSettings(parsedData.seoSettings);
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
      } else if (publishedData) {
        const parsedData = JSON.parse(publishedData);
        if (parsedData.pages) {
          console.log("No saved data, using published data");
          setPages(parsedData.pages);
          setPublishStatus("published");
          
          if (parsedData.websiteName) {
            setWebsiteName(parsedData.websiteName);
          }
          
          if (parsedData.seoSettings) {
            setSEOSettings(parsedData.seoSettings);
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
      setLastSaved(new Date());
    } catch (error) {
      console.error("Error loading saved website:", error);
      setInitialLoadDone(true);
    }
  }, []);

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

  useEffect(() => {
    if (!initialLoadDone) return;
    
    const currentPage = pages.find(page => page.id === currentPageId);
    if (currentPage) {
      console.log("Setting components from current page:", currentPage.id, currentPage.components?.length || 0);
      
      const componentsCopy = currentPage.components ? 
        JSON.parse(JSON.stringify(currentPage.components)) : [];
        
      setComponents(componentsCopy);
      setSelectedComponent(null);
    }
  }, [currentPageId, pages, initialLoadDone]);

  useEffect(() => {
    if (!initialLoadDone) return;
    
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    autoSaveTimerRef.current = setTimeout(() => {
      if (initialLoadDone) {
        console.log("Auto-saving website...");
        setIsSaving(true);
        
        saveWebsite()
          .then(() => {
            setLastSaved(new Date());
            setIsSaving(false);
          })
          .catch(() => {
            setIsSaving(false);
          });
      }
    }, 10000);
    
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [components, pages, currentPageId, websiteName, initialLoadDone]);

  const updatePageComponents = useCallback(() => {
    if (!initialLoadDone) return;
    
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    
    const timeoutId = setTimeout(() => {
      setPages(prevPages => {
        const updatedPages = prevPages.map(page => 
          page.id === currentPageId ? { ...page, components } : page
        );
        
        addToHistory({
          pages: updatedPages,
          currentPageId,
          components
        });
        
        return updatedPages;
      });
    }, 300);
    
    setUpdateTimeout(timeoutId as unknown as NodeJS.Timeout);
    
  }, [components, currentPageId, initialLoadDone, updateTimeout, addToHistory]);
  
  useEffect(() => {
    if (!initialLoadDone) return;
    updatePageComponents();
    
    return () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
    };
  }, [components, updatePageComponents, initialLoadDone, updateTimeout]);

  const saveWebsite = async () => {
    try {
      setIsSaving(true);
      
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
        currentPageId,
        seoSettings // <-- Add SEO settings to saved data
      };
      
      console.log("Saving website data:", JSON.stringify(websiteData));
      localStorage.setItem("saved-website", JSON.stringify(websiteData));
      
      if (!websiteId) {
        setWebsiteId(websiteData.websiteId);
      }
      
      setPages(updatedPages);
      setLastSaved(new Date());
      setIsSaving(false);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error saving website:", error);
      setIsSaving(false);
      return Promise.reject(error);
    }
  };

  const addComponent = useCallback((type: string, targetId?: string) => {
    const newComponent: Component = {
      id: generateId(),
      type,
      content: type === "text" ? "Edit this text" : "",
      styles: {},
      children: [],
    };

    if (!targetId) {
      setComponents(prev => {
        const updatedComponents = [...prev, newComponent];
        return updatedComponents;
      });
      return;
    }

    const updatedComponents = JSON.parse(JSON.stringify(components));
    
    const addToChildren = (items: Component[]) => {
      return items.map(item => {
        if (item.id === targetId) {
          return {
            ...item,
            children: [...item.children, newComponent]
          };
        }
        if (item.children.length > 0) {
          return {
            ...item,
            children: addToChildren(item.children)
          };
        }
        return item;
      });
    };
    
    setComponents(addToChildren(updatedComponents));
  }, [components]);

  const updateComponent = useCallback((id: string, updates: Partial<Component>) => {
    const updateComponentRecursive = (components: Component[]): Component[] => {
      return components.map(component => {
        if (component.id === id) {
          const updatedComponent = { ...component, ...updates };
          return updatedComponent;
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

    const updatedComponents = updateComponentRecursive(JSON.parse(JSON.stringify(components)));
    setComponents(updatedComponents);
  }, [components]);

  const removeComponent = useCallback((id: string) => {
    const removeComponentRecursive = (components: Component[]): Component[] => {
      return components
        .filter(component => component.id !== id)
        .map(component => ({
          ...component,
          children: removeComponentRecursive(component.children)
        }));
    };

    const updatedComponents = removeComponentRecursive(JSON.parse(JSON.stringify(components)));
    setComponents(updatedComponents);
    
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  }, [components, selectedComponent]);
  
  const addPage = useCallback((name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    const path = id === 'home' ? '/' : `/${id}`;
    
    const newPage: Page = {
      id,
      name,
      path,
      components: [],
      isHome: false
    };
    
    const updatedPages = pages.map(page => 
      page.id === currentPageId ? { ...page, components } : page
    );
    
    setPages([...updatedPages, newPage]);
    setCurrentPageId(id);
    setComponents([]);
    setSelectedComponent(null);
    
    addToHistory({
      pages: [...updatedPages, newPage],
      currentPageId: id,
      components: []
    });
    
    toast.success(`Page "${name}" created`);
  }, [pages, components, currentPageId, addToHistory]);
  
  const removePage = useCallback((id: string) => {
    if (pages.length <= 1) {
      toast.error("Cannot delete the only page");
      return;
    }
    
    const updatedPages = pages.filter(page => page.id !== id);
    setPages(updatedPages);
    
    if (currentPageId === id) {
      const newCurrentId = updatedPages[0].id;
      setCurrentPageId(newCurrentId);
      
      const newCurrentPage = updatedPages[0];
      setComponents(newCurrentPage.components || []);
      
      addToHistory({
        pages: updatedPages,
        currentPageId: newCurrentId,
        components: newCurrentPage.components || []
      });
    } else {
      addToHistory({
        pages: updatedPages,
        currentPageId,
        components
      });
    }
    
    toast.success("Page deleted");
  }, [pages, currentPageId, components, addToHistory]);

  const uploadImage = async (file: File): Promise<string> => {
    if (!user) {
      throw new Error("You must be logged in to upload images");
    }
    
    try {
      const filePath = `user-uploads/${user.id}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      const { data, error } = await storageService.uploadFile('website_assets', filePath, file);
      
      if (error) throw error;
      
      // Get the public URL for the uploaded file
      const imageUrl = storageService.getFileUrl('website_assets', filePath);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const contextValue = useMemo(() => ({
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
    saveWebsite,
    undoChange,
    redoChange,
    canUndo,
    canRedo,
    lastSaved,
    isSaving,
    viewportSize,
    setViewportSize,
    seoSettings,
    setSEOSettings,
    uploadImage
  }), [
    components, selectedComponent, isDragging, draggedComponent, 
    previewMode, pages, currentPageId, publishStatus, websiteId, 
    websiteName, addComponent, updateComponent, removeComponent,
    addPage, removePage, saveWebsite, undoChange, redoChange,
    canUndo, canRedo, lastSaved, isSaving, viewportSize,
    seoSettings, setSEOSettings, uploadImage
  ]);

  return (
    <BuilderContext.Provider value={contextValue}>
      {children}
    </BuilderContext.Provider>
  );
};
