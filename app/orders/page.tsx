'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  currency: string
  created_at: string
  updated_at: string
  items: any[]
  shipping_address?: {
    country: string
    customs_status?: string
  }
}

const statusSteps = [
  { status: 'Procesando', label: 'Processing', icon: Clock },
  { status: 'En Tránsito Internacional', label: 'In Transit', icon: Truck },
  { status: 'Entregado', label: 'Delivered', icon: CheckCircle2 }
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getOrders = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          redirect('/auth/login')
        }

        const { data, error: fetchError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (fetchError) {
          setError('Failed to load orders')
        } else {
          setOrders(data || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    getOrders()
  }, [supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-32">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
          <Button asChild variant="outline">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-white">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-secondary">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="text-lg font-semibold text-foreground">{order.order_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="text-lg font-semibold text-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-lg font-semibold text-accent">
                      {order.currency === 'EUR' && '€'}
                      {order.currency === 'USD' && '$'}
                      {order.currency === 'GBP' && '£'}
                      {order.currency === 'CNY' && '¥'}
                      {order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-foreground mb-4">Delivery Status</p>
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, index) => {
                      const isActive = statusSteps.findIndex(s => s.status === order.status) >= index
                      const isCurrent = step.status === order.status
                      const Icon = step.icon

                      return (
                        <div key={step.status} className="flex items-center flex-1">
                          <div className="flex flex-col items-center">
                            <div
                              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                                isActive
                                  ? 'bg-accent border-accent text-white'
                                  : 'bg-secondary border-secondary text-muted-foreground'
                              }`}
                            >
                              <Icon size={20} />
                            </div>
                            <p className="text-xs font-medium mt-2 text-center">{step.label}</p>
                            {isCurrent && (
                              <p className="text-xs text-accent font-semibold mt-1">Current</p>
                            )}
                          </div>
                          {index < statusSteps.length - 1 && (
                            <div
                              className={`flex-1 h-1 mx-2 transition-colors ${
                                isActive ? 'bg-accent' : 'bg-secondary'
                              }`}
                            ></div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* International Shipping Info */}
                {order.shipping_address?.country && (
                  <div className="bg-secondary rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-foreground mb-2">📦 International Shipping Information</p>
                    <p className="text-sm text-muted-foreground">
                      Shipping to: <strong>{order.shipping_address.country}</strong>
                    </p>
                    {order.shipping_address.customs_status && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Customs Status: <strong>{order.shipping_address.customs_status}</strong>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-3">
                      International orders may be subject to local import duties and taxes. These are the responsibility of the recipient.
                    </p>
                  </div>
                )}

                {/* Order Items */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-foreground mb-3">Items ({order.items?.length || 0})</p>
                  <div className="space-y-2">
                    {order.items?.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-secondary rounded"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-foreground">
                          {order.currency === 'EUR' && '€'}
                          {order.currency === 'USD' && '$'}
                          {order.currency === 'GBP' && '£'}
                          {order.currency === 'CNY' && '¥'}
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/contact">Get Help</Link>
                  </Button>
                  <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-white">
                    <Link href="/products">Shop More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
