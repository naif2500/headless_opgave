'use client'

import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  function addToCart(book) {
    setCart(prev => {
      const existing = prev.find(i => i.book.id === book.id)
      if (existing) return prev.map(i => i.book.id === book.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { book, qty: 1 }]
    })
  }

  function updateQty(id, qty) {
    if (qty <= 0) setCart(prev => prev.filter(i => i.book.id !== id))
    else setCart(prev => prev.map(i => i.book.id === id ? { ...i, qty } : i))
  }

  function removeItem(id) {
    setCart(prev => prev.filter(i => i.book.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.book.price * item.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}