import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiShoppingCart, FiHeart, FiPackage, FiTrendingUp, FiActivity, FiArrowUp, FiLogOut, FiUser, FiPlus, FiEdit, FiTrash2, FiX } from 'react-icons/fi'

function Dashboard() {
  const { user, logout, isAuthenticated, token } = useAuth()
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    image: '',
    rating: 0,
    reviews_count: 0,
    featured: false,
    active: true
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchDashboard()
    fetchProducts()
  }, [isAuthenticated, navigate])

  const fetchDashboard = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingProduct
        ? `http://localhost:8000/api/admin/products/${editingProduct.id}`
        : 'http://localhost:8000/api/admin/products'
      
      const method = editingProduct ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          original_price: formData.original_price ? parseFloat(formData.original_price) : null,
          rating: parseInt(formData.rating) || 0,
          reviews_count: parseInt(formData.reviews_count) || 0,
          featured: formData.featured || false,
          active: formData.active !== false
        })
      })

      if (response.ok) {
        setShowProductForm(false)
        setEditingProduct(null)
        resetForm()
        fetchProducts()
        fetchDashboard()
      }
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      original_price: product.original_price || '',
      image: product.image || '',
      rating: product.rating || 0,
      reviews_count: product.reviews_count || 0,
      featured: product.featured || false,
      active: product.active !== false
    })
    setShowProductForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8000/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        fetchProducts()
        fetchDashboard()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      image: '',
      rating: 0,
      reviews_count: 0,
      featured: false,
      active: true
    })
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Produits Disponibles',
      value: dashboardData?.stats?.total_products || 0,
      icon: FiPackage,
      bgGradient: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'up'
    },
    {
      title: 'Articles dans les Paniers',
      value: dashboardData?.stats?.cart_items || 0,
      icon: FiShoppingCart,
      bgGradient: 'from-gold to-gold-dark',
      change: 'Total',
      changeType: 'neutral'
    },
    {
      title: 'Favoris Total',
      value: dashboardData?.stats?.wishlist_items || 0,
      icon: FiHeart,
      bgGradient: 'from-red-500 to-red-600',
      change: 'Total',
      changeType: 'neutral'
    },
    {
      title: 'Valeur Totale Paniers',
      value: `${formatPrice(dashboardData?.stats?.cart_total || 0)} FCFA`,
      icon: FiTrendingUp,
      bgGradient: 'from-green-500 to-green-600',
      change: 'Total',
      changeType: 'neutral'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Admin Header */}
      <header className="bg-black text-white shadow-lg">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <FiPackage className="text-black text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-black">Dashboard Admin</h1>
                <p className="text-sm text-gray-400">Gestion de la plateforme</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <FiUser className="text-gold" />
                <span>{user?.name || 'Admin'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <FiLogOut />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.bgGradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-2xl" />
                  </div>
                  {stat.changeType === 'up' && (
                    <div className="flex items-center gap-1 text-green-500">
                      <FiArrowUp className="text-sm" />
                      <span className="text-xs font-bold">{stat.change}</span>
                    </div>
                  )}
                  {stat.changeType === 'neutral' && (
                    <span className="text-xs text-gray-500 font-medium">{stat.change}</span>
                  )}
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
                <p className="text-3xl font-black text-black">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Products Management Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-black mb-2">Gestion des Produits</h2>
              <p className="text-gray-600">Créez, modifiez et supprimez vos produits</p>
            </div>
            <button
              onClick={() => {
                resetForm()
                setEditingProduct(null)
                setShowProductForm(true)
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-gold-dark transition-colors"
            >
              <FiPlus className="text-xl" />
              Ajouter un Produit
            </button>
          </div>

          {/* Products List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Nom</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Prix</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Note</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Statut</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img
                        src={product.image || 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=100&h=100&fit=crop&q=80'}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-black">{product.name}</div>
                      {product.featured && (
                        <span className="text-xs bg-gold text-black px-2 py-0.5 rounded">Best Seller</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-black text-gold">{formatPrice(product.price)} FCFA</div>
                      {product.original_price && (
                        <div className="text-xs text-gray-400 line-through">
                          {formatPrice(product.original_price)} FCFA
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiActivity
                            key={i}
                            className={`text-sm ${
                              i < (product.rating || 0)
                                ? 'text-gold fill-gold'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {product.active ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          Actif
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                          Inactif
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FiEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="text-center py-12">
                <FiPackage className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Aucun produit disponible</p>
                <button
                  onClick={() => {
                    resetForm()
                    setEditingProduct(null)
                    setShowProductForm(true)
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-gold-dark transition-colors"
                >
                  <FiPlus />
                  Ajouter le premier produit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Form Modal */}
        {showProductForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-2xl font-black text-black">
                  {editingProduct ? 'Modifier le Produit' : 'Nouveau Produit'}
                </h3>
                <button
                  onClick={() => {
                    setShowProductForm(false)
                    setEditingProduct(null)
                    resetForm()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-black text-sm font-medium mb-2">
                      Nom du produit *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="Chaîne de Hanche Classique"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-black text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="Description du produit..."
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Prix (FCFA) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="59000"
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Prix Original (FCFA)
                    </label>
                    <input
                      type="number"
                      value={formData.original_price}
                      onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="69000"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-black text-sm font-medium mb-2">
                      URL de l'image
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Note (0-5)
                    </label>
                    <input
                      type="number"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      min="0"
                      max="5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Nombre d'avis
                    </label>
                    <input
                      type="number"
                      value={formData.reviews_count}
                      onChange={(e) => setFormData({ ...formData, reviews_count: e.target.value })}
                      min="0"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-5 h-5 text-gold rounded focus:ring-gold"
                      />
                      <span className="text-black font-medium">Best Seller</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="w-5 h-5 text-gold rounded focus:ring-gold"
                      />
                      <span className="text-black font-medium">Actif</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {editingProduct ? 'Modifier' : 'Créer'} le Produit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductForm(false)
                      setEditingProduct(null)
                      resetForm()
                    }}
                    className="px-6 py-3 bg-gray-100 text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Recent Products */}
        {dashboardData?.recent_products && dashboardData.recent_products.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-black mb-2">Produits Récents</h2>
                <p className="text-gray-600">Derniers produits ajoutés à la plateforme</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {dashboardData.recent_products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-3">
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=200&h=200&fit=crop&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-black mb-1 text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gold font-black">{formatPrice(product.price)} FCFA</p>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <FiActivity className="text-gold text-xs" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
