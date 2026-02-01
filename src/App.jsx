import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import MobileNav from './components/MobileNav'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <MobileNav />
      {children}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Routes>
              {/* Login Page - No Layout */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected Admin Dashboard - No Header/Footer */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Public Routes with Header/Footer */}
              <Route 
                path="/" 
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <PublicLayout>
                    <Cart />
                  </PublicLayout>
                } 
              />
              <Route 
                path="/wishlist" 
                element={
                  <PublicLayout>
                    <Wishlist />
                  </PublicLayout>
                } 
              />
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
