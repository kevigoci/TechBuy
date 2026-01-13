export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          default_address_id: string | null
          preferred_language: 'en' | 'sq'
          preferred_currency: 'ALL' | 'EUR'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          default_address_id?: string | null
          preferred_language?: 'en' | 'sq'
          preferred_currency?: 'ALL' | 'EUR'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          default_address_id?: string | null
          preferred_language?: 'en' | 'sq'
          preferred_currency?: 'ALL' | 'EUR'
          created_at?: string
          updated_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          label: string
          full_name: string
          phone: string
          street_address: string
          city: string
          postal_code: string | null
          country: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          label?: string
          full_name: string
          phone: string
          street_address: string
          city: string
          postal_code?: string | null
          country?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          label?: string
          full_name?: string
          phone?: string
          street_address?: string
          city?: string
          postal_code?: string | null
          country?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          slug: string
          parent_id: string | null
          name_en: string
          name_sq: string
          description_en: string | null
          description_sq: string | null
          image_url: string | null
          icon: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          parent_id?: string | null
          name_en: string
          name_sq: string
          description_en?: string | null
          description_sq?: string | null
          image_url?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          parent_id?: string | null
          name_en?: string
          name_sq?: string
          description_en?: string | null
          description_sq?: string | null
          image_url?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          slug: string
          name: string
          logo_url: string | null
          is_featured: boolean
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          logo_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          logo_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          sku: string
          slug: string
          category_id: string
          brand_id: string | null
          name_en: string
          name_sq: string
          description_en: string | null
          description_sq: string | null
          short_description_en: string | null
          short_description_sq: string | null
          price_all: number
          price_eur: number
          original_price_all: number | null
          original_price_eur: number | null
          stock_quantity: number
          is_in_stock: boolean
          is_active: boolean
          is_featured: boolean
          is_on_sale: boolean
          rating_average: number
          rating_count: number
          specifications: Json
          meta_title_en: string | null
          meta_title_sq: string | null
          meta_description_en: string | null
          meta_description_sq: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          slug: string
          category_id: string
          brand_id?: string | null
          name_en: string
          name_sq: string
          description_en?: string | null
          description_sq?: string | null
          short_description_en?: string | null
          short_description_sq?: string | null
          price_all: number
          price_eur: number
          original_price_all?: number | null
          original_price_eur?: number | null
          stock_quantity?: number
          is_active?: boolean
          is_featured?: boolean
          is_on_sale?: boolean
          specifications?: Json
          meta_title_en?: string | null
          meta_title_sq?: string | null
          meta_description_en?: string | null
          meta_description_sq?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          slug?: string
          category_id?: string
          brand_id?: string | null
          name_en?: string
          name_sq?: string
          description_en?: string | null
          description_sq?: string | null
          short_description_en?: string | null
          short_description_sq?: string | null
          price_all?: number
          price_eur?: number
          original_price_all?: number | null
          original_price_eur?: number | null
          stock_quantity?: number
          is_active?: boolean
          is_featured?: boolean
          is_on_sale?: boolean
          specifications?: Json
          meta_title_en?: string | null
          meta_title_sq?: string | null
          meta_description_en?: string | null
          meta_description_sq?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          alt_text_en: string | null
          alt_text_sq: string | null
          display_order: number
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          alt_text_en?: string | null
          alt_text_sq?: string | null
          display_order?: number
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          alt_text_en?: string | null
          alt_text_sq?: string | null
          display_order?: number
          is_primary?: boolean
          created_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          sku: string
          name_en: string
          name_sq: string
          price_all: number
          price_eur: number
          original_price_all: number | null
          original_price_eur: number | null
          stock_quantity: number
          attributes: Json
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          sku: string
          name_en: string
          name_sq: string
          price_all: number
          price_eur: number
          original_price_all?: number | null
          original_price_eur?: number | null
          stock_quantity?: number
          attributes?: Json
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          sku?: string
          name_en?: string
          name_sq?: string
          price_all?: number
          price_eur?: number
          original_price_all?: number | null
          original_price_eur?: number | null
          stock_quantity?: number
          attributes?: Json
          is_active?: boolean
          created_at?: string
        }
      }
      carts: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          currency: 'ALL' | 'EUR'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          currency?: 'ALL' | 'EUR'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          currency?: 'ALL' | 'EUR'
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string
          variant_id: string | null
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cart_id: string
          product_id: string
          variant_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cart_id?: string
          product_id?: string
          variant_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_method: 'card' | 'bank_transfer' | 'cash_on_delivery'
          currency: 'ALL' | 'EUR'
          subtotal: number
          shipping_cost: number
          discount_amount: number
          total: number
          shipping_address: Json
          billing_address: Json | null
          notes: string | null
          tracking_number: string | null
          shipped_at: string | null
          delivered_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number?: string
          user_id: string
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_method: 'card' | 'bank_transfer' | 'cash_on_delivery'
          currency: 'ALL' | 'EUR'
          subtotal: number
          shipping_cost?: number
          discount_amount?: number
          total: number
          shipping_address: Json
          billing_address?: Json | null
          notes?: string | null
          tracking_number?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_method?: 'card' | 'bank_transfer' | 'cash_on_delivery'
          currency?: 'ALL' | 'EUR'
          subtotal?: number
          shipping_cost?: number
          discount_amount?: number
          total?: number
          shipping_address?: Json
          billing_address?: Json | null
          notes?: string | null
          tracking_number?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          variant_id: string | null
          product_name: string
          variant_name: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          variant_id?: string | null
          product_name: string
          variant_name?: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          variant_id?: string | null
          product_name?: string
          variant_name?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          product_id: string
          order_id: string | null
          rating: number
          title: string | null
          content: string | null
          is_verified_purchase: boolean
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          order_id?: string | null
          rating: number
          title?: string | null
          content?: string | null
          is_verified_purchase?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          order_id?: string | null
          rating?: number
          title?: string | null
          content?: string | null
          is_verified_purchase?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      banners: {
        Row: {
          id: string
          title_en: string
          title_sq: string
          subtitle_en: string | null
          subtitle_sq: string | null
          image_url: string
          image_url_mobile: string | null
          link_url: string | null
          button_text_en: string | null
          button_text_sq: string | null
          display_order: number
          is_active: boolean
          starts_at: string | null
          ends_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title_en: string
          title_sq: string
          subtitle_en?: string | null
          subtitle_sq?: string | null
          image_url: string
          image_url_mobile?: string | null
          link_url?: string | null
          button_text_en?: string | null
          button_text_sq?: string | null
          display_order?: number
          is_active?: boolean
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title_en?: string
          title_sq?: string
          subtitle_en?: string | null
          subtitle_sq?: string | null
          image_url?: string
          image_url_mobile?: string | null
          link_url?: string | null
          button_text_en?: string | null
          button_text_sq?: string | null
          display_order?: number
          is_active?: boolean
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
        }
      }
      promotions: {
        Row: {
          id: string
          code: string
          name_en: string
          name_sq: string
          description_en: string | null
          description_sq: string | null
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          min_order_amount: number | null
          max_discount_amount: number | null
          usage_limit: number | null
          used_count: number
          is_active: boolean
          starts_at: string
          ends_at: string
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name_en: string
          name_sq: string
          description_en?: string | null
          description_sq?: string | null
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          min_order_amount?: number | null
          max_discount_amount?: number | null
          usage_limit?: number | null
          used_count?: number
          is_active?: boolean
          starts_at: string
          ends_at: string
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name_en?: string
          name_sq?: string
          description_en?: string | null
          description_sq?: string | null
          discount_type?: 'percentage' | 'fixed'
          discount_value?: number
          min_order_amount?: number | null
          max_discount_amount?: number | null
          usage_limit?: number | null
          used_count?: number
          is_active?: boolean
          starts_at?: string
          ends_at?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Commonly used types
export type Profile = Tables<'profiles'>
export type Address = Tables<'addresses'>
export type Category = Tables<'categories'>
export type Brand = Tables<'brands'>
export type Product = Tables<'products'>
export type ProductImage = Tables<'product_images'>
export type ProductVariant = Tables<'product_variants'>
export type Cart = Tables<'carts'>
export type CartItem = Tables<'cart_items'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
export type Wishlist = Tables<'wishlists'>
export type Review = Tables<'reviews'>
export type Banner = Tables<'banners'>
export type Promotion = Tables<'promotions'>

// Extended types with relations
export type ProductWithImages = Product & {
  product_images: ProductImage[]
  brand: Brand | null
  category: Category
}

export type ProductWithDetails = ProductWithImages & {
  product_variants: ProductVariant[]
  reviews: Review[]
}

export type CartItemWithProduct = CartItem & {
  product: Product & { product_images: ProductImage[] }
  variant: ProductVariant | null
}

export type OrderWithItems = Order & {
  order_items: OrderItem[]
}
