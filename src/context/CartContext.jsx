import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 })
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => {
    let id = localStorage.getItem('session_id')
    if (!id) {
      id = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('session_id', id)
    }
    return id
  })

  const fetchCart = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/cart', {
        headers: {
          'X-Session-ID': sessionId
        }
      })
      const data = await response.json()
      setCart(data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await fetch('http://localhost:8000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId
        },
        body: JSON.stringify({ product_id: productId, quantity })
      })
      await fetchCart()
      return await response.json()
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const updateCartItem = async (cartId, quantity) => {
    try {
      await fetch(`http://localhost:8000/api/cart/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId
        },
        body: JSON.stringify({ quantity })
      })
      await fetchCart()
    } catch (error) {
      console.error('Error updating cart:', error)
    }
  }

  const removeFromCart = async (cartId) => {
    try {
      await fetch(`http://localhost:8000/api/cart/${cartId}`, {
        method: 'DELETE',
        headers: {
          'X-Session-ID': sessionId
        }
      })
      await fetchCart()
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  const clearCart = async () => {
    try {
      await fetch('http://localhost:8000/api/cart', {
        method: 'DELETE',
        headers: {
          'X-Session-ID': sessionId
        }
      })
      await fetchCart()
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      fetchCart,
      sessionId
    }}>
      {children}
    </CartContext.Provider>
  )
}
