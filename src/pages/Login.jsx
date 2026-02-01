import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiLock, FiMail, FiLogIn, FiPackage } from 'react-icons/fi'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Erreur de connexion. Vérifiez vos identifiants.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=1600&fit=crop&q=80" 
          alt="Chaîne de hanche"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&h=1600&fit=crop&q=80'
          }}
        />
        {/* Overlay avec gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        {/* Logo et texte sur l'image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white z-10">
          <div className="w-20 h-20 bg-gold rounded-2xl flex items-center justify-center mb-6">
            <FiPackage className="text-black text-4xl" />
          </div>
          <h1 className="text-5xl font-black mb-4 text-center">
            CHAÎNE
            <span className="block text-gold">HANCHE</span>
          </h1>
          <p className="text-xl text-gray-200 text-center max-w-md">
            Administration de la plateforme e-commerce
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo pour mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4">
              <FiPackage className="text-gold text-3xl" />
            </div>
            <h1 className="text-3xl font-black text-black mb-2">
              CHAÎNE <span className="text-gold">HANCHE</span>
            </h1>
            <p className="text-gray-600">Administration</p>
          </div>

          {/* Desktop Title */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-4xl font-black text-black mb-2">Connexion</h2>
            <p className="text-gray-600">Connectez-vous pour accéder au dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-black text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                  placeholder="admin@chainedehanche.fr"
                />
              </div>
            </div>

            <div>
              <label className="block text-black text-sm font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <FiLogIn className="text-xl" />
                  <span>Se connecter</span>
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 p-4 bg-gold/10 border border-gold/30 rounded-lg">
            <p className="text-gray-600 text-xs text-center">
              <span className="font-semibold">Identifiants par défaut :</span><br />
              admin@chainedehanche.fr / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
