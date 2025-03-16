import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nuknwpmknuvxtrcujnfj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51a253cG1rbnV2eHRyY3VqbmZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwOTQ4MjksImV4cCI6MjA1NzY3MDgyOX0.l-yWej8wR815Si5QL217ootIsYQhqF2M7xTN0MjeD6Q";

export const supabase = createClient(supabaseUrl, supabaseKey);