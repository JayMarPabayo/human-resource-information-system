import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zvavpcfamciqhbbtaaqm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2YXZwY2ZhbWNpcWhiYnRhYXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NTgyNjgsImV4cCI6MjAzMDAzNDI2OH0.nZb96wXo5w2WZDKvC65kYTvzx20HgV4-xuBjjZmvTZk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
