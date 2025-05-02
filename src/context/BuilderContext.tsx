import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

// Define Component type to resolve the typing errors
export interface Component {
  id: string;
  type: string;
  content?: string;
  src?: string;
  alt?: string;
  children?: Component[];
  settings?: Record<string, any>;
  styles?: Record<string, any>;
  [key: string]: any;
}

interface Page {
  id: string;
  name: string;
  path: string;
  isHome: boolean;
  components: Component[];
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
}

interface Website {
  id: string;
  name: string;
  description?: string;
  pages: Page[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  userId?: string;
  publishStatus: 'draft' | 'published';
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  favicon?: string;
  ogImage?: string;
  author?: string;
}

// Rest of the BuilderContext implementation
// Update functions to use the Component type instead of string

interface BuilderContextType {
  components: Component[];
  setComponents: React.Dispatch<React.SetStateAction<Component[]>>;
  selectedComponent: Component | null;
  setSelectedComponent: (id: Component | null) => void;
  draggedComponent: string | null;
  setDraggedComponent: (type: string | null) => void;
  addComponent: (type: string, parentId?: string) => void;
  updateComponent: (id: string, data: Partial<Component>) => void;
  duplicateComponent: (id: string) => void;
  removeComponent: (id: string) => void;
  moveComponent: (id: string, direction: 'up' | 'down') => void;
  previewMode: boolean;
  setPreviewMode: (mode: boolean) => void;
  viewportSize: 'mobile' | 'tablet' | 'desktop';
  setViewportSize: (size: 'mobile' | 'tablet' | 'desktop') => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isDragging: boolean;
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  currentPageId: string;
  setCurrentPageId: (id: string) => void;
  addPage: (name: string) => void;
  removePage: (id: string) => void;
  website: Website;
  setWebsite: React.Dispatch<React.SetStateAction<Website>>;
  lastSaved: Date | null;
  setLastSaved: React.Dispatch<React.SetStateAction<Date | null>>;
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
  saveWebsite: () => Promise<void>;
  websiteName: string;
  setWebsiteName: (name: string) => void;
  publishStatus: 'draft' | 'published';
  setPublishStatus: (status: 'draft' | 'published') => void;
  websiteId: string;
  seoSettings: SEOSettings | null;
  setSEOSettings: React.Dispatch<React.SetStateAction<SEOSettings | null>>;
}

// Create context
const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

// Default website structure
const defaultWebsite: Website = {
  id: uuidv4(),
  name: "My Website",
  description: "A website built with Webby",
  pages: [
    {
      id: "home",
      name: "Home",
      path: "/",
      isHome: true,
      components: [],
      seo: {
        title: "Home | My Website",
        description: "Welcome to my website",
        keywords: "website, web, builder"
      }
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishStatus: 'draft'
};

// Default SEO settings
const defaultSEOSettings: SEOSettings = {
  title: "My Website",
  description: "A website built with Webby",
  keywords: "website, web, builder",
  author: ""
};

export const BuilderProvider = ({ children }: { children: ReactNode }) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [viewportSize, setViewportSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pages, setPages] = useState<Page[]>(defaultWebsite.pages);
  const [currentPageId, setCurrentPageId] = useState<string>(defaultWebsite.pages[0].id);
  const [website, setWebsite] = useState<Website>(defaultWebsite);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [websiteName, setWebsiteName] = useState<string>(defaultWebsite.name);
  const [publishStatus, setPublishStatus] = useState<'draft' | 'published'>(defaultWebsite.publishStatus);
  const [websiteId, setWebsiteId] = useState<string>(defaultWebsite.id);
  const [seoSettings, setSEOSettings] = useState<SEOSettings | null>(defaultSEOSettings);
  
  const { user } = useAuth();
  const { toast: uiToast } = useToast();
  
  // Load website from localStorage or create a new one
  useEffect(() => {
    const savedWebsite = localStorage.getItem('saved-website');
    
    if (savedWebsite) {
      try {
        const parsedWebsite = JSON.parse(savedWebsite) as Website;
        setWebsite(parsedWebsite);
        setPages(parsedWebsite.pages);
        setWebsiteName(parsedWebsite.name || "My Website");
        setPublishStatus(parsedWebsite.publishStatus || 'draft');
        setWebsiteId(parsedWebsite.id || uuidv4());
        
        // Set current page to home or first page
        const homePage = parsedWebsite.pages.find(p => p.isHome);
        setCurrentPageId(homePage ? homePage.id : parsedWebsite.pages[0]?.id);
        
        if (homePage) {
          setComponents(homePage.components || []);
        } else if (parsedWebsite.pages[0]) {
          setComponents(parsedWebsite.pages[0].components || []);
        }
        
        // Set last saved timestamp
        if (parsedWebsite.updatedAt) {
          setLastSaved(new Date(parsedWebsite.updatedAt));
        }
      } catch (error) {
        console.error("Error loading website:", error);
        uiToast({
          title: "Error",
          description: "Failed to load your website",
          variant: "destructive"
        });
      }
    }
  }, []);
  
  // Update components when page changes
  useEffect(() => {
    const currentPage = pages.find(page => page.id === currentPageId);
    if (currentPage) {
      setComponents(currentPage.components || []);
    }
  }, [currentPageId, pages]);
  
  // Save components when they change
  useEffect(() => {
    // Only save if we have actual components and pages
    if (components.length === 0 && pages.length <= 1) return;
    
    // Update the components in the current page
    const updatedPages = pages.map(page => {
      if (page.id === currentPageId) {
        return { ...page, components };
      }
      return page;
    });
    
    setPages(updatedPages);
    
    // Update website with new pages
    const updatedWebsite = {
      ...website,
      pages: updatedPages,
      updatedAt: new Date().toISOString()
    };
    
    setWebsite(updatedWebsite);
    
    // Save to localStorage with debounce
    const saveTimer = setTimeout(() => {
      setIsSaving(true);
      try {
        localStorage.setItem('saved-website', JSON.stringify(updatedWebsite));
        setLastSaved(new Date());
      } catch (error) {
        console.error("Error saving website:", error);
      } finally {
        setIsSaving(false);
      }
    }, 1000);
    
    return () => clearTimeout(saveTimer);
  }, [components, currentPageId]);
  
  // Function to add a component
  const addComponent = (type: string, parentId?: string) => {
    const newComponent: Component = {
      id: `component-${uuidv4()}`,
      type,
      content: type === 'text' ? 'Lorem ipsum dolor sit amet' : 
              type === 'heading' ? 'Heading' : '',
      children: [],
      settings: {},
      styles: {}
    };
    
    if (parentId) {
      // Add to parent component's children
      setComponents(prev => {
        const updatedComponents = [...prev];
        const findAndUpdateParent = (components: Component[]): Component[] => {
          return components.map(comp => {
            if (comp.id === parentId) {
              return {
                ...comp,
                children: [...(comp.children || []), newComponent]
              };
            } else if (comp.children && comp.children.length > 0) {
              return {
                ...comp,
                children: findAndUpdateParent(comp.children)
              };
            }
            return comp;
          });
        };
        return findAndUpdateParent(updatedComponents);
      });
    } else {
      // Add to root level
      setComponents(prev => [...prev, newComponent]);
    }
  };
  
  // Function to update a component
  const updateComponent = (id: string, data: Partial<Component>) => {
    setComponents(prev => {
      const updateComponentInTree = (components: Component[]): Component[] => {
        return components.map(comp => {
          if (comp.id === id) {
            return { ...comp, ...data };
          } else if (comp.children && comp.children.length > 0) {
            return {
              ...comp,
              children: updateComponentInTree(comp.children)
            };
          }
          return comp;
        });
      };
      
      return updateComponentInTree(prev);
    });
  };
  
  // Function to duplicate a component
  const duplicateComponent = (id: string) => {
    const findComponentById = (components: Component[], id: string): Component | null => {
      for (const comp of components) {
        if (comp.id === id) return comp;
        if (comp.children && comp.children.length > 0) {
          const found = findComponentById(comp.children, id);
          if (found) return found;
        }
      }
      return null;
    };
    
    const componentToDuplicate = findComponentById(components, id);
    
    if (componentToDuplicate) {
      const duplicateWithNewIds = (component: Component): Component => {
        return {
          ...JSON.parse(JSON.stringify(component)),
          id: `component-${uuidv4()}`,
          children: (component.children || []).map(duplicateWithNewIds)
        };
      };
      
      const duplicatedComponent = duplicateWithNewIds(componentToDuplicate);
      setComponents(prev => [...prev, duplicatedComponent]);
    }
  };
  
  // Function to remove a component
  const removeComponent = (id: string) => {
    const removeComponentFromTree = (components: Component[]): Component[] => {
      return components.filter(comp => {
        if (comp.id === id) return false;
        if (comp.children && comp.children.length > 0) {
          comp.children = removeComponentFromTree(comp.children);
        }
        return true;
      });
    };
    
    setComponents(prev => removeComponentFromTree(prev));
    
    if (selectedComponent && selectedComponent.id === id) {
      setSelectedComponent(null);
    }
  };
  
  // Function to move a component up or down
  const moveComponent = (id: string, direction: 'up' | 'down') => {
    setComponents(prev => {
      const moveComponentInTree = (components: Component[]): Component[] => {
        const index = components.findIndex(comp => comp.id === id);
        
        if (index === -1) {
          // Check children
          return components.map(comp => {
            if (comp.children && comp.children.length > 0) {
              return { ...comp, children: moveComponentInTree(comp.children) };
            }
            return comp;
          });
        }
        
        const result = [...components];
        
        if (direction === 'up' && index > 0) {
          [result[index - 1], result[index]] = [result[index], result[index - 1]];
        } else if (direction === 'down' && index < components.length - 1) {
          [result[index], result[index + 1]] = [result[index + 1], result[index]];
        }
        
        return result;
      };
      
      return moveComponentInTree(prev);
    });
  };
  
  // Function to add a page
  const addPage = (name: string) => {
    const newPageId = name.toLowerCase().replace(/\s+/g, '-');
    const newPage: Page = {
      id: newPageId,
      name,
      path: `/${newPageId}`,
      isHome: false,
      components: [],
      seo: {
        title: `${name} | ${websiteName}`,
        description: "",
        keywords: ""
      }
    };
    
    setPages(prev => [...prev, newPage]);
  };
  
  // Function to remove a page
  const removePage = (id: string) => {
    // Can't remove the home page
    const isHomePage = pages.find(page => page.id === id)?.isHome;
    if (isHomePage) return;
    
    setPages(prev => prev.filter(page => page.id !== id));
    
    // If we're removing the current page, switch to the home page
    if (currentPageId === id) {
      const homePage = pages.find(page => page.isHome);
      if (homePage) {
        setCurrentPageId(homePage.id);
      } else if (pages.length > 1) {
        setCurrentPageId(pages[0].id);
      }
    }
  };
  
  // Save website to database
  const saveWebsite = async () => {
    if (!user) {
      toast.error("You need to be logged in to save your website");
      return;
    }
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('websites')
        .upsert({
          id: websiteId || uuidv4(),
          name: websiteName || "My Website",
          description: website.description,
          pages: website.pages,
          created_at: website.createdAt,
          updated_at: new Date().toISOString(),
          published_at: website.publishedAt,
          publish_status: publishStatus,
          user_id: user.id,
          seo_settings: seoSettings
        });
        
      if (error) throw error;
      
      setLastSaved(new Date());
      toast.success("Website saved successfully!");
    } catch (error) {
      console.error("Error saving website:", error);
      toast.error("Failed to save website");
    } finally {
      setIsSaving(false);
    }
  };
  
  const value: BuilderContextType = {
    components,
    setComponents,
    selectedComponent,
    setSelectedComponent,
    draggedComponent,
    setDraggedComponent,
    addComponent,
    updateComponent,
    duplicateComponent,
    removeComponent,
    moveComponent,
    previewMode,
    setPreviewMode,
    viewportSize,
    setViewportSize,
    isEditing,
    setIsEditing,
    isDragging,
    pages,
    setPages,
    currentPageId,
    setCurrentPageId,
    addPage,
    removePage,
    website,
    setWebsite,
    lastSaved,
    setLastSaved,
    isSaving,
    setIsSaving,
    saveWebsite,
    websiteName,
    setWebsiteName,
    publishStatus,
    setPublishStatus,
    websiteId,
    seoSettings,
    setSEOSettings
  };
  
  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  
  return context;
};
