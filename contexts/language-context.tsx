"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Locale = 'en' | 'sq'

interface Translations {
  [key: string]: string | Translations
}

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// English translations
const enTranslations: Translations = {
  common: {
    home: "Home",
    products: "Products",
    categories: "Categories",
    deals: "Deals",
    cart: "Cart",
    account: "My Account",
    search: "Search products...",
    searchPlaceholder: "Search for products, brands, categories...",
    viewAll: "View All",
    learnMore: "Learn More",
    shopNow: "Shop Now",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    addToWishlist: "Add to Wishlist",
    removeFromWishlist: "Remove from Wishlist",
    viewDetails: "View Details",
    continueShopping: "Continue Shopping",
    proceedToCheckout: "Proceed to Checkout",
    outOfStock: "Out of Stock",
    inStock: "In Stock",
    quantity: "Quantity",
    total: "Total",
    subtotal: "Subtotal",
    shipping: "Shipping",
    discount: "Discount",
    free: "Free",
    apply: "Apply",
    remove: "Remove",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    noResults: "No results found",
    showMore: "Show More",
    showLess: "Show Less",
  },
  nav: {
    computers: "Computers & Laptops",
    phones: "Phones & Tablets",
    tv: "TV & Audio",
    gaming: "Gaming",
    smartHome: "Smart Home",
    accessories: "Accessories",
    allCategories: "All Categories",
  },
  auth: {
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    forgotPassword: "Forgot Password?",
    resetPassword: "Reset Password",
    newPassword: "New Password",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    createAccount: "Create Account",
    welcomeBack: "Welcome Back",
    signInToContinue: "Sign in to continue to your account",
    createYourAccount: "Create Your Account",
    joinUs: "Join us and start shopping",
    resetPasswordDesc: "Enter your email to receive a reset link",
    checkYourEmail: "Check your email for the reset link",
    passwordResetSuccess: "Password has been reset successfully",
    invalidCredentials: "Invalid email or password",
    emailRequired: "Email is required",
    passwordRequired: "Password is required",
    passwordMinLength: "Password must be at least 8 characters",
    passwordsDoNotMatch: "Passwords do not match",
    nameRequired: "Full name is required",
  },
  cart: {
    yourCart: "Your Cart",
    cartEmpty: "Your cart is empty",
    cartEmptyDesc: "Looks like you haven't added anything to your cart yet",
    startShopping: "Start Shopping",
    itemAdded: "Item added to cart",
    itemRemoved: "Item removed from cart",
    cartUpdated: "Cart updated",
    items: "items",
    item: "item",
    orderSummary: "Order Summary",
    promoCode: "Promo Code",
    enterPromoCode: "Enter promo code",
    applyCode: "Apply Code",
    invalidCode: "Invalid promo code",
    codeApplied: "Promo code applied",
  },
  checkout: {
    checkout: "Checkout",
    shippingAddress: "Shipping Address",
    billingAddress: "Billing Address",
    sameAsShipping: "Same as shipping address",
    paymentMethod: "Payment Method",
    creditCard: "Credit Card",
    bankTransfer: "Bank Transfer",
    cashOnDelivery: "Cash on Delivery",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    placeOrder: "Place Order",
    orderPlaced: "Order Placed Successfully",
    orderNumber: "Order Number",
    thankYou: "Thank you for your order!",
    orderConfirmation: "You will receive an order confirmation email shortly.",
    continueShopping: "Continue Shopping",
    viewOrder: "View Order",
    processing: "Processing your order...",
  },
  account: {
    myAccount: "My Account",
    dashboard: "Dashboard",
    profile: "Profile",
    addresses: "Addresses",
    orders: "Orders",
    wishlist: "Wishlist",
    settings: "Settings",
    editProfile: "Edit Profile",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    addAddress: "Add Address",
    editAddress: "Edit Address",
    deleteAddress: "Delete Address",
    setAsDefault: "Set as Default",
    defaultAddress: "Default Address",
    noAddresses: "No addresses saved",
    noOrders: "No orders yet",
    noWishlistItems: "Your wishlist is empty",
    orderHistory: "Order History",
    orderDetails: "Order Details",
    orderStatus: "Order Status",
    orderDate: "Order Date",
    trackOrder: "Track Order",
    reorder: "Reorder",
  },
  product: {
    description: "Description",
    specifications: "Specifications",
    reviews: "Reviews",
    relatedProducts: "Related Products",
    writeReview: "Write a Review",
    rating: "Rating",
    yourReview: "Your Review",
    submitReview: "Submit Review",
    reviewSubmitted: "Review submitted successfully",
    noReviews: "No reviews yet",
    beFirstToReview: "Be the first to review this product",
    verifiedPurchase: "Verified Purchase",
    sortBy: "Sort by",
    priceRange: "Price Range",
    brand: "Brand",
    availability: "Availability",
    clearFilters: "Clear Filters",
    filters: "Filters",
    resultsFound: "results found",
    showing: "Showing",
    of: "of",
  },
  footer: {
    aboutUs: "About Us",
    contactUs: "Contact Us",
    customerService: "Customer Service",
    shippingInfo: "Shipping Information",
    returns: "Returns & Refunds",
    faq: "FAQ",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    newsletter: "Newsletter",
    newsletterDesc: "Subscribe to receive updates and exclusive offers",
    subscribe: "Subscribe",
    emailPlaceholder: "Enter your email",
    followUs: "Follow Us",
    allRightsReserved: "All rights reserved",
    madeWith: "Made with",
    inAlbania: "in Albania",
  },
  currency: {
    lek: "Lek",
    euro: "Euro",
  },
  language: {
    english: "English",
    albanian: "Shqip",
  },
}

