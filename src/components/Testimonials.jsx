import { FiStar, FiUser } from 'react-icons/fi'

function Testimonials() {
  const testimonials = [
    {
      name: 'Sophie Martin',
      rating: 5,
      text: 'Chaîne de qualité exceptionnelle ! Le design est magnifique et très tendance. Je la porte tous les jours et reçois beaucoup de compliments.',
      location: 'Paris',
      verified: true
    },
    {
      name: 'Emma Laurent',
      rating: 5,
      text: 'Ajustement parfait et finition impeccable. Livraison rapide et emballage soigné. Je recommande à 100% ! Un produit qui vaut vraiment son prix.',
      location: 'Lyon',
      verified: true
    },
    {
      name: 'Léa Dubois',
      rating: 5,
      text: 'Un bijou qui fait vraiment la différence. Le métal est résistant et ne s\'oxyde pas. Très satisfaite de mon achat, je vais en racheter une autre !',
      location: 'Marseille',
      verified: true
    }
  ]

  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Avis Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez ce que nos clients pensent de notre produit
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-gold fill-gold text-xl" />
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                  <FiUser className="text-black text-xl" />
                </div>
                <div>
                  <p className="font-bold text-black">{testimonial.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    {testimonial.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                        Vérifié
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
