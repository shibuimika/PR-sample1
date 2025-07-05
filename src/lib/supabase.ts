import { createClient } from '@supabase/supabase-js';

// 環境変数の型安全な取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
}

if (!supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
}

// Supabaseクライアントの作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// データベース型定義（後でSupabaseのCLIで自動生成可能）
export interface Database {
  public: {
    Tables: {
      reporters: {
        Row: {
          id: string;
          name: string;
          company: string;
          email: string;
          phone?: string;
          position?: string;
          interests: string[];
          specialties: string[];
          contact_preference: 'email' | 'phone' | 'both';
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reporters']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['reporters']['Insert']>;
      };
      articles: {
        Row: {
          id: string;
          reporter_id: string;
          title: string;
          content?: string;
          url?: string;
          published_at: string;
          tags: string[];
          summary?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['articles']['Insert']>;
      };
      contact_history: {
        Row: {
          id: string;
          reporter_id: string;
          date: string;
          type: 'email' | 'phone' | 'meeting' | 'other';
          subject: string;
          content: string;
          outcome: 'successful' | 'no_response' | 'interested' | 'not_interested' | 'follow_up_needed';
          next_action_date?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact_history']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['contact_history']['Insert']>;
      };
      themes: {
        Row: {
          id: string;
          title: string;
          description: string;
          keywords: string[];
          category?: string;
          priority: 'low' | 'medium' | 'high';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['themes']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['themes']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          event_date: string;
          location?: string;
          attendees: string[];
          tags: string[];
          status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      file_uploads: {
        Row: {
          id: string;
          filename: string;
          original_name: string;
          mime_type: string;
          size: number;
          url: string;
          extracted_text?: string;
          processed_at?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['file_uploads']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['file_uploads']['Insert']>;
      };
    };
  };
}

// 型付きSupabaseクライアント
export const typedSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey); 