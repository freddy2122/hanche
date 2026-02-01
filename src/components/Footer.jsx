import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi'

function Footer() {
  const productImages = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop&q=80',
      alt: 'Chaîne de hanche classique'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop&q=80',
      alt: 'Chaîne de hanche élégante'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&q=80',
      alt: 'Chaîne de hanche deluxe'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop&q=80',
      alt: 'Chaîne de hanche sport'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop&q=80',
      alt: 'Chaîne de hanche style'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop&q=80',
      alt: 'Chaîne de hanche moderne'
    }
  ]

  return (
    <footer className="bg-black text-white pt-16 pb-20 lg:pb-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-xl">CH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-tight">CHAÎNE</span>
                <span className="text-xl font-black text-gold leading-tight">HANCHE</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Votre destination pour des chaînes de hanche. Qualité, style et élégance pour sublimer votre look.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gold hover:text-black transition-colors">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gold hover:text-black transition-colors">
                <FiInstagram className="text-xl" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gold hover:text-black transition-colors">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gold hover:text-black transition-colors">
                <FiYoutube className="text-xl" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <a href="#accueil" className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#produits" className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                  Produits
                </a>
              </li>
              <li>
                <a href="#caracteristiques" className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                  Caractéristiques
                </a>
              </li>
              <li>
                <a href="#temoignages" className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                  Avis Clients
                </a>
              </li>
              <li>
                <a href="#acheter" className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                  Acheter
                </a>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Service Client</h4>
            <ul className="space-y-3">
              
              <li>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                  <FiTruck className="text-lg" />
                  Livraison & Retours
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                  <FiShield className="text-lg" />
                  Garantie
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                  Conditions générales
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMail className="text-gold text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:contact@chainedehanche.fr" className="text-white hover:text-gold transition-colors">
                    contact@chainedehanche.fr
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="text-gold text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Téléphone</p>
                  <a href="tel:+33123456789" className="text-white hover:text-gold transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-gold text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Adresse</p>
                  <p className="text-white">Paris, France</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Product Images Gallery */}
        
         
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Chaîne de Hanche. Tous droits réservés. | 
            <a href="#" className="hover:text-gold transition-colors ml-1">Mentions légales</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
