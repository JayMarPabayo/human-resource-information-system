import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hvmypxtkwqldigxsmxku.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bXlweHRrd3FsZGlneHNteGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MTA0NTEsImV4cCI6MjAyOTI4NjQ1MX0.XpwTTV2cMSpTMTFdmPkDERTXVZpyK2RdiKAGoTiXlYI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
