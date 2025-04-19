
import { supabase } from "@/integrations/supabase/client";

// Authentication services
export const authService = {
  // Sign up a new user
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },
  
  // Sign in a user
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },
  
  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
  
  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  },
  
  // Get current user
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user, error };
  }
};

// Database operations services
export const databaseService = {
  // Create a new website
  createWebsite: async (websiteData: any) => {
    const { data, error } = await supabase
      .from('websites' as any)
      .insert([websiteData] as any)
      .select();
    return { data, error };
  },
  
  // Get user websites
  getUserWebsites: async (userId: string) => {
    const { data, error } = await supabase
      .from('websites' as any)
      .select('*' as any)
      .eq('user_id', userId);
    return { data, error };
  },
  
  // Get website by ID
  getWebsiteById: async (id: string) => {
    const { data, error } = await supabase
      .from('websites' as any)
      .select('*' as any)
      .eq('id', id)
      .single();
    return { data, error };
  },
  
  // Update website
  updateWebsite: async (id: string, websiteData: any) => {
    const { data, error } = await supabase
      .from('websites' as any)
      .update(websiteData as any)
      .eq('id', id)
      .select();
    return { data, error };
  },
  
  // Delete website
  deleteWebsite: async (id: string) => {
    const { error } = await supabase
      .from('websites' as any)
      .delete()
      .eq('id', id);
    return { error };
  },
  
  // Pages operations
  pages: {
    create: async (pageData: any) => {
      const { data, error } = await supabase
        .from('pages' as any)
        .insert([pageData] as any)
        .select();
      return { data, error };
    },
    
    getByWebsite: async (websiteId: string) => {
      const { data, error } = await supabase
        .from('pages' as any)
        .select('*' as any)
        .eq('website_id', websiteId);
      return { data, error };
    },
    
    update: async (id: string, pageData: any) => {
      const { data, error } = await supabase
        .from('pages' as any)
        .update(pageData as any)
        .eq('id', id)
        .select();
      return { data, error };
    },
    
    delete: async (id: string) => {
      const { error } = await supabase
        .from('pages' as any)
        .delete()
        .eq('id', id);
      return { error };
    }
  }
};

// Storage operations services
export const storageService = {
  // Upload file
  uploadFile: async (bucketName: string, filePath: string, file: File) => {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);
    return { data, error };
  },
  
  // Get file URL
  getFileUrl: (bucketName: string, filePath: string) => {
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    return data.publicUrl;
  },
  
  // Delete file
  deleteFile: async (bucketName: string, filePath: string) => {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);
    return { error };
  },
  
  // List files
  listFiles: async (bucketName: string, folderPath?: string) => {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list(folderPath || '');
    return { data, error };
  }
};

export default {
  auth: authService,
  db: databaseService,
  storage: storageService
};
