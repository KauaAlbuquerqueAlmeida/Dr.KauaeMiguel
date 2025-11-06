import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// 🔹 Suas credenciais do Supabase
const SUPABASE_URL = 'https://wpjpugvserfstssjpepc.supabase.co'; // coloque sua URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwanB1Z3ZzZXJmc3Rzc2pwZXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMzczODAsImV4cCI6MjA3NzgxMzM4MH0.KQe1zpHtsnWhPZCmuGSYIZTKbOBAqlp7usUbJZtJ6XQ'; // coloque sua chave anon

// 🔹 Cria o cliente
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // importante no React Native
  },
});