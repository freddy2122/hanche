import { FiHome, FiGrid, FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useLocation, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function MobileNav() {
  const location = useLocation()
  const { cart } = useCart()
  const { wishlist } = useWishlist()

  const navItems = [
    { id: 'home', icon: FiHome, label: 'Accueil', path: '/' },
    { id: 'products', icon: FiGrid, label: 'Produits', path: '/#produits' },
    { id: 'wishlist', icon: FiHeart, label: 'Favoris', path: '/wishlist', badge: wishlist.length },
    { id: 'cart', icon: FiShoppingCart, label: 'Panier', path: '/cart', badge: cart.count }
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path.replace('/#', ''))
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          const hasBadge = item.badge > 0
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative ${
                active ? 'text-gold' : 'text-gray-600'
              }`}
            >
              <div className={`relative ${active ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
                <Icon className={`text-2xl ${active ? 'text-gold' : 'text-gray-600'}`} />
                {hasBadge && (
                  <span className={`absolute -top-1 -right-1 w-5 h-5 ${active ? 'bg-gold text-black' : 'bg-red-500 text-white'} text-xs font-bold rounded-full flex items-center justify-center z-10`}>
                    {item.badge}
                  </span>
                )}
                {active && !hasBadge && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full"></div>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${active ? 'text-gold' : 'text-gray-600'}`}>
                {item.label}
              </span>
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gold rounded-full"></div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileNav
