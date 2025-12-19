import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Message {
  id: string;
  content: string;
  is_user: boolean;
  timestamp: string;
  read: boolean;
  created_at: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  order: number;
  active: boolean;
}
