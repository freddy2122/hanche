import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { FiHeart, FiShoppingCart, FiTrash2, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function Wishlist() {
  const { wishlist, loading, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  const handleAddToCart = async (product) => {
    await addToCart(product.id, 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des favoris...</p>
        </div>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <FiHeart className="text-6xl text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-black mb-4">Votre liste de favoris est vide</h2>
          <p className="text-gray-600 mb-8">Ajoutez des produits à vos favoris pour les retrouver facilement.</p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold-dark transition-colors"
          >
            Découvrir les produits
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <h1 className="text-4xl font-black text-black mb-8">Mes Favoris</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={item.product?.image || 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&q=80'}
                  alt={item.product?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                >
                  <FiHeart className="text-xl fill-red-500 text-red-500 group-hover:fill-white group-hover:text-white" />
                </button>
                {item.product?.featured && (
                  <span className="absolute top-4 left-4 bg-gold text-black px-3 py-1 rounded-full text-xs font-bold">
                    Best Seller
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-black mb-2">{item.product?.name}</h3>
                
                {item.product?.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-sm ${
                          i < (item.product.rating || 0)
                            ? 'text-gold fill-gold'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-black text-black">
                      {formatPrice(item.product?.price || 0)} FCFA
                    </span>
                    {item.product?.original_price && (
                      <span className="text-lg text-gray-400 line-through ml-2">
                        {formatPrice(item.product.original_price)} FCFA
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => handleAddToCart(item.product)}
                  className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <FiShoppingCart className="text-xl" />
                  Ajouter au Panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
