"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Menu, X, Globe, ChevronDown, Heart, User } from 'lucide-react'
import { useStore, languageNames, currencySymbols, type Language, type Currency } from '@/lib/store-context'
import { categories } from '@/lib/data/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthButton } from '@/components/auth-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const promoMessages = [
  { key: 'freeShipping' as const, icon: '✈️' },
  { key: 'seasonDiscount' as const, icon: '🏷️' },
  { key: 'crueltyFree' as const, icon: '🐰' },
]

export function Header() {
  const { t, language, setLanguage, currency, setCurrency, cartCount, setIsCartOpen } = useStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [currentPromo, setCurrentPromo] = useState(0)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo(prev => (prev + 1) % promoMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const languages = Object.entries(languageNames) as [Language, string][]
  const currencies: Currency[] = ['EUR', 'USD', 'GBP', 'CNY']

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Promo Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPromo}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-sm font-medium tracking-wide font-sans"
          >
            <span className="mr-2">{promoMessages[currentPromo].icon}</span>
            {t(promoMessages[currentPromo].key)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Header */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-background'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <h1 className="text-xl lg:text-2xl font-serif font-semibold tracking-tight text-foreground">
                <span className="text-primary">Pure</span>
                <span className="text-gold">Glow</span>
                <span>Beauty</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {categories.map(category => (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu(category.id)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={`/category/${category.id}`}
                    className="px-4 py-2 text-sm font-sans font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {category.name}
                    <ChevronDown size={14} className={`transition-transform ${activeMegaMenu === category.id ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {activeMegaMenu === category.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-80 bg-card shadow-xl rounded-lg border border-border p-6"
                      >
                        <h3 className="font-serif text-lg font-semibold mb-2">{category.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                        <div className="space-y-2">
                          <Link
                            href={`/category/${category.id}`}
                            className="block text-sm font-sans hover:text-primary transition-colors"
                          >
                            View All {category.name} →
                          </Link>
                          <Link
                            href={`/category/${category.id}?filter=bestseller`}
                            className="block text-sm font-sans hover:text-primary transition-colors"
                          >
                            {t('bestsellers')}
                          </Link>
                          <Link
                            href={`/category/${category.id}?filter=new`}
                            className="block text-sm font-sans hover:text-primary transition-colors"
                          >
                            {t('newArrivals')}
                          </Link>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border">
                          <span className="text-xs text-muted-foreground">{category.productCount} products</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-sans font-medium text-foreground hover:text-primary transition-colors"
              >
                {t('aboutUs')}
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative hidden lg:block"
                  >
                    <Input
                      type="search"
                      placeholder={t('searchProducts')}
                      className="pl-10 pr-4 h-10 bg-secondary border-0"
                      autoFocus
                      onBlur={() => setIsSearchOpen(false)}
                    />
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="hidden lg:flex p-2 hover:bg-secondary rounded-full transition-colors"
                    aria-label="Search"
                  >
                    <Search size={20} />
                  </button>
                )}
              </AnimatePresence>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden lg:flex">
                    <Globe size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 max-h-64 overflow-y-auto">
                  {languages.map(([code, name]) => (
                    <DropdownMenuItem
                      key={code}
                      onClick={() => setLanguage(code)}
                      className={language === code ? 'bg-secondary' : ''}
                    >
                      {name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Currency Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden lg:flex text-sm font-sans">
                    {currencySymbols[currency]} {currency}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {currencies.map(curr => (
                    <DropdownMenuItem
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={currency === curr ? 'bg-secondary' : ''}
                    >
                      {currencySymbols[curr]} {curr}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist */}
              <button
                className="hidden lg:flex p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </button>

              {/* Account */}
              <AuthButton />

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-sans font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Search */}
              <div className="relative mb-6">
                <Input
                  type="search"
                  placeholder={t('searchProducts')}
                  className="pl-10 pr-4 h-12 bg-secondary border-0"
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2 mb-6">
                {categories.map(category => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block px-4 py-3 text-foreground font-sans font-medium hover:bg-secondary rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  href="/about"
                  className="block px-4 py-3 text-foreground font-sans font-medium hover:bg-secondary rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('aboutUs')}
                </Link>
                <Link
                  href="/shipping"
                  className="block px-4 py-3 text-foreground font-sans font-medium hover:bg-secondary rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('shipping')}
                </Link>
              </nav>

              {/* Mobile Language & Currency */}
              <div className="flex gap-4 pt-4 border-t border-border">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Globe size={16} className="mr-2" />
                      {languageNames[language]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 max-h-64 overflow-y-auto">
                    {languages.map(([code, name]) => (
                      <DropdownMenuItem
                        key={code}
                        onClick={() => setLanguage(code)}
                      >
                        {name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      {currencySymbols[currency]} {currency}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {currencies.map(curr => (
                      <DropdownMenuItem
                        key={curr}
                        onClick={() => setCurrency(curr)}
                      >
                        {currencySymbols[curr]} {curr}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
