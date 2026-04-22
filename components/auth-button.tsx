'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export function AuthButton() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      setUser(authUser)
      setLoading(false)
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
  }, [supabase.auth])

  if (loading) {
    return (
      <div className="w-10 h-10 bg-secondary rounded-full animate-pulse"></div>
    )
  }

  if (user) {
    return (
      <Link
        href="/account"
        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-semibold text-sm"
      >
        Account
      </Link>
    )
  }

  return (
    <Link
      href="/auth/login"
      className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-semibold text-sm"
    >
      Sign In
    </Link>
  )
}
