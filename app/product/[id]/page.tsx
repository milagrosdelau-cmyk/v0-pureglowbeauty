'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Heart, Share2, ShoppingBag, Check } from 'lucide-react'
import { products } from '@/lib/data/products'
import { useStore } from '@/lib/store-context'
import { Button } from '@/components/ui/button'

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const { addToCart, currency } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const product = products.find(p => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <h1 className="text-3xl font-bold mb-4 text-foreground">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild className="bg-accent hover:bg-accent/90 text-white">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="text-accent hover:underline flex items-center gap-1">
            <ChevronLeft size={16} />
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/products" className="text-accent hover:underline">
            Products
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start">
            <div className="mb-6">
              <h1 className="text-4xl font-serif font-bold mb-2 text-foreground">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-foreground">
                  {currency === 'EUR' && '€'}
                  {currency === 'USD' && '$'}
                  {currency === 'GBP' && '£'}
                  {product.price}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {currency === 'EUR' && '€'}
                  {currency === 'USD' && '$'}
                  {currency === 'GBP' && '£'}
                  {(product.price * 1.25).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags?.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-foreground rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition"
                >
                  −
                </button>
                <span className="text-xl font-semibold text-foreground w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-3 mb-8">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-accent hover:bg-accent/90 text-white py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2"
              >
                {addedToCart ? (
                  <>
                    <Check size={20} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    Add to Cart
                  </>
                )}
              </Button>
              <button className="p-4 bg-secondary hover:bg-secondary/80 rounded-lg transition">
                <Heart size={20} />
              </button>
              <button className="p-4 bg-secondary hover:bg-secondary/80 rounded-lg transition">
                <Share2 size={20} />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-secondary pt-8 mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Product Details</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Category:</strong> {product.category}</p>
                <p><strong className="text-foreground">Type:</strong> {product.skinType || 'All skin types'}</p>
                {product.tone && (
                  <p><strong className="text-foreground">Tone:</strong> {product.tone}</p>
                )}
                <p><strong className="text-foreground">Benefits:</strong> {product.benefits?.join(', ') || 'Moisturizing, Hydrating'}</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="border-t border-secondary pt-8 mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Certifications</h3>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground flex items-center gap-2">
                  <Check size={16} className="text-accent" />
                  Dermatologically Tested
                </div>
                <div className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground flex items-center gap-2">
                  <Check size={16} className="text-accent" />
                  Non-Comedogenic
                </div>
                <div className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground flex items-center gap-2">
                  <Check size={16} className="text-accent" />
                  Paraben-Free
                </div>
                <div className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground flex items-center gap-2">
                  <Check size={16} className="text-accent" />
                  Vegan & Cruelty-Free
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-secondary pt-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-4 group-hover:opacity-80 transition">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={250}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="font-semibold text-foreground group-hover:text-accent transition mb-1">
                    {relatedProduct.name}
                  </p>
                  <p className="text-accent font-bold">
                    {currency === 'EUR' && '€'}
                    {currency === 'USD' && '$'}
                    {currency === 'GBP' && '£'}
                    {relatedProduct.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
