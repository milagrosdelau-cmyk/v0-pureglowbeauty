'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-red-600">
            Authentication Error
          </h1>
          <p className="text-center text-muted-foreground mb-4">
            {searchParams.message || 'An error occurred during authentication'}
          </p>

          <Button
            asChild
            className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-semibold"
          >
            <Link href="/auth/login">Try Again</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full mt-3 py-3 rounded-lg font-semibold"
          >
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
