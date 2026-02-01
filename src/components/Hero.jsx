function Hero({ product }) {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-4 px-4 py-2 bg-gold/10 rounded-full">
              <span className="text-gold font-semibold text-sm uppercase tracking-wide">Nouveau</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-6 leading-tight">
              Chaîne de Hanche
              <span className="block text-gold">Élégante</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {product?.description || 'Une chaîne de hanche élégante et moderne qui sublime votre style. Fabriquée avec des matériaux de qualité supérieure.'}
            </p>

            {/* Price */}
            {/* <div className="flex items-baseline gap-2 mb-12 justify-center lg:justify-start">
              <span className="text-3xl text-gold font-bold">FCFA</span>
              <span className="text-6xl md:text-7xl text-gold font-black">
                {product?.price || '59 000'}
              </span>
            </div> */}
          </div>
          
          {/* Right Image/Visual */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              <div className="aspect-square bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&q=80" 
                  alt="Chaîne de hanche" 
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&q=80'
                  }}
                />
                
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-gold/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Floating Badge */}
              {/* <div className="absolute -top-4 -right-4 bg-gold text-black px-6 py-3 rounded-full font-bold shadow-xl animate-pulse">
                -20%
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
