import { useEffect } from 'react'

export interface AnalyticsEvent {
  event_name: string
  event_data?: Record<string, any>
  user_country?: string
  user_currency?: string
  user_language?: string
}

// Initialize GA4 (global tracking ID should be in env)
export function initializeGA4() {
  if (typeof window === 'undefined') return

  const trackingId = process.env.NEXT_PUBLIC_GA4_ID
  if (!trackingId) {
    console.warn('[Analytics] GA4 tracking ID not configured')
    return
  }

  // Google Analytics script will be injected by Next.js
  // Add gtag to window
  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtag(...args: any[]) {
    ;(window as any).dataLayer.push(arguments)
  }
  ;(window as any).gtag = gtag
}

// Track user location and preferences
export async function getUserLocation() {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return {
      country: data.country_code,
      timezone: data.timezone,
      city: data.city,
    }
  } catch (error) {
    console.warn('[Analytics] Failed to get user location:', error)
    return null
  }
}

// Log events with user context
export function logEvent(event: AnalyticsEvent, userContext?: any) {
  const timestamp = new Date().toISOString()
  const logMessage = `[User Country: ${
    event.user_country || userContext?.country || 'Unknown'
  }] -> [Action: ${event.event_name}]`

  console.log(`[Analytics] ${logMessage} at ${timestamp}`)

  // Send to GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', event.event_name, {
      ...event.event_data,
      user_country: event.user_country,
      user_currency: event.user_currency,
      user_language: event.user_language,
    })
  }

  return {
    timestamp,
    logMessage,
    event,
  }
}

// Specific event trackers
export const analyticsEvents = {
  VIEW_ITEM: (productId: string, productName: string, price: number, currency: string) =>
    logEvent({
      event_name: 'view_item',
      event_data: {
        item_id: productId,
        item_name: productName,
        price,
        currency,
      },
    }),

  ADD_TO_CART: (productId: string, productName: string, quantity: number, price: number) =>
    logEvent({
      event_name: 'add_to_cart',
      event_data: {
        item_id: productId,
        item_name: productName,
        quantity,
        price,
      },
    }),

  VIEW_CART: (cartItems: any[], cartTotal: number) =>
    logEvent({
      event_name: 'view_cart',
      event_data: {
        items_count: cartItems.length,
        cart_total: cartTotal,
      },
    }),

  BEGIN_CHECKOUT: (cartItems: any[], total: number, currency: string) =>
    logEvent({
      event_name: 'begin_checkout',
      event_data: {
        items_count: cartItems.length,
        value: total,
        currency,
      },
    }),

  PURCHASE: (
    orderId: string,
    totalAmount: number,
    currency: string,
    items: any[],
    shippingCountry?: string
  ) =>
    logEvent({
      event_name: 'purchase',
      event_data: {
        transaction_id: orderId,
        value: totalAmount,
        currency,
        items_count: items.length,
        shipping_country: shippingCountry,
      },
      user_country: shippingCountry,
      user_currency: currency,
    }),

  SEARCH: (searchQuery: string, resultsCount: number) =>
    logEvent({
      event_name: 'search',
      event_data: {
        search_term: searchQuery,
        results_count: resultsCount,
      },
    }),

  VIEW_CATEGORY: (categoryName: string, itemsCount: number) =>
    logEvent({
      event_name: 'view_item_list',
      event_data: {
        item_list_name: categoryName,
        items_count: itemsCount,
      },
    }),

  LOGIN: (method: string) =>
    logEvent({
      event_name: 'login',
      event_data: {
        method, // 'google', 'email', etc.
      },
    }),

  SIGN_UP: (method: string) =>
    logEvent({
      event_name: 'sign_up',
      event_data: {
        method,
      },
    }),

  CONTACT_FORM: (formType: string, hasEmail: boolean) =>
    logEvent({
      event_name: 'contact_form',
      event_data: {
        form_type: formType,
        has_email: hasEmail,
      },
    }),
}

// Hook to track page views
export function usePageView(pageName: string) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
      })
    }
    console.log(`[Analytics] Page viewed: ${pageName}`)
  }, [pageName])
}
