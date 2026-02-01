import { FiCheckCircle, FiSettings, FiAward, FiTruck } from 'react-icons/fi'

function Features({ product }) {
  const features = [
    {
      icon: <FiAward className="text-4xl" />,
      title: 'Métal Résistant',
      description: 'Matériau de haute qualité pour une durabilité exceptionnelle et une résistance à l\'oxydation.'
    },
    {
      icon: <FiSettings className="text-4xl" />,
      title: 'Ajustable à Toutes les Tailles',
      description: 'Système d\'ajustement facile et sécurisé pour un confort optimal, quelle que soit votre taille.'
    },
    {
      icon: <FiCheckCircle className="text-4xl" />,
      title: 'Design Unique et Tendance',
      description: 'Style moderne et élégant qui s\'adapte à toutes les occasions et complète parfaitement votre look.'
    },
    {
      icon: <FiTruck className="text-4xl" />,
      title: 'Livraison Gratuite',
      description: 'Expédition rapide et sécurisée partout en France métropolitaine, emballage soigné inclus.'
    }
  ]

  return (
    <section id="caracteristiques" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Pourquoi Nous Choisir ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des caractéristiques exceptionnelles pour un produit d'exception
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-gold rounded-xl flex items-center justify-center mb-6 text-black group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
