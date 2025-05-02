
import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { SEOSettings, defaultSEOSettings } from "@/lib/seoUtils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";
import { Website } from "@/types/database.types";

export type Component = {
  id: string;
  type: string;
  content: string;
  styles: Record<string, string>;
  children: Component[];
  parent: string | null;
};

export type PageType = {
  id: string;
  name: string;
  path: string;
  components: Component[];
  seoSettings: SEOSettings;
  isHome?: boolean;
};

export type PublishStatus = "draft" | "published";

interface BuilderContextType {
  components: Component[];
  setComponents: React.Dispatch<React.SetStateAction<Component[]>>;
  addComponent: (type: string, parent?: string) => void;
  updateComponent: (id: string, data: Partial<Component>) => void;
  removeComponent: (id: string) => void;
  selectedComponent: Component | null;
  setSelectedComponent: React.Dispatch<React.SetStateAction<Component | null>>;
  draggedComponent: string | null;
  setDraggedComponent: React.Dispatch<React.SetStateAction<string | null>>;
  moveComponent: (dragId: string, dropId: string) => void;
  pages: PageType[];
  setPages: React.Dispatch<React.SetStateAction<PageType[]>>;
  addPage: () => void;
  updatePage: (id: string, data: Partial<PageType>) => void;
  removePage: (id: string) => void;
  currentPageId: string;
  setCurrentPageId: React.Dispatch<React.SetStateAction<string>>;
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  websiteName: string;
  setWebsiteName: React.Dispatch<React.SetStateAction<string>>;
  websiteDescription: string;
  setWebsiteDescription: React.Dispatch<React.SetStateAction<string>>;
  seoSettings: SEOSettings;
  setSEOSettings: React.Dispatch<React.SetStateAction<SEOSettings>>;
  publishStatus: PublishStatus;
  setPublishStatus: React.Dispatch<React.SetStateAction<PublishStatus>>;
  websiteId: string | null;
  setWebsiteId: React.Dispatch<React.SetStateAction<string | null>>;
  createdAt: string | null;
  setCreatedAt: React.Dispatch<React.SetStateAction<string | null>>;
  updatedAt: string | null;
  setUpdatedAt: React.Dispatch<React.SetStateAction<string | null>>;
  publishedAt: string | null;
  setPublishedAt: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  saveWebsite: () => Promise<void>;
  isDragging: boolean;
  viewportSize: string;
  setViewportSize: React.Dispatch<React.SetStateAction<string>>;
  lastSaved: string | null;
  isSaving: boolean;
}

export const BuilderContext = createContext<BuilderContextType>({} as BuilderContextType);

