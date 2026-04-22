"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Lock, Truck, ShieldCheck, Check, Apple, AlertCircle } from 'lucide-react'
import { StoreProvider, useStore } from '@/lib/store-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { redirectToCheckout } from '@/lib/stripe'

const countries = [
  'Spain', 'United States', 'United Kingdom', 'Germany', 'France', 'Italy',
  'Portugal', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Japan',
  'South Korea', 'Australia', 'Canada', 'Mexico', 'Brazil', 'Argentina'
]

function CheckoutContent() {
  const { cart, cartTotal, formatPrice, currency, t } = useStore()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const shipping = cartTotal >= 75 ? 0 : 9.99
  const tax = cartTotal * 0.21
  const total = cartTotal + shipping + tax

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (paymentMethod !== 'card' || step !== 3) {
      return
    }

    if (!email) {
      setError('Please enter your email')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cart,
          currency,
          email,
        }),
      })

      if (!response.ok) {
        throw new Error('Checkout failed')
      }

      const { sessionId } = await response.json()
      console.log('[v0] Stripe session created:', sessionId)
      
      await redirectToCheckout(sessionId)
    } catch (err) {
      console.error('[v0] Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else if (paymentMethod === 'card') {
      handlePayment(e)
    } else {
      // Simulate other payment methods
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setIsComplete(true)
      }, 2000)
    }
  }

  if (cart.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to continue shopping</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={40} className="text-primary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-serif font-bold mb-4">Thank You!</h1>
          <p className="text-muted-foreground mb-4">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <p className="text-sm font-sans text-foreground mb-8">
            Order Number: <strong>#PGB{Date.now().toString().slice(-8)}</strong>
          </p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 lg:pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl lg:text-3xl font-serif font-bold mb-8">{t('checkout')}</h1>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans font-medium transition-colors ${
                      step >= s
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {step > s ? <Check size={16} /> : s}
                  </div>
                  <span className={`text-sm font-sans hidden sm:block ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
                  </span>
                  {s < 3 && <div className={`w-12 h-px ${step > s ? 'bg-primary' : 'bg-border'}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-serif font-semibold">Shipping Information</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-sans text-muted-foreground block mb-2">First Name</label>
                      <Input required className="h-12" placeholder="John" />
                    </div>
                    <div>
                      <label className="text-sm font-sans text-muted-foreground block mb-2">Last Name</label>
                      <Input required className="h-12" placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-sans text-muted-foreground block mb-2">Email</label>
                    <Input type="email" required className="h-12" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div>
                    <label className="text-sm font-sans text-muted-foreground block mb-2">Phone</label>
                    <Input type="tel" required className="h-12" placeholder="+34 612 345 678" />
                  </div>

                  <div>
                    <label className="text-sm font-sans text-muted-foreground block mb-2">Country</label>
                    <select className="w-full h-12 px-4 rounded-md border border-input bg-background">
                      {countries.map(country => (
                        <option key={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-sans text-muted-foreground block mb-2">Address</label>
                    <Input required className="h-12" placeholder="123 Beauty Street" />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="text-sm font-sans text-muted-foreground block mb-2">Postal Code</label>
                      <Input required className="h-12" placeholder="08001" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-sans text-muted-foreground block mb-2">City</label>
                      <Input required className="h-12" placeholder="Barcelona" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 font-sans">
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-serif font-semibold">Payment Method</h2>

                  {/* Payment Options */}
                  <div className="grid gap-3">
                    {[
                      { id: 'card', icon: CreditCard, label: 'Credit / Debit Card' },
                      { id: 'paypal', icon: CreditCard, label: 'PayPal' },
                      { id: 'apple', icon: Apple, label: 'Apple Pay' }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <method.icon size={24} className={paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'} />
                        <span className="font-sans font-medium">{method.label}</span>
                        {paymentMethod === method.id && (
                          <div className="ml-auto w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check size={12} className="text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4">
                      <div>
                        <label className="text-sm font-sans text-muted-foreground block mb-2">Card Number</label>
                        <Input required className="h-12" placeholder="4242 4242 4242 4242" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-sans text-muted-foreground block mb-2">Expiry Date</label>
                          <Input required className="h-12" placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="text-sm font-sans text-muted-foreground block mb-2">CVC</label>
                          <Input required className="h-12" placeholder="123" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-sans text-muted-foreground block mb-2">Cardholder Name</label>
                        <Input required className="h-12" placeholder="John Doe" />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 h-12 font-sans">
                      Review Order
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-serif font-semibold">Review Your Order</h2>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="bg-secondary/30 rounded-xl p-4 space-y-4">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif font-medium text-sm">{item.product.name}</h4>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-sans font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Security Badges */}
                  <div className="flex items-center justify-center gap-6 py-4 border-y border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock size={16} className="text-primary" />
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck size={16} className="text-primary" />
                      <span>Secure Checkout</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-12">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 h-12 font-sans gap-2" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock size={16} />
                          Place Order - {formatPrice(total)}
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-secondary/30 rounded-2xl p-6 sticky top-32">
              <h2 className="text-lg font-serif font-semibold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm truncate">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground capitalize">{item.product.category}</p>
                    </div>
                    <span className="text-sm font-sans font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <Input placeholder="Discount code" className="h-10" />
                <Button variant="outline" size="sm">Apply</Button>
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? 'text-primary' : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">Tax (21% VAT)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-serif font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-primary/10 rounded-lg flex items-start gap-3">
                <Truck size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sans font-medium">
                    {shipping === 0 ? 'Free International Shipping!' : `Add ${formatPrice(75 - cartTotal)} for free shipping`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Estimated delivery: 5-7 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <StoreProvider>
      <Header />
      <main>
        <CheckoutContent />
      </main>
      <Footer />
      <CartDrawer />
    </StoreProvider>
  )
}
