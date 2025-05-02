
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      websites: {
        Row: {
          id: string
          name: string
          description: string
          pages: Json
          created_at: string
          updated_at: string
          published_at: string | null
          user_id: string
          publish_status: string
          seo_settings: Json | null
        }
        Insert: {
          id?: string
          name: string
          description?: string
          pages?: Json
          created_at?: string
          updated_at?: string
          published_at?: string | null
          user_id: string
          publish_status?: string
          seo_settings?: Json | null
        }
        Update: {
          id?: string
          name?: string
          description?: string
          pages?: Json
          created_at?: string
          updated_at?: string
          published_at?: string | null
          user_id?: string
          publish_status?: string
          seo_settings?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Website = Database['public']['Tables']['websites']['Row']
export type NewWebsite = Database['public']['Tables']['websites']['Insert']
export type UpdateWebsite = Database['public']['Tables']['websites']['Update']
