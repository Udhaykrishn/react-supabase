import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tcduevvsrcmipwbvjjej.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjZHVldnZzcmNtaXB3YnZqamVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMTU2MTksImV4cCI6MjA1MDc5MTYxOX0.CQUMieVVRg715y3altSOn4AIJwcEU-LcSNIoxjaSmrY';

export const supabase = createClient(supabaseUrl, supabaseKey);
