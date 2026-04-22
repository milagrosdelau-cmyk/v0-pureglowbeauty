'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutSuccess() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    if (sessionId) {
      // Generate order number from session ID
      const orderNum = sessionId.substring(0, 12).toUpperCase()
      setOrderNumber(orderNum)
      
      // Log successful purchase
      console.log('[v0] Purchase completed - Order:', orderNum)
      console.log('[v0] Session ID:', sessionId)
    }
  }, [sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <CheckCircle2 className="w-20 h-20 mx-auto text-accent" />
        </div>
        
        <h1 className="text-4xl font-serif font-bold mb-3">Thank You!</h1>
        <p className="text-lg text-secondary-foreground mb-2">
          Your order has been confirmed.
        </p>
        
        {orderNumber && (
          <div className="bg-secondary rounded-lg p-4 mb-6">
            <p className="text-sm text-secondary-foreground/70 mb-1">Order Number</p>
            <p className="text-xl font-bold text-foreground">{orderNumber}</p>
          </div>
        )}
        
        <p className="text-secondary-foreground mb-8">
          We&apos;ve sent a confirmation email with your order details and shipping information. 
          You can track your order in your account dashboard.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link href="/orders">
            <Button className="w-full">
              Track Your Order
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
