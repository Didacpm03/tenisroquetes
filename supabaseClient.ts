// supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://skjjfdhfthgasnysbrck.supabase.co'  // tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrampmZGhmdGhnYXNueXNicmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NDExMzYsImV4cCI6MjA2MjExNzEzNn0.KgOKqRmSEAAc9h0dcZH5H9YLuSwvWriCR5DWY2bp-c4'              // tu API Key (anon/public)

export const supabase = createClient(supabaseUrl, supabaseKey)
