import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { SEOSettings, defaultSEOSettings } from "@/lib/seoUtils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { Page } from "@/lib/pageData";
import { Website } from "@/types/database.types";

export type Component = {
  id: string;
  type: string;
  content: string;
  styles: Record<string, string>;
  children: string[];
  parent: string | null;
};

export type PageType = {
  id: string;
  name: string;
  path: string;
  components: string[];
  seoSettings: SEOSettings;
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
}

export const BuilderContext = createContext<BuilderContextType>({} as BuilderContextType);

export const BuilderProvider = ({ children }: { children: React.ReactNode }) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [pages, setPages] = useState<PageType[]>([{
    id: uuidv4(),
    name: "Home",
    path: "/",
    components: [],
    seoSettings: defaultSEOSettings,
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

    setComponents([...components, newComponent]);

    // If the component has a parent, update the parent's children array
    if (parent) {
      setComponents((prevComponents) => {
        return prevComponents.map((component) => {
          if (component.id === parent) {
            return {
              ...component,
              children: [...component.children, newComponent.id],
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
            components: [...page.components, newComponent.id],
          };
        } else {
          return page;
        }
      });
    });
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
      droppedComponent.children = [...droppedComponent.children, dragId];

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
  };

  const addPage = () => {
    const newPage: PageType = {
      id: uuidv4(),
      name: "New Page",
      path: "/new-page",
      components: [],
      seoSettings: defaultSEOSettings,
    };

    setPages([...pages, newPage]);
    setCurrentPageId(newPage.id);
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
    setPages((prevPages) => {
      return prevPages.filter((page) => page.id !== id);
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
        throw error;
      }
      
      if (websites && websites.length > 0) {
        const website = websites[0] as Website;
        
        // Set state from the database
        setWebsiteId(website.id);
        setWebsiteName(website.name);
        setWebsiteDescription(website.description);
        setPages(website.pages as Page[] || []);
        setCreatedAt(website.created_at);
        setUpdatedAt(website.updated_at);
        setPublishedAt(website.published_at || null);
        setUserId(website.user_id);
        setPublishStatus(website.publish_status as PublishStatus);
        setSEOSettings(website.seo_settings as SEOSettings);
        
        // Set the current page
        if (pages.length > 0) {
          setCurrentPageId(pages[0].id);
        }
        
        console.info("Loaded website from Supabase:", website.name);
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
      // Save to localStorage first (as a backup)
      saveToLocalStorage();
      
      if (!user) {
        console.info("No user logged in, saved to localStorage only");
        return;
      }
      
      const websiteData = {
        id: websiteId || uuidv4(),
        name: websiteName || "My Website",
        description: websiteDescription || "",
        pages,
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
      
      const { data, error } = await supabase
        .from('websites')
        .upsert(websiteData)
        .select();
      
      if (error) {
        throw error;
      }
      
      console.info("Website saved to Supabase:", data);
      setUpdatedAt(new Date().toISOString());
    } catch (error) {
      console.error("Error saving website:", error);
      toast.error("Error saving website");
      throw error;
    }
  };

  useEffect(() => {
    if (draggedComponent && selectedComponent) {
      moveComponent(draggedComponent, selectedComponent.id);
      setDraggedComponent(null);
    }
  }, [selectedComponent, draggedComponent, moveComponent]);

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
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => useContext(BuilderContext);
