import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://bcviznuvpbzfgnmwwnar.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjdml6bnV2cGJ6ZmdubXd3bmFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTgyNTIsImV4cCI6MjA2MzUzNDI1Mn0.pVStHRlK9Azh7CDR0F7TUpyTN4YMASzaVL7dEIkP35s';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };