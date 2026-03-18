import { createClient } from '@supabase/supabase-js'  

const supabaseUrl = 'https://otbqcrqfieonamtyxdka.supabase.co'  
const supabaseKey = 'sb_publishable_U7Emgwbiq47kQffrB3NbNg_3Ii3-oln'  

export const supabase = createClient(supabaseUrl, supabaseKey)