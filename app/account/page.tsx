'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface UserProfile {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

export default function AccountPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
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
          error,
        } = await supabase.auth.getUser()

        if (error || !authUser) {
          redirect('/auth/login')
        }

        setUser({
          id: authUser.id,
          email: authUser.email || '',
          user_metadata: authUser.user_metadata,
        })
      } catch (error) {
        console.error('[v0] Account fetch error:', error)
        redirect('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase])

  if (!supabaseReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Authentication not configured</p>
          <Link href="/" className="text-accent hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading account...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">My Account</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg text-foreground">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg text-foreground">
                {user.user_metadata?.full_name || 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="text-lg font-mono text-foreground text-sm break-all">{user.id}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Orders</h2>
          <p className="text-muted-foreground mb-4">Your order history will appear here once implemented</p>
          <Link href="/orders" className="text-accent hover:underline font-semibold">
            View Orders →
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            href="/"
            className="flex-1 bg-secondary text-foreground hover:bg-secondary/80 py-3 rounded-lg font-semibold text-center transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/auth/logout"
            className="flex-1 bg-red-600 text-white hover:bg-red-700 py-3 rounded-lg font-semibold text-center transition"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  )
}
