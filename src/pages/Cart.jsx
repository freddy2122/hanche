import { useCart } from '../context/CartContext'
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function Cart() {
  const { cart, loading, updateCartItem, removeFromCart, clearCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du panier...</p>
        </div>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <FiShoppingCart className="text-6xl text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-black mb-4">Votre panier est vide</h2>
          <p className="text-gray-600 mb-8">Ajoutez des produits à votre panier pour commencer vos achats.</p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold-dark transition-colors"
          >
            Continuer les achats
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <h1 className="text-4xl font-black text-black mb-8">Mon Panier</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row gap-6">
                <img
                  src={item.product?.image || 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=200&h=200&fit=crop&q=80'}
                  alt={item.product?.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">{item.product?.name}</h3>
                  <p className="text-gray-600 mb-4">{item.product?.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border-2 border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <FiMinus className="text-gray-600" />
                        </button>
                        <span className="px-4 py-2 font-bold text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItem(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <FiPlus className="text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-gold">
                        {formatPrice(item.price * item.quantity)} FCFA
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">
                          {formatPrice(item.price)} FCFA chacun
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 font-medium flex items-center gap-2"
            >
              <FiTrash2 />
              Vider le panier
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-2xl font-black text-black mb-6">Résumé de la commande</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{formatPrice(cart.total)} FCFA</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="text-green-600 font-bold">Gratuite</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-xl font-bold text-black">Total</span>
                  <span className="text-2xl font-black text-gold">{formatPrice(cart.total)} FCFA</span>
                </div>
              </div>

              <button className="w-full bg-gold text-black font-bold py-4 rounded-lg hover:bg-gold-dark transition-colors mb-4">
                Passer la commande
              </button>
              <Link
                to="/"
                className="block w-full text-center bg-gray-100 text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Continuer les achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
