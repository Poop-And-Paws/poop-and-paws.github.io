import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ozpvjrrnpsvfbzfndgub.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cHZqcnJucHN2ZmJ6Zm5kZ3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMzA5ODIsImV4cCI6MjA1NzYwNjk4Mn0.96mmLiJ-9GDd8_gnSFkJ02nG2w4p4BDj471kxO-dFZE";

export const supabase = createClient(supabaseUrl, supabaseKey);