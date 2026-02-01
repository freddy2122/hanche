import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'
import Features from '../components/Features'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

function Home() {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/product')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0])
        } else if (!Array.isArray(data)) {
          setProduct(data)
        } else {
          setProduct({
            name: 'Chaîne de Hanche',
            price: 59000,
            description: 'Une chaîne de hanche élégante et moderne qui sublime votre style',
            features: [
              'Métal résistant',
              'Ajustable à toutes les tailles',
              'Design unique et tendance',
              'Livraison gratuite'
            ]
          })
        }
      })
      .catch(err => {
        console.log('API not available, using default data')
        setProduct({
          name: 'Chaîne de Hanche',
          price: 59000,
          description: 'Une chaîne de hanche élégante et moderne qui sublime votre style',
          features: [
            'Métal résistant',
            'Ajustable à toutes les tailles',
            'Design unique et tendance',
            'Livraison gratuite'
          ]
        })
      })
  }, [])

  return (
    <>
      <Hero product={product} />
      <Products />
      <Features product={product} />
      <Gallery />
      <Testimonials />
      <CTA product={product} />
    </>
  )
}

export default Home
