import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

let stripe: Stripe | null = null

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
  })
}

const currencyRates = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
  CNY: 7.85,
}

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { cartItems, currency = 'EUR', email } = body

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Empty cart' }, { status: 400 })
    }

    const rate = currencyRates[currency as keyof typeof currencyRates] || 1
    const stripeMultiplier = 100

    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: item.name,
          description: item.category,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * rate * stripeMultiplier),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/cancel`,
      customer_email: email,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['ES', 'FR', 'DE', 'IT', 'GB', 'US', 'CA', 'MX', 'CN', 'JP', 'AU'],
      },
      metadata: {
        currency,
        items_count: cartItems.length,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('[v0] Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
