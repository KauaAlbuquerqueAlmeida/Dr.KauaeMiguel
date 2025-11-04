import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = 'https://wpjpugvserfstssjpepc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwanB1Z3ZzZXJmc3Rzc2pwZXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMzczODAsImV4cCI6MjA3NzgxMzM4MH0.KQe1zpHtsnWhPZCmuGSYIZTKbOBAqlp7usUbJZtJ6XQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);