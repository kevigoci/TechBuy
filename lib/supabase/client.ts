import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build time, env vars might not be available
  // We need to provide valid-looking defaults that won't cause validation errors
  // Note: These should be set in your Digital Ocean build environment variables
  if (!url || !key || typeof window === 'undefined') {
    // Return a client with minimal valid-looking values during build/SSR
    // This prevents build failures - actual values will be used at runtime in browser
    const buildUrl = url || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vfbdghoispkirxyomkkx.supabase.co'
    const buildKey = key || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder'
    
    return createBrowserClient<Database>(buildUrl, buildKey)
  }

  return createBrowserClient<Database>(url, key)
}
