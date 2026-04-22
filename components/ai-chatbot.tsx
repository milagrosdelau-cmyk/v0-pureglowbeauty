"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react'
import { useStore } from '@/lib/store-context'
import { incoterms, regionShippingInfo } from '@/lib/data/incoterms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Message = {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: Date
}

const quickActions = [
  { id: 'tone', key: 'findTone' as const, icon: '🔍' },
  { id: 'cruelty', key: 'skinConsult' as const, icon: '🌿' },
  { id: 'order', key: 'orderStatus' as const, icon: '📦' },
  { id: 'skin', key: 'skinRecommend' as const, icon: '💄' }
]

const botResponses: Record<string, string> = {
  tone: "I'd love to help you find your perfect shade! Let me ask you a few quick questions:\n\n1. What is your skin undertone? (Warm, Cool, or Neutral)\n2. What coverage level do you prefer? (Light, Medium, or Full)\n3. Do you have any skin concerns we should address?\n\nFeel free to share, and I'll recommend the ideal products for you!",
  cruelty: "At PureGlowBeauty, we're committed to ethical beauty. Here's what makes us different:\n\n🐰 **100% Cruelty-Free**: We never test on animals, and neither do our suppliers.\n\n🌿 **Vegan Friendly**: All our products are free from animal-derived ingredients.\n\n♻️ **Sustainable Packaging**: We use recycled and recyclable materials.\n\n🌍 **Eco-Conscious**: Our formulas are biodegradable and environmentally friendly.\n\nWould you like me to recommend some of our best-selling cruelty-free products?",
  order: "I can help you track your order! To check your order status:\n\n1. Go to your email and find your order confirmation\n2. Click the tracking link provided\n3. Or visit our Track Order page with your order number\n\nIf you need further assistance, our customer service team is available Monday-Friday, 9AM-6PM CET.\n\nIs there anything else I can help you with?",
  skin: "Let's find the perfect products for your skin! Tell me:\n\n**What's your skin type?**\n- Dry\n- Oily\n- Combination\n- Sensitive\n- Normal\n\nOnce you share this, I'll curate a personalized selection of our best products designed specifically for your skin's needs!",
  shipping: `**International Shipping Information**\n\nWe ship to over 150 countries with our DAP, DDP, CIF, and FOB options:\n\n📦 **Delivery Times:**\n- Europe: 5-7 days (Standard)\n- North America: 7-10 days (Standard)\n- Asia-Pacific: 10-14 days (Standard)\n- Latin America: 12-15 days (Standard)\n\n💳 **Incoterms Available:**\n- **DAP** (Delivered at Place): You pay duties\n- **DDP** (Delivered Duty Paid): We pay everything\n- **CIF** (Cost, Insurance & Freight): For B2B bulk orders\n- **FOB** (Free on Board): Traditional B2B term\n\nWhich region are you shipping to? I can provide specific details!`,
  default: "Thank you for your message! I'm here to help you discover the perfect products for your beauty routine. You can ask me about:\n\n• Finding your ideal shade\n• Product recommendations\n• Shipping and Incoterms\n• Our cruelty-free commitment\n• Tracking orders\n\nHow can I assist you today?"
}

export function AIChatbot() {
  const { t, isChatOpen, setIsChatOpen, language } = useStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          type: 'bot',
          content: t('welcomeChat'),
          timestamp: new Date()
        }
      ])
    }
  }, [isChatOpen, messages.length, t])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addBotResponse = (responseKey: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'bot',
          content: botResponses[responseKey] || botResponses.default,
          timestamp: new Date()
        }
      ])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId)
    if (action) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'user',
          content: t(action.key),
          timestamp: new Date()
        }
      ])
      addBotResponse(actionId)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        content: inputValue,
        timestamp: new Date()
      }
    ])
    setInputValue('')
    addBotResponse('default')
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform ${isChatOpen ? 'hidden' : ''}`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center">
          <Sparkles size={10} className="text-accent-foreground" />
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] bg-card rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-sm">Beauty Assistant</h3>
                  <p className="text-xs text-primary-foreground/70">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-secondary text-foreground rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm font-sans whitespace-pre-line">{message.content}</p>
                    <span className="text-[10px] opacity-50 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary rounded-2xl rounded-bl-sm p-3 flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-border">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickActions.map(action => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className="flex-shrink-0 px-3 py-1.5 bg-secondary hover:bg-muted rounded-full text-xs font-sans transition-colors"
                  >
                    <span className="mr-1">{action.icon}</span>
                    {t(action.key).substring(2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  className="flex-1 h-10 bg-secondary border-0"
                />
                <Button type="submit" size="icon" className="h-10 w-10">
                  <Send size={18} />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
