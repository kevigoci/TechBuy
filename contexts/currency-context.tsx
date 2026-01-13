"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Currency = 'ALL' | 'EUR'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (priceAll: number, priceEur: number) => string
  getPrice: (priceAll: number, priceEur: number) => number
  currencySymbol: string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// Exchange rate (approximate, can be updated)
const EUR_TO_ALL_RATE = 100.5

// Consistent number formatting to avoid hydration issues
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('ALL')

  useEffect(() => {
    // Get currency from localStorage
    const savedCurrency = localStorage.getItem('currency') as Currency | null
    if (savedCurrency && (savedCurrency === 'ALL' || savedCurrency === 'EUR')) {
      setCurrencyState(savedCurrency)
    }
  }, [])

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  const getPrice = (priceAll: number, priceEur: number): number => {
    return currency === 'ALL' ? priceAll : priceEur
  }

  const formatPrice = (priceAll: number, priceEur: number): string => {
    const price = getPrice(priceAll, priceEur)

    if (currency === 'ALL') {
      return formatNumber(Math.round(price)) + ' L'
    } else {
      return '€' + formatNumber(price)
    }
  }

  const currencySymbol = currency === 'ALL' ? 'L' : '€'

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        getPrice,
        currencySymbol
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
