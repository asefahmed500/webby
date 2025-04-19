/**
 * Supabase Setup Guide for Website Builder Platform
 * 
 * This file provides guidance on how to set up Supabase for the website builder platform.
 * Follow these steps to configure your Supabase project:
 */

import { supabase } from "@/integrations/supabase/client";

/**
 * Step 1: Create a Supabase Project
 * 
 * 1. Go to https://supabase.com and create an account
 * 2. Create a new project
 * 3. Copy your project URL and anon key to your .env.local file:
 *    VITE_SUPABASE_URL=your_supabase_url
 *    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
 */

/**
 * Step 2: Set Up Authentication
 * 
 * 1. In Supabase Dashboard, go to Authentication > Settings:
 *    - Enable Email auth provider
 *    - Set your site URL to http://localhost:5173 (for development)
 *    - Add http://localhost:5173/* to the redirect URLs
 *    - Optionally disable email confirmations for easier testing
 * 
 * 2. To add social login providers:
 *    - Go to Authentication > Providers
 *    - Configure each provider with their respective API keys
 */

/**
 * Step 3: Create Database Tables
 * 
 * Run these SQL commands in the Supabase SQL Editor:
 * 
 * -- Create websites table to store website data
 * CREATE TABLE public.websites (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   name TEXT NOT NULL,
 *   description TEXT,
 *   user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   published_at TIMESTAMPTZ,
 *   template_id TEXT,
 *   custom_domain TEXT,
 *   subdomain TEXT UNIQUE,
 *   is_template BOOLEAN DEFAULT FALSE
 * );
 * 
 * -- Create pages table to store website pages
 * CREATE TABLE public.pages (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   website_id UUID NOT NULL REFERENCES public.websites(id) ON DELETE CASCADE,
 *   name TEXT NOT NULL,
 *   slug TEXT NOT NULL,
 *   is_home BOOLEAN DEFAULT FALSE,
 *   content JSONB NOT NULL DEFAULT '[]'::JSONB,
 *   meta_title TEXT,
 *   meta_description TEXT,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   UNIQUE (website_id, slug)
 * );
 * 
 * -- Create user profiles table for extended user data
 * CREATE TABLE public.profiles (
 *   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 *   username TEXT UNIQUE,
 *   avatar_url TEXT,
 *   role TEXT NOT NULL DEFAULT 'user',
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 * 
 * -- Create assets table to track uploaded files
 * CREATE TABLE public.assets (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 *   website_id UUID REFERENCES public.websites(id) ON DELETE CASCADE,
 *   file_name TEXT NOT NULL,
 *   file_path TEXT NOT NULL,
 *   file_type TEXT NOT NULL,
 *   file_size INTEGER NOT NULL,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 * 
 * -- Create form submissions table
 * CREATE TABLE public.form_submissions (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   website_id UUID NOT NULL REFERENCES public.websites(id) ON DELETE CASCADE,
 *   page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
 *   form_id TEXT NOT NULL,
 *   data JSONB NOT NULL,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   ip_address TEXT
 * );
 * 
 * -- Create analytics table
 * CREATE TABLE public.analytics (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   website_id UUID NOT NULL REFERENCES public.websites(id) ON DELETE CASCADE,
 *   page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
 *   event_type TEXT NOT NULL,
 *   event_data JSONB NOT NULL DEFAULT '{}'::JSONB,
 *   user_agent TEXT,
 *   ip_address TEXT,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 */

/**
 * Step 4: Set Up Row-Level Security (RLS)
 * 
 * Run these SQL commands:
 * 
 * -- Enable RLS on all tables
 * ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
 * 
 * -- RLS policies for websites
 * CREATE POLICY "Users can view their own websites" 
 *   ON websites FOR SELECT 
 *   USING (auth.uid() = user_id);
 * 
 * CREATE POLICY "Users can create their own websites" 
 *   ON websites FOR INSERT 
 *   WITH CHECK (auth.uid() = user_id);
 * 
 * CREATE POLICY "Users can update their own websites" 
 *   ON websites FOR UPDATE 
 *   USING (auth.uid() = user_id);
 * 
 * CREATE POLICY "Users can delete their own websites" 
 *   ON websites FOR DELETE 
 *   USING (auth.uid() = user_id);
 * 
 * -- Similar policies for other tables...
 */

/**
 * Step 5: Create Storage Buckets
 * 
 * Run these SQL commands:
 * 
 * -- Create bucket for website assets
 * INSERT INTO storage.buckets (id, name, public) 
 * VALUES ('website_assets', 'Website Assets', true);
 * 
 * -- Create bucket for user uploads
 * INSERT INTO storage.buckets (id, name, public) 
 * VALUES ('user_uploads', 'User Uploads', true);
 * 
 * -- Create bucket for user avatars
 * INSERT INTO storage.buckets (id, name, public) 
 * VALUES ('avatars', 'User Avatars', true);
 * 
 * -- Create policies for storage
 * CREATE POLICY "Public can view website assets" 
 *   ON storage.objects FOR SELECT 
 *   USING (bucket_id = 'website_assets');
 * 
 * CREATE POLICY "Users can upload their own assets" 
 *   ON storage.objects FOR INSERT 
 *   WITH CHECK (bucket_id = 'website_assets' AND auth.uid() = owner);
 * 
 * -- Similar policies for other buckets...
 */

/**
 * Step 6: Set Up Edge Functions (for Advanced Features)
 * 
 * For features like email sending, payment processing, etc.,
 * create Supabase Edge Functions:
 * 
 * 1. Install Supabase CLI
 * 2. Initialize Supabase: supabase init
 * 3. Create edge functions:
 *    - supabase functions new send-email
 *    - supabase functions new process-payment
 *    - etc.
 * 4. Deploy: supabase functions deploy
 */

/**
 * How to use Supabase in the application
 */

// Authentication examples
export const authExamples = {
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
};

// Database operations examples
export const databaseExamples = {
  // Create a new website
  createWebsite: async (websiteData: any) => {
    const { data, error } = await supabase
      .from('websites' as any)
      .insert([websiteData])
      .select();
    return { data, error };
  },
  
  // Get user websites
  getUserWebsites: async (userId: string) => {
    const { data, error } = await supabase
      .from('websites' as any)
      .select('*')
      .eq('user_id', userId);
    return { data, error };
  },
  
  // Update website
  updateWebsite: async (id: string, websiteData: any) => {
    const { data, error } = await supabase
      .from('websites' as any)
      .update(websiteData)
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
};

// Storage operations examples
export const storageExamples = {
  // Upload file
  uploadFile: async (bucketName: string, filePath: string, file: File) => {
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file);
    return { data, error };
  },
  
  // Get file URL
  getFileUrl: (bucketName: string, filePath: string) => {
    const { data } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(filePath);
    return data.publicUrl;
  },
  
  // Delete file
  deleteFile: async (bucketName: string, filePath: string) => {
    const { error } = await supabase
      .storage
      .from(bucketName)
      .remove([filePath]);
    return { error };
  },
};

export default {
  authExamples,
  databaseExamples,
  storageExamples,
};
