import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qaiiadeqktohmllbvnnw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaWlhZGVxa3RvaG1sbGJ2bm53Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDUyODI1MCwiZXhwIjoyMDk2MTA0MjUwfQ.Eej7FOYJPZC4ojOjuD58RWAEHKIMy5IIqXpwk_cuXus'
);

// Check if admin_users exists
const { data, error } = await supabase.from('admin_users').select('id').limit(1);
console.log('admin_users exists:', !error);
if (error) console.log('Error:', error.code, error.message?.slice(0, 80));
else console.log('Rows:', data?.length);
