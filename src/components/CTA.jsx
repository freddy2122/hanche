import { FiShoppingCart, FiCheck, FiTruck, FiShield, FiGift, FiRotateCcw } from 'react-icons/fi'

function CTA({ product }) {
  const included = [
    { icon: <FiGift />, text: 'Chaîne de hanche' },
    { icon: <FiTruck />, text: 'Livraison' },
    { icon: <FiShield />, text: 'Garantie satisfaction' },
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price || 59000)
  }

  return (
    <section id="acheter" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.1) 10px, rgba(212, 175, 55, 0.1) 20px)'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Prêt à Commander ?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Rejoignez des milliers de clients satisfaits
            </p>
            
            {/* Price */}
            {/* <div className="flex items-center justify-center gap-2 mb-12">
              <span className="text-3xl text-gold font-bold">FCFA</span>
              <span className="text-6xl md:text-7xl text-gold font-black">
                {formatPrice(product?.price)}
              </span>
            </div> */}
          </div>
          
          {/* Included Items */}
          <div className="bg-white/10 backdrop-blur-sm border-2 border-gold/30 rounded-3xl p-8 md:p-12 mb-10">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Ce qui est inclus :
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {included.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-white/90">
                  <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-black">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Buttons */}
         
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FiCheck className="text-gold" />
              <span>Paiement sécurisé</span>
            </div>
           
            <div className="flex items-center gap-2">
              <FiCheck className="text-gold" />
              <span>Livraison en 24-48h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
