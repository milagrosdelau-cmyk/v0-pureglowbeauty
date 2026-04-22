'use client'

import Link from 'next/link'
import { XCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <XCircle className="w-20 h-20 mx-auto text-red-400" />
        </div>
        
        <h1 className="text-4xl font-serif font-bold mb-3">Payment Cancelled</h1>
        <p className="text-lg text-secondary-foreground mb-8">
          Your payment has been cancelled. Your cart is still saved, 
          so you can continue shopping whenever you&apos;re ready.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link href="/checkout">
            <Button className="w-full">
              Return to Checkout
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