// Albanian translations
const sqTranslations: Translations = {
  common: {
    home: "Kryefaqja",
    products: "Produktet",
    categories: "Kategoritë",
    deals: "Ofertat",
    cart: "Shporta",
    account: "Llogaria Ime",
    search: "Kërko produkte...",
    searchPlaceholder: "Kërko produkte, marka, kategori...",
    viewAll: "Shiko të Gjitha",
    learnMore: "Mëso Më Shumë",
    shopNow: "Bli Tani",
    addToCart: "Shto në Shportë",
    buyNow: "Bli Tani",
    addToWishlist: "Shto në Dëshira",
    removeFromWishlist: "Hiq nga Dëshirat",
    viewDetails: "Shiko Detajet",
    continueShopping: "Vazhdo Blerjen",
    proceedToCheckout: "Vazhdo me Pagesën",
    outOfStock: "Jashtë Stokut",
    inStock: "Në Stok",
    quantity: "Sasia",
    total: "Totali",
    subtotal: "Nëntotali",
    shipping: "Transporti",
    discount: "Zbritja",
    free: "Falas",
    apply: "Apliko",
    remove: "Hiq",
    save: "Ruaj",
    cancel: "Anulo",
    confirm: "Konfirmo",
    delete: "Fshi",
    edit: "Ndrysho",
    close: "Mbyll",
    loading: "Duke ngarkuar...",
    error: "Ndodhi një gabim",
    success: "Sukses",
    noResults: "Nuk u gjetën rezultate",
    showMore: "Shfaq Më Shumë",
    showLess: "Shfaq Më Pak",
  },
  nav: {
    computers: "Kompjuterë & Laptopë",
    phones: "Telefona & Tableta",
    tv: "TV & Audio",
    gaming: "Gaming",
    smartHome: "Shtëpi Inteligjente",
    accessories: "Aksesorë",
    allCategories: "Të Gjitha Kategoritë",
  },
  auth: {
    signIn: "Hyr",
    signUp: "Regjistrohu",
    signOut: "Dil",
    email: "Email",
    password: "Fjalëkalimi",
    confirmPassword: "Konfirmo Fjalëkalimin",
    fullName: "Emri i Plotë",
    forgotPassword: "Harrove Fjalëkalimin?",
    resetPassword: "Rivendos Fjalëkalimin",
    newPassword: "Fjalëkalimi i Ri",
    dontHaveAccount: "Nuk ke llogari?",
    alreadyHaveAccount: "Ke tashmë një llogari?",
    createAccount: "Krijo Llogari",
    welcomeBack: "Mirësevjen Përsëri",
    signInToContinue: "Hyni për të vazhduar në llogarinë tuaj",
    createYourAccount: "Krijo Llogarinë Tënde",
    joinUs: "Bashkohu me ne dhe fillo blerjen",
    resetPasswordDesc: "Shkruaj email-in për të marrë linkun e rivendosjes",
    checkYourEmail: "Kontrollo email-in për linkun e rivendosjes",
    passwordResetSuccess: "Fjalëkalimi u rivendos me sukses",
    invalidCredentials: "Email ose fjalëkalim i gabuar",
    emailRequired: "Email-i është i detyrueshëm",
    passwordRequired: "Fjalëkalimi është i detyrueshëm",
    passwordMinLength: "Fjalëkalimi duhet të ketë të paktën 8 karaktere",
    passwordsDoNotMatch: "Fjalëkalimet nuk përputhen",
    nameRequired: "Emri i plotë është i detyrueshëm",
  },
  cart: {
    yourCart: "Shporta Juaj",
    cartEmpty: "Shporta juaj është bosh",
    cartEmptyDesc: "Duket se nuk keni shtuar asgjë në shportë akoma",
    startShopping: "Fillo Blerjen",
    itemAdded: "Produkti u shtua në shportë",
    itemRemoved: "Produkti u hoq nga shporta",
    cartUpdated: "Shporta u përditësua",
    items: "artikuj",
    item: "artikull",
    orderSummary: "Përmbledhja e Porosisë",
    promoCode: "Kodi Promocional",
    enterPromoCode: "Shkruaj kodin promocional",
    applyCode: "Apliko Kodin",
    invalidCode: "Kod promocional i pavlefshëm",
    codeApplied: "Kodi promocional u aplikua",
  },
  checkout: {
    checkout: "Pagesa",
    shippingAddress: "Adresa e Transportit",
    billingAddress: "Adresa e Faturimit",
    sameAsShipping: "E njëjtë me adresën e transportit",
    paymentMethod: "Mënyra e Pagesës",
    creditCard: "Kartë Krediti",
    bankTransfer: "Transfer Bankar",
    cashOnDelivery: "Pagesë në Dorëzim",
    cardNumber: "Numri i Kartës",
    expiryDate: "Data e Skadimit",
    cvv: "CVV",
    placeOrder: "Bëj Porosinë",
    orderPlaced: "Porosia u Krye me Sukses",
    orderNumber: "Numri i Porosisë",
    thankYou: "Faleminderit për porosinë tuaj!",
    orderConfirmation: "Do të merrni një email konfirmimi së shpejti.",
    continueShopping: "Vazhdo Blerjen",
    viewOrder: "Shiko Porosinë",
    processing: "Duke procesuar porosinë...",
  },
  account: {
    myAccount: "Llogaria Ime",
    dashboard: "Paneli",
    profile: "Profili",
    addresses: "Adresat",
    orders: "Porositë",
    wishlist: "Dëshirat",
    settings: "Cilësimet",
    editProfile: "Ndrysho Profilin",
    changePassword: "Ndrysho Fjalëkalimin",
    currentPassword: "Fjalëkalimi Aktual",
    addAddress: "Shto Adresë",
    editAddress: "Ndrysho Adresën",
    deleteAddress: "Fshi Adresën",
    setAsDefault: "Vendos si Kryesor",
    defaultAddress: "Adresa Kryesore",
    noAddresses: "Nuk ka adresa të ruajtura",
    noOrders: "Nuk ka porosi akoma",
    noWishlistItems: "Lista e dëshirave është bosh",
    orderHistory: "Historiku i Porosive",
    orderDetails: "Detajet e Porosisë",
    orderStatus: "Statusi i Porosisë",
    orderDate: "Data e Porosisë",
    trackOrder: "Gjurmo Porosinë",
    reorder: "Riporosit",
  },
  product: {
    description: "Përshkrimi",
    specifications: "Specifikimet",
    reviews: "Vlerësimet",
    relatedProducts: "Produkte të Ngjashme",
    writeReview: "Shkruaj Vlerësim",
    rating: "Vlerësimi",
    yourReview: "Vlerësimi Juaj",
    submitReview: "Dërgo Vlerësimin",
    reviewSubmitted: "Vlerësimi u dërgua me sukses",
    noReviews: "Nuk ka vlerësime akoma",
    beFirstToReview: "Bëhu i pari që vlerëson këtë produkt",
    verifiedPurchase: "Blerje e Verifikuar",
    sortBy: "Rendit sipas",
    priceRange: "Gama e Çmimit",
    brand: "Marka",
    availability: "Disponueshmëria",
    clearFilters: "Pastro Filtrat",
    filters: "Filtrat",
    resultsFound: "rezultate u gjetën",
    showing: "Duke shfaqur",
    of: "nga",
  },
  footer: {
    aboutUs: "Rreth Nesh",
    contactUs: "Na Kontaktoni",
    customerService: "Shërbimi Klientit",
    shippingInfo: "Informacion Transporti",
    returns: "Kthime & Rimbursime",
    faq: "Pyetje të Shpeshta",
    privacyPolicy: "Politika e Privatësisë",
    termsOfService: "Kushtet e Shërbimit",
    newsletter: "Buletini",
    newsletterDesc: "Abonohu për të marrë përditësime dhe oferta ekskluzive",
    subscribe: "Abonohu",
    emailPlaceholder: "Shkruaj email-in tuaj",
    followUs: "Na Ndiqni",
    allRightsReserved: "Të gjitha të drejtat të rezervuara",
    madeWith: "Bërë me",
    inAlbania: "në Shqipëri",
  },
  currency: {
    lek: "Lekë",
    euro: "Euro",
  },
  language: {
    english: "English",
    albanian: "Shqip",
  },
}

const translations: Record<Locale, Translations> = {
  en: enTranslations,
  sq: sqTranslations,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    // Get locale from localStorage or browser
    const savedLocale = localStorage.getItem('locale') as Locale | null
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'sq')) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let value: unknown = translations[locale]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        console.warn(`Translation missing: ${key}`)
        return key
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation is not a string: ${key}`)
      return key
    }

    // Handle interpolation
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) =>
        String(params[paramKey] ?? `{{${paramKey}}}`)
      )
    }

    return value
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function useTranslation() {
  const { t, locale } = useLanguage()
  return { t, locale }
}
