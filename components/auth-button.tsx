'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { User } from 'lucide-react'

export function AuthButton() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabaseReady, setSupabaseReady] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (!supabase) {
      setSupabaseReady(false)
      setLoading(false)
      return
    }

    setSupabaseReady(true)
    
    const getUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()
        setUser(authUser)
      } catch (error) {
        console.warn('[v0] Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  if (loading) {
    return (
      <div className="w-10 h-10 bg-secondary rounded-full animate-pulse"></div>
    )
  }

  if (user && supabaseReady) {
    return (
      <Link
        href="/account"
        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-semibold text-sm flex items-center gap-2"
      >
        <User size={16} />
        Account
      </Link>
    )
  }

  if (supabaseReady) {
    return (
      <Link
        href="/auth/login"
        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-semibold text-sm flex items-center gap-2"
      >
        <User size={16} />
        Sign In
      </Link>
    )
  }

  return (
    <button
      className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/90 transition font-semibold text-sm flex items-center gap-2 cursor-not-allowed opacity-50"
      disabled
      title="Authentication not available"
    >
      <User size={16} />
      Account
    </button>
  )
}
