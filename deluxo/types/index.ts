export interface Product {
  id: number
  title: string
  subtitle: string
  price: number
  originalPrice?: number
  platform: string
  accountType?: string
  level: number | string
  cash: number
  image: string
  seller: string
  rating: number
  reviews: number
  isOnline?: boolean
  badge?: string
  description?: string
  features?: string[]
  screenshots?: string[]
  customerReviews?: {
    id: number
    name: string
    rating: number
    comment: string
    date: string
    verified: boolean
  }[]
  variants?: {
    id: string
    name: string
    price: number
    description: string
    features: string[]
    cash?: number
  }[]
}

export interface CartItem {
  id: number | string
  title: string
  subtitle: string
  price: number
  originalPrice?: number
  platform: string
  level: number
  cash: number
  image: string
  seller: string
  rating: number
  reviews: number
  quantity: number
  variant?: {
    id: string
    name: string
    price: number
    description: string
    features: string[]
    cash?: number
  }
}
