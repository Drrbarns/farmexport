'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  
  // Check if Supabase is properly configured by checking the URL
  const isSupabaseConfigured = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    return !!(url && url !== 'https://example.supabase.co' && key && key !== 'public-anon-key')
  }, [])

  useEffect(() => {
    // Only subscribe if Supabase is properly configured
    if (!isSupabaseConfigured) {
      return
    }

    let channel: ReturnType<typeof supabase.channel> | null = null

    try {
      channel = supabase
        .channel('realtime_updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
          },
          (payload) => {
            console.log('Realtime change detected:', payload)
            router.refresh()
          }
        )
        .subscribe()
    } catch (error) {
      console.error('Failed to subscribe to realtime updates:', error)
    }

    return () => {
      if (channel) {
        try {
          supabase.removeChannel(channel)
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    }
  }, [supabase, router, isSupabaseConfigured])

  return <>{children}</>
}




