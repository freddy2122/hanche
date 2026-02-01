import { useState, useEffect } from 'react'
import { FiShoppingCart, FiHeart, FiStar, FiEye } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('http://localhost:8000/api/products')
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des produits')
        }
        const data = await response.json()
        
        // S'assurer que les données sont un tableau
        if (Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error('Les données ne sont pas un tableau:', data)
          setProducts([])
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setError(error.message)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const handleToggleWishlist = async (productId) => {
    try {
      await toggleWishlist(productId)
    } catch (error) {
      console.error('Error toggling wishlist:', error)
    }
  }

  if (loading) {
    return (
      <section id="produits" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des produits depuis la base de données...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="produits" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <p className="text-red-500 mb-4">Erreur: {error}</p>
            <p className="text-gray-600">Vérifiez que le serveur backend est démarré sur http://localhost:8000</p>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section id="produits" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Nos Produits
            </h2>
            <p className="text-xl text-gray-600 mb-8">Aucun produit disponible pour le moment.</p>
            <p className="text-gray-500">Exécutez: <code className="bg-gray-100 px-2 py-1 rounded">php artisan db:seed</code></p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="produits" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Nos Produits
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre collection complète de chaînes de hanche ({products.length} produit{products.length > 1 ? 's' : ''})
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const inWishlist = isInWishlist(product.id)
            const hasDiscount = product.original_price && product.original_price > product.price
            
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image || 'https://media.s-bol.com/m6V1p7V2Rj4n/RNV2oY/1200x1200.jpg'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://media.s-bol.com/m6V1p7V2Rj4n/RNV2oY/1200x1200.jpg'
                    }}
                  />
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.featured && (
                      <span className="bg-gold text-black px-3 py-1 rounded-full text-xs font-bold">
                        Best Seller
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{Math.round((1 - product.price / product.original_price) * 100)}%
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleToggleWishlist(product.id)}
                      className={`w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg ${
                        inWishlist ? 'bg-red-500 text-white' : ''
                      }`}
                    >
                      <FiHeart className={`text-xl ${inWishlist ? 'fill-white' : ''}`} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-colors shadow-lg">
                      <FiEye className="text-xl" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full bg-gold text-black font-bold py-3 rounded-lg hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
                    >
                      <FiShoppingCart className="text-xl" />
                      Ajouter au Panier
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg text-black mb-2">{product.name}</h3>
                  
                  {product.rating && product.rating > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(product.rating || 0)
                                ? 'text-gold fill-gold'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.reviews_count || 0})
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-black text-black">{formatPrice(product.price)} FCFA</span>
                    {hasDiscount && (
                      <span className="text-lg text-gray-400 line-through">
                        {formatPrice(product.original_price)} FCFA
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart className="text-xl" />
                    Acheter
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Products