export const BuilderProvider = ({ children }: { children: React.ReactNode }) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pages, setPages] = useState<PageType[]>([{
    id: uuidv4(),
    name: "Home",
    path: "/",
    components: [],
    seoSettings: defaultSEOSettings,
    isHome: true
  }]);
  const [currentPageId, setCurrentPageId] = useState<string>(pages[0].id);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [websiteName, setWebsiteName] = useState<string>("My Website");
  const [websiteDescription, setWebsiteDescription] = useState<string>("");
  const [seoSettings, setSEOSettings] = useState<SEOSettings>(defaultSEOSettings);
  const [publishStatus, setPublishStatus] = useState<PublishStatus>("draft");
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [viewportSize, setViewportSize] = useState<string>("desktop");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { user } = useAuth();

  const addComponent = (type: string, parent: string | null = null) => {
    const newComponent: Component = {
      id: uuidv4(),
      type: type,
      content: ``,
      styles: {},
      children: [],
      parent: parent,
    };

    setComponents(prevComponents => [...prevComponents, newComponent]);

    // If the component has a parent, update the parent's children array
    if (parent) {
      setComponents((prevComponents) => {
        return prevComponents.map((component) => {
          if (component.id === parent) {
            return {
              ...component,
              children: [...component.children, newComponent],
            };
          } else {
            return component;
          }
        });
      });
    }

    // If adding to a page, update the page's components array
    setPages((prevPages) => {
      return prevPages.map((page) => {
        if (page.id === currentPageId) {
          return {
            ...page,
            components: [...page.components, newComponent],
          };
        } else {
          return page;
        }
      });
    });

    // Log the component addition
    console.log(`Component added: ${type} (ID: ${newComponent.id})`);
  };

  const updateComponent = (id: string, data: Partial<Component>) => {
    setComponents((prevComponents) => {
      return prevComponents.map((component) => {
        if (component.id === id) {
          return { ...component, ...data };
        } else {
          return component;
        }
      });
    });
  };

  const removeComponent = (id: string) => {
    setComponents((prevComponents) => {
      return prevComponents.filter((component) => component.id !== id);
    });

    // Remove component from parent's children array
    setComponents((prevComponents) => {
      return prevComponents.map((component) => {
        if (component.children.includes(id)) {
          return {
            ...component,
            children: component.children.filter((childId) => childId !== id),
          };
        } else {
          return component;
        }
      });
    });

    // Remove component from page's components array
    setPages((prevPages) => {
      return prevPages.map((page) => {
        if (page.components.includes(id)) {
          return {
            ...page,
            components: page.components.filter((componentId) => componentId !== id),
          };
        } else {
          return page;
        }
      });
    });

    // If the selected component is being removed, clear the selection
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }

    console.log(`Component removed: ${id}`);
  };

  const moveComponent = (dragId: string, dropId: string) => {
    setComponents((prevComponents) => {
      // Find the dragged and dropped components
      const draggedComponent = prevComponents.find((c) => c.id === dragId);
      const droppedComponent = prevComponents.find((c) => c.id === dropId);

      if (!draggedComponent || !droppedComponent) {
        console.error("Dragged or dropped component not found");
        return prevComponents;
      }

      // Check if the dragged component is already a child of the dropped component
      if (draggedComponent.parent === dropId) {
        return prevComponents;
      }

      // Remove the dragged component from its previous parent
      const updatedComponents = prevComponents.map((c) => {
        if (c.children.includes(dragId)) {
          return {
            ...c,
            children: c.children.filter((childId) => childId !== dragId),
          };
        }
        return c;
      });

      // Update the parent of the dragged component
      draggedComponent.parent = dropId;

      // Add the dragged component to the children of the dropped component
      droppedComponent.children.push(draggedComponent);

      // Return the updated components array
      return updatedComponents.map((c) => {
        if (c.id === dragId) {
          return draggedComponent;
        } else if (c.id === dropId) {
          return droppedComponent;
        } else {
          return c;
        }
      });
    });

    setIsDragging(false);
  };

  const addPage = () => {
    const newPage: PageType = {
      id: uuidv4(),
      name: "New Page",
      path: `/new-page-${Date.now()}`,
      components: [],
      seoSettings: defaultSEOSettings,
      isHome: false
    };

    setPages([...pages, newPage]);
    setCurrentPageId(newPage.id);
    console.log(`Page added: ${newPage.name} (ID: ${newPage.id})`);
  };

  const updatePage = (id: string, data: Partial<PageType>) => {
    setPages((prevPages) => {
      return prevPages.map((page) => {
        if (page.id === id) {
          return { ...page, ...data };
        } else {
          return page;
        }
      });
    });
  };

  const removePage = (id: string) => {
    // Don't allow removing the last page
    if (pages.length <= 1) {
      toast.error("You must have at least one page");
      return;
    }

    setPages((prevPages) => {
      const filteredPages = prevPages.filter((page) => page.id !== id);
      // If the current page is being removed, set the current page to the first page
      if (currentPageId === id) {
        setCurrentPageId(filteredPages[0].id);
      }
      return filteredPages;
    });
  };

  const loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem("saved-website");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.pages) {
          setPages(parsedData.pages);
          setComponents(parsedData.components || []);
          setWebsiteName(parsedData.websiteName || "My Website");
          setWebsiteDescription(parsedData.websiteDescription || "");
          setSEOSettings(parsedData.seoSettings || defaultSEOSettings);
          setPublishStatus(parsedData.publishStatus || "draft");
          setWebsiteId(parsedData.websiteId || null);
          setCreatedAt(parsedData.createdAt || null);
          setUpdatedAt(parsedData.updatedAt || null);
          setPublishedAt(parsedData.publishedAt || null);
          setUserId(parsedData.userId || null);
          setCurrentPageId(parsedData.pages[0].id);
          console.info("Loaded website from localStorage:", parsedData.websiteName);
        } else {
          toast("No saved website found");
        }
      } else {
        toast("No saved website found");
      }
    } catch (error) {
      console.error("Error loading website from localStorage:", error);
    }
  };

  const saveToLocalStorage = () => {
    try {
      const websiteData = {
        components,
        pages,
        websiteName,
        websiteDescription,
        seoSettings,
        publishStatus,
        websiteId,
        createdAt,
        updatedAt,
        publishedAt,
        userId
      };
      localStorage.setItem("saved-website", JSON.stringify(websiteData));
      console.info("Website saved to localStorage:", websiteName);
    } catch (error) {
      console.error("Error saving website to localStorage:", error);
    }
  };

  // Load saved website
  const loadSavedWebsite = async () => {
    try {
      if (!user) {
        // If no user, try to load from localStorage
        loadFromLocalStorage();
        return;
      }
      
      console.info("Trying to load websites from Supabase");
      const { data: websites, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);
      
      if (error) {
        console.error("Error loading websites:", error);
        throw error;
      }
      
      if (websites && websites.length > 0) {
        const website = websites[0] as Website;
        
        // Set state from the database
        setWebsiteId(website.id);
        setWebsiteName(website.name);
        setWebsiteDescription(website.description);
        
        // Safely parse pages from JSON
        try {
          const pagesData = website.pages;
          if (pagesData && Array.isArray(pagesData)) {
            setPages(pagesData as unknown as PageType[]);
            console.info("Loading pages from saved data:", pagesData.length);
          } else {
            console.warn("Invalid pages data format:", pagesData);
            setPages([{
              id: uuidv4(),
              name: "Home",
              path: "/",
              components: [],
              seoSettings: defaultSEOSettings,
              isHome: true
            }]);
          }
        } catch (parseError) {
          console.error("Error parsing pages data:", parseError);
          setPages([{
            id: uuidv4(),
            name: "Home",
            path: "/",
            components: [],
            seoSettings: defaultSEOSettings,
            isHome: true
          }]);
        }
        
        // Set the current page
        if (pages.length > 0) {
          setCurrentPageId(pages[0].id);
          console.info("Setting components from current page: home", pages[0].components?.length || 0);
        }
        
        // Set other website properties
        setCreatedAt(website.created_at);
        setUpdatedAt(website.updated_at);
        setPublishedAt(website.published_at || null);
        setUserId(website.user_id);
        setPublishStatus(website.publish_status as PublishStatus);
        
        // Set SEO settings if available
        if (website.seo_settings) {
          setSEOSettings(website.seo_settings as unknown as SEOSettings || defaultSEOSettings);
        }
        
        console.info("Loaded website from Supabase:", website.name);
        setLastSaved(new Date().toISOString());
      } else {
        console.info("No data found in Supabase, will try localStorage");
        loadFromLocalStorage();
      }
    } catch (error) {
      console.error("Error loading website:", error);
      loadFromLocalStorage();
    }
  };

  // Save website to Supabase and localStorage
  const saveWebsite = async () => {
    try {
      setIsSaving(true);
      
      // Save to localStorage first (as a backup)
      saveToLocalStorage();
      
      if (!user) {
        console.info("No user logged in, saved to localStorage only");
        setIsSaving(false);
        setLastSaved(new Date().toISOString());
        return;
      }
      
      const websiteData = {
        id: websiteId || uuidv4(),
        name: websiteName || "My Website",
        description: websiteDescription || "",
        pages: pages,
        updated_at: new Date().toISOString(),
        user_id: user.id,
        publish_status: publishStatus,
        seo_settings: seoSettings,
      };
      
      if (!websiteId) {
        // This is a new website, set the creation date
        Object.assign(websiteData, {
          created_at: new Date().toISOString()
        });
        
        // Set the websiteId for future saves
        setWebsiteId(websiteData.id);
      }
      
      console.log("Saving website to Supabase:", websiteData);
      
      const { data, error } = await supabase
        .from('websites')
        .upsert(websiteData)
        .select();
      
      if (error) {
        throw error;
      }
      
      console.info("Website saved to Supabase:", data);
      setUpdatedAt(new Date().toISOString());
      setLastSaved(new Date().toISOString());
      toast.success("Website saved successfully!");
    } catch (error) {
      console.error("Error saving website:", error);
      toast.error("Error saving website");
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const handleDragStateChange = () => {
      setIsDragging(!!draggedComponent);
    };
    
    handleDragStateChange();
  }, [draggedComponent]);

  // Initialize
  useEffect(() => {
    loadSavedWebsite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <BuilderContext.Provider
      value={{
        components,
        setComponents,
        addComponent,
        updateComponent,
        removeComponent,
        selectedComponent,
        setSelectedComponent,
        draggedComponent,
        setDraggedComponent,
        moveComponent,
        pages,
        setPages,
        addPage,
        updatePage,
        removePage,
        currentPageId,
        setCurrentPageId,
        previewMode,
        setPreviewMode,
        websiteName,
        setWebsiteName,
        websiteDescription,
        setWebsiteDescription,
        seoSettings,
        setSEOSettings,
        publishStatus,
        setPublishStatus,
        websiteId,
        setWebsiteId,
        createdAt,
        setCreatedAt,
        updatedAt,
        setUpdatedAt,
        publishedAt,
        setPublishedAt,
        userId,
        setUserId,
        saveWebsite,
        isDragging,
        viewportSize,
        setViewportSize,
        lastSaved,
        isSaving
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => useContext(BuilderContext);
