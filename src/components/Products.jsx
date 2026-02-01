import { FiShoppingCart, FiHeart, FiStar, FiEye } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function Products() {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  // Données statiques des produits
  const products = [
    {
      id: 1,
      name: 'Chaîne de Hanche Dorée',
      description: 'Chaîne de hanche élégante en laiton doré, parfaite pour sublimer votre style.',
      price: 45000,
      original_price: 55000,
      image: 'https://www.ninanina.fr/wp-content/uploads/2021/08/n7174p-collier-taille-femme-laiton-dore-chaine-pour-hanche-doree-bijoux-de-corps-en-ligne-ninanina.jpg',
      rating: 4.5,
      reviews_count: 128,
      featured: true,
      active: true
    },
    {
      id: 2,
      name: 'Chaîne de Hanche Or',
      description: 'Bijou de taille et chaîne de hanche en or, ornement de ventre élégant.',
      price: 65000,
      original_price: 75000,
      image: 'https://artistika.fr/cdn/shop/files/bijou-de-taille-et-chaine-de-hanche-femme-ornement-de-ventre-or-47863087530270.webp?v=1736576996',
      rating: 4.8,
      reviews_count: 95,
      featured: true,
      active: true
    },
    {
      id: 3,
      name: 'Chaîne de Hanche Élégante',
      description: 'Chaîne de hanche moderne et raffinée pour un look sophistiqué.',
      price: 38000,
      original_price: null,
      image: 'https://media.s-bol.com/m6V1p7V2Rj4n/RNV2oY/1200x1200.jpg',
      rating: 4.3,
      reviews_count: 67,
      featured: false,
      active: true
    },
    {
      id: 4,
      name: 'Chaîne de Hanche Classique',
      description: 'Modèle classique intemporel, idéal pour toutes les occasions.',
      price: 35000,
      original_price: 42000,
      image: 'https://www.ninanina.fr/wp-content/uploads/2021/08/n7174p-collier-taille-femme-laiton-dore-chaine-pour-hanche-doree-bijoux-de-corps-en-ligne-ninanina.jpg',
      rating: 4.2,
      reviews_count: 54,
      featured: false,
      active: true
    },
    {
      id: 5,
      name: 'Chaîne de Hanche Premium',
      description: 'Édition premium avec finition haut de gamme et design exclusif.',
      price: 85000,
      original_price: null,
      image: 'https://artistika.fr/cdn/shop/files/bijou-de-taille-et-chaine-de-hanche-femme-ornement-de-ventre-or-47863087530270.webp?v=1736576996',
      rating: 5.0,
      reviews_count: 32,
      featured: true,
      active: true
    },
    {
      id: 6,
      name: 'Chaîne de Hanche Moderne',
      description: 'Design contemporain pour un style unique et tendance.',
      price: 42000,
      original_price: 50000,
      image: 'https://media.s-bol.com/m6V1p7V2Rj4n/RNV2oY/1200x1200.jpg',
      rating: 4.6,
      reviews_count: 89,
      featured: false,
      active: true
    },
    {
      id: 7,
      name: 'Chaîne de Hanche Deluxe',
      description: 'Modèle deluxe avec détails raffinés et matériaux de qualité supérieure.',
      price: 72000,
      original_price: 85000,
      image: 'https://www.ninanina.fr/wp-content/uploads/2021/08/n7174p-collier-taille-femme-laiton-dore-chaine-pour-hanche-doree-bijoux-de-corps-en-ligne-ninanina.jpg',
      rating: 4.7,
      reviews_count: 43,
      featured: true,
      active: true
    },
    {
      id: 8,
      name: 'Chaîne de Hanche Sport',
      description: 'Modèle sportif, confortable et résistant pour un usage quotidien.',
      price: 32000,
      original_price: null,
      image: 'https://artistika.fr/cdn/shop/files/bijou-de-taille-et-chaine-de-hanche-femme-ornement-de-ventre-or-47863087530270.webp?v=1736576996',
      rating: 4.1,
      reviews_count: 76,
      featured: false,
      active: true
    }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  const handleAddToCart = (productId) => {
    addToCart(productId, 1)
  }

  const handleToggleWishlist = (productId) => {
    toggleWishlist(productId)
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
