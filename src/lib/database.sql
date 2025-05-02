
-- Create the websites table to store website data
CREATE TABLE IF NOT EXISTS public.websites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  pages JSONB DEFAULT '[]'::jsonb NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  publish_status TEXT DEFAULT 'draft' NOT NULL,
  seo_settings JSONB DEFAULT '{}'::jsonb
);

-- Create Row Level Security (RLS) policies
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;

-- Create policy for SELECT that allows users to see only their own websites
CREATE POLICY "Allow users to select their own websites" ON public.websites
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy for INSERT that requires the user_id to match the authenticated user
CREATE POLICY "Allow users to insert their own websites" ON public.websites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy for UPDATE that only allows users to update their own websites
CREATE POLICY "Allow users to update their own websites" ON public.websites
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy for DELETE that only allows users to delete their own websites
CREATE POLICY "Allow users to delete their own websites" ON public.websites
  FOR DELETE USING (auth.uid() = user_id);

-- Create profiles table for additional user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for profiles
CREATE POLICY "Allow users to manage their own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- Create public access policy for profiles
CREATE POLICY "Allow public access to profiles" ON public.profiles
  FOR SELECT USING (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, first_name, last_name)
  VALUES (
    NEW.id,
    SPLIT_PART(NEW.email, '@', 1),
    COALESCE(NEW.raw_user_meta_data->>'first_name', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
