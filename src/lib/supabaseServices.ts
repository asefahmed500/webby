
import { supabase } from "@/integrations/supabase/client";

// Type assertion function to bypass type checking issues
const asTable = (tableName: string) => tableName as never;
const asColumn = (columnName: string) => columnName as never;
const asRecord = (data: Record<string, any>) => data as never;
const asRecordArray = (data: Record<string, any>[]) => data as never[];

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
  createWebsite: async (websiteData: Record<string, any>) => {
    const { data, error } = await supabase
      .from(asTable('websites'))
      .insert([asRecord(websiteData)])
      .select(asColumn('*'));
    return { data, error };
  },
  
  // Get user websites
  getUserWebsites: async (userId: string) => {
    const { data, error } = await supabase
      .from(asTable('websites'))
      .select(asColumn('*'))
      .eq('user_id', userId);
    return { data, error };
  },
  
  // Get website by ID
  getWebsiteById: async (id: string) => {
    const { data, error } = await supabase
      .from(asTable('websites'))
      .select(asColumn('*'))
      .eq('id', id)
      .single();
    return { data, error };
  },
  
  // Update website
  updateWebsite: async (id: string, websiteData: Record<string, any>) => {
    const { data, error } = await supabase
      .from(asTable('websites'))
      .update(asRecord(websiteData))
      .eq('id', id)
      .select(asColumn('*'));
    return { data, error };
  },
  
  // Delete website
  deleteWebsite: async (id: string) => {
    const { error } = await supabase
      .from(asTable('websites'))
      .delete()
      .eq('id', id);
    return { error };
  },
  
  // Pages operations
  pages: {
    create: async (pageData: Record<string, any>) => {
      const { data, error } = await supabase
        .from(asTable('pages'))
        .insert([asRecord(pageData)])
        .select(asColumn('*'));
      return { data, error };
    },
    
    getByWebsite: async (websiteId: string) => {
      const { data, error } = await supabase
        .from(asTable('pages'))
        .select(asColumn('*'))
        .eq('website_id', websiteId);
      return { data, error };
    },
    
    update: async (id: string, pageData: Record<string, any>) => {
      const { data, error } = await supabase
        .from(asTable('pages'))
        .update(asRecord(pageData))
        .eq('id', id)
        .select(asColumn('*'));
      return { data, error };
    },
    
    delete: async (id: string) => {
      const { error } = await supabase
        .from(asTable('pages'))
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
