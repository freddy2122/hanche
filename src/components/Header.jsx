import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiSearch, FiHeart, FiPackage } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { cart } = useCart()
  const { wishlist } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:bg-gold transition-colors">
              <FiPackage className="text-white text-xl" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xl font-black text-black leading-tight">CHAÎNE</span>
              <span className="text-xl font-black text-gold leading-tight">HANCHE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#accueil" className="text-gray-700 hover:text-gold font-medium transition-colors">
              Accueil
            </a>
            <a href="#produits" className="text-gray-700 hover:text-gold font-medium transition-colors">
              Produits
            </a>
            <a href="#caracteristiques" className="text-gray-700 hover:text-gold font-medium transition-colors">
              Caractéristiques
            </a>
            <a href="#temoignages" className="text-gray-700 hover:text-gold font-medium transition-colors">
              Avis
            </a>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Search - Desktop only */}
            <button className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
              <FiSearch className="text-gray-700 text-xl" />
            </button>

            {/* Wishlist - Desktop only */}
            <Link
              to="/wishlist"
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <FiHeart className="text-gray-700 text-xl" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <FiShoppingCart className="text-gray-700 text-xl" />
              {cart.count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  {cart.count}
                </span>
              )}
            </Link>

            {/* User Account - Desktop only */}
            <Link
              to="/login"
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
              title="Administration"
            >
              <FiUser className="text-gray-700 text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
