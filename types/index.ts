// Re-export all database types
export * from './database'

// Legacy CartItem type for backward compatibility
export interface LegacyCartItem {
  id: number | string
  title: string
  subtitle?: string
  price: number
  originalPrice?: number
  platform?: string
  level?: number
  cash?: string
  image: string
  seller?: string
  rating?: number
  reviews?: number
  quantity: number
  variant?: {
    id: string
    name: string
    price: number
  }
}
