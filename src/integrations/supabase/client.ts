
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

// Use static values if environment variables are not available
const supabaseUrl = "https://tlqilvhbjxrtocvsidpt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscWlsdmhianhydG9jdnNpZHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MTk1NDYsImV4cCI6MjA1OTk5NTU0Nn0.40ayOho2PMVln_5lO0TzYuWLP3G_cD9-ilCLTHZHdlo";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
