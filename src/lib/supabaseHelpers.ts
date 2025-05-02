
import { supabase } from '@/integrations/supabase/client';
import { Page } from '@/lib/pageData';
import { Website, NewWebsite, UpdateWebsite } from '@/types/database.types';
import { v4 as uuidv4 } from 'uuid';

// Get all websites for a user
export const getUserWebsites = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
      
    if (error) throw error;
    
    return data as Website[];
  } catch (error) {
    console.error('Error getting user websites:', error);
    throw error;
  }
};

// Save a website
export const saveWebsite = async (websiteData: UpdateWebsite) => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .upsert(websiteData)
      .select();
      
    if (error) throw error;
    
    return data?.[0] as Website;
  } catch (error) {
    console.error('Error saving website:', error);
    throw error;
  }
};

// Publish a website (or multiple websites)
export const publishWebsite = async (websiteData: Website | Website[]) => {
  try {
    // Handle single website or array of websites
    const websites = Array.isArray(websiteData) ? websiteData : [websiteData];
    
    // Update each website with published status
    const updatedWebsites = websites.map(website => ({
      ...website,
      published_at: new Date().toISOString(),
      publish_status: 'published'
    }));
    
    const { data, error } = await supabase
      .from('websites')
      .upsert(updatedWebsites)
      .select();
      
    if (error) throw error;
    
    return data as Website[];
  } catch (error) {
    console.error('Error publishing website:', error);
    throw error;
  }
};

// Get a specific website by ID
export const getWebsiteById = async (websiteId: string) => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('id', websiteId)
      .single();
      
    if (error) throw error;
    
    return data as Website;
  } catch (error) {
    console.error('Error getting website by ID:', error);
    throw error;
  }
};

// Get all published websites
export const getPublishedWebsites = async () => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('publish_status', 'published')
      .order('published_at', { ascending: false });
      
    if (error) throw error;
    
    return data as Website[];
  } catch (error) {
    console.error('Error getting published websites:', error);
    throw error;
  }
};

// Delete a website
export const deleteWebsite = async (websiteId: string) => {
  try {
    const { error } = await supabase
      .from('websites')
      .delete()
      .eq('id', websiteId);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting website:', error);
    throw error;
  }
};
