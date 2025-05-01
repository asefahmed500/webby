
import { supabase } from "@/integrations/supabase/client";
import { Website } from "./pageData";
import { toast } from "sonner";

// Function to save a website to Supabase
export const saveWebsiteToSupabase = async (website: Website): Promise<boolean> => {
  try {
    // Check if the website has a user ID
    if (!website.userId) {
      console.error("Website has no userId");
      return false;
    }

    // Check if website already exists in Supabase
    const { data: existingWebsite, error: fetchError } = await supabase
      .from('websites')
      .select('id')
      .eq('id', website.id)
      .maybeSingle();

    if (fetchError) {
      console.error("Error checking for existing website:", fetchError);
      return false;
    }

    let result;
    
    // If website exists, update it
    if (existingWebsite) {
      const { data, error } = await supabase
        .from('websites')
        .update({
          name: website.name,
          description: website.description,
          pages: website.pages,
          updated_at: website.updatedAt,
          published_at: website.publishedAt,
          publish_status: website.publishStatus
        })
        .eq('id', website.id);
      
      if (error) {
        console.error("Error updating website in Supabase:", error);
        return false;
      }
      
      result = true;
    } 
    // If website doesn't exist, insert it
    else {
      const { data, error } = await supabase
        .from('websites')
        .insert([
          {
            id: website.id,
            name: website.name,
            description: website.description,
            pages: website.pages,
            created_at: website.createdAt,
            updated_at: website.updatedAt,
            published_at: website.publishedAt,
            user_id: website.userId,
            publish_status: website.publishStatus
          }
        ]);
      
      if (error) {
        console.error("Error inserting website in Supabase:", error);
        return false;
      }
      
      result = true;
    }

    return result;
  } catch (error) {
    console.error("Error in saveWebsiteToSupabase:", error);
    return false;
  }
};

// Function to get all websites for a user
export const getUserWebsites = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching user websites:", error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error("Error in getUserWebsites:", error);
    return [];
  }
};

// Function to delete a website
export const deleteWebsite = async (websiteId: string) => {
  try {
    const { error } = await supabase
      .from('websites')
      .delete()
      .eq('id', websiteId);
    
    if (error) {
      console.error("Error deleting website:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in deleteWebsite:", error);
    return false;
  }
};

// Function to publish a website
export const publishWebsite = async (website: Website) => {
  try {
    const websiteWithPublishStatus = {
      ...website,
      publishStatus: "published",
      publishedAt: new Date().toISOString()
    };
    
    // Save to Supabase
    const savedToSupabase = await saveWebsiteToSupabase(websiteWithPublishStatus);
    
    // Also save to localStorage as a backup
    localStorage.setItem("published-website", JSON.stringify(websiteWithPublishStatus));
    
    return savedToSupabase;
  } catch (error) {
    console.error("Error publishing website:", error);
    return false;
  }
};

// Function to check if Supabase is available
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('websites').select('count').limit(1);
    return !error;
  } catch (error) {
    console.error("Error checking Supabase connection:", error);
    return false;
  }
};
