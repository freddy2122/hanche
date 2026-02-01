import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => {
    let id = localStorage.getItem('session_id')
    if (!id) {
      id = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('session_id', id)
    }
    return id
  })

  const fetchWishlist = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/wishlist', {
        headers: {
          'X-Session-ID': sessionId
        }
      })
      const data = await response.json()
      setWishlist(data)
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleWishlist = async (productId) => {
    try {
      const response = await fetch('http://localhost:8000/api/wishlist/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId
        },
        body: JSON.stringify({ product_id: productId })
      })
      await fetchWishlist()
      return await response.json()
    } catch (error) {
      console.error('Error toggling wishlist:', error)
    }
  }

  const removeFromWishlist = async (wishlistId) => {
    try {
      await fetch(`http://localhost:8000/api/wishlist/${wishlistId}`, {
        method: 'DELETE',
        headers: {
          'X-Session-ID': sessionId
        }
      })
      await fetchWishlist()
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product_id === productId)
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  return (
    <WishlistContext.Provider value={{
      wishlist,
      loading,
      toggleWishlist,
      removeFromWishlist,
      fetchWishlist,
      isInWishlist,
      sessionId
    }}>
      {children}
    </WishlistContext.Provider>
  )
}
