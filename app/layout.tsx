import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { StoreProvider } from '@/lib/store-context'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif"
})

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: 'PureGlowBeauty | Luxury Cruelty-Free Cosmetics',
  description: 'Discover luxury, cruelty-free cosmetics crafted in Barcelona. Premium makeup for lips, eyes, face & skincare. International shipping to 50+ countries. 100% Vegan & Sustainable.',
  keywords: 'luxury cosmetics, cruelty-free makeup, vegan beauty, sustainable skincare, Barcelona cosmetics, international beauty brand',
  authors: [{ name: 'PureGlowBeauty' }],
  creator: 'PureGlowBeauty',
  openGraph: {
    title: 'PureGlowBeauty | Luxury Cruelty-Free Cosmetics',
    description: 'Premium, sustainable beauty products crafted in Barcelona. International shipping available.',
    type: 'website',
    locale: 'en_US',
    siteName: 'PureGlowBeauty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PureGlowBeauty | Luxury Cruelty-Free Cosmetics',
    description: 'Premium, sustainable beauty products crafted in Barcelona.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5ebe0' },
    { media: '(prefers-color-scheme: dark)', color: '#2d2a26' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID
  
  return (
    <html lang="en" className="bg-background">
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-script" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  'page_path': window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased`}>
        <StoreProvider>
          {children}
        </StoreProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
