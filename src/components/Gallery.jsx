import { FiZoomIn, FiHeart } from 'react-icons/fi'
import { useState } from 'react'

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(0)
  
  const images = [
    { 
      id: 1, 
      title: 'Vue Détaillée', 
      description: 'Chaîne de hanche en métal avec finition impeccable',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&q=80'
    },
    { 
      id: 2, 
      title: 'Style Moderne', 
      description: 'Design élégant et tendance pour toutes les occasions',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&q=80'
    },
    { 
      id: 3, 
      title: 'Ajustement Parfait', 
      description: 'Système d\'ajustement facile, s\'adapte à toutes les tailles',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&q=80'
    },
    { 
      id: 4, 
      title: 'Qualité Supérieure', 
      description: 'Finition de qualité supérieure, résistant et durable',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&q=80'
    }
  ]

  return (
    <section id="galerie" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Galerie Produit
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre chaîne de hanche sous tous les angles
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
                selectedImage === index ? 'ring-4 ring-gold' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img 
                  src={image.image} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&q=80'
                  }}
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-4">
                <button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gold hover:text-black">
                  <FiZoomIn className="text-xl" />
                </button>
                <button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white">
                  <FiHeart className="text-xl" />
                </button>
              </div>
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                <p className="text-sm text-gray-300">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
