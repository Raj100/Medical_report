import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://quamculgdlqggfcggdot.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1YW1jdWxnZGxxZ2dmY2dnZG90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1MzgzMDYsImV4cCI6MjAyNzExNDMwNn0.TBlL4r5pj9OtmHzrsUm1DA8mYJKsT1X_0PSKcMeFeSc"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase