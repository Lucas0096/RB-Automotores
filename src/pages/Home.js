import React, { useState, useEffect } from 'react'  
import { supabase } from '../supabaseClient'  
import HeroSection from '../components/HeroSection'  
import SearchBar from '../components/SearchBar'  
import VehicleGrid from '../components/VehicleGrid'  
import { motion } from 'framer-motion'  
import { Star, Clock, Megaphone } from 'lucide-react'  

const Home = () => {  
  const [vehicles, setVehicles] = useState([])  
  const [featuredVehicles, setFeaturedVehicles] = useState([])  
  const [recentVehicles, setRecentVehicles] = useState([])  
  const [testimonials, setTestimonials] = useState([])  
  const [loading, setLoading] = useState(true)  

  useEffect(() => {  
    fetchData()  
  }, [])  

  const fetchData = async () => {  
    setLoading(true)  
    const [featuredRes, recentRes, testimonialsRes] = await Promise.all([  
      supabase.from('vehicles').select('*').eq('status', 'published').eq('is_featured', true).limit(4),  
      supabase.from('vehicles').select('*').eq('status', 'published').order('created_at', { ascending: false }).limit(4),  
      supabase.from('testimonials').select('*').limit(3)  
    ])  

    setFeaturedVehicles(featuredRes.data || [])  
    setRecentVehicles(recentRes.data || [])  
    setTestimonials(testimonialsRes.data || [])  

    const { data: allVehicles } = await supabase.from('vehicles').select('*').eq('status', 'published').order('created_at', { ascending: false })  
    setVehicles(allVehicles || [])  

    setLoading(false)  
  }  

  const fetchVehicles = async (filters = {}) => {  
    let query = supabase.from('vehicles').select('*').eq('status', 'published').order('created_at', { ascending: false })  

    if (filters.brand) {  
      const { data: brandData } = await supabase.from('brands').select('id').eq('name', filters.brand).single()  
      if (brandData) query = query.eq('brand_id', brandData.id)  
    }  

    if (filters.maxPrice) {  
      query = query.lte('price', parseFloat(filters.maxPrice))  
    }  

    if (filters.location) {  
      query = query.eq('location', filters.location)  
    }  

    if (filters.searchTerm) {  
      query = query.textSearch('search_vector', filters.searchTerm)  
    }  

    const { data } = await query  
    setVehicles(data || [])  
  }  

  return (  
    <div className="min-h-screen">  
      <HeroSection />  
      <div className="container mx-auto px-4 -mt-16 relative z-10">  
        <SearchBar onSearch={fetchVehicles} />  

        {featuredVehicles.length > 0 && (  
          <section className="mb-12">  
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6 flex items-center gap-3">  
              <Star className="w-8 h-8 text-yellow-500" />  
              Vehículos Destacados  
            </motion.h2>  
            <VehicleGrid vehicles={featuredVehicles} loading={false} />  
          </section>  
        )}  

        {recentVehicles.length > 0 && (  
          <section className="mb-12">  
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6 flex items-center gap-3">  
              <Clock className="w-8 h-8 text-blue-500" />  
              Recientemente Publicados  
            </motion.h2>  
            <VehicleGrid vehicles={recentVehicles} loading={false} />  
          </section>  
        )}  

        <section className="mb-12">  
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8 text-center">  
            <Megaphone className="w-16 h-16 mx-auto mb-4" />  
            <h2 className="text-3xl font-bold mb-4">¡Ofertas Especiales!</h2>  
            <p className="text-xl mb-6">Descuentos en financiamiento para modelos 0km. ¡No esperes!</p>  
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100">Ver Ofertas</button>  
          </motion.div>  
        </section>  

        <section className="mb-12">  
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6">Financiamiento Fácil</motion.h2>  
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center">  
            <h3 className="text-2xl font-bold mb-4">Préstamos Prendarios</h3>  
            <p className="text-gray-700 mb-6">Hasta el 80% del valor del vehículo. Tasas competitivas y aprobación rápida.</p>  
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700">Simular Ahora</button>  
          </div>  
        </section>  

        {testimonials.length > 0 && (  
          <section className="mb-12">  
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6">Lo que dicen nuestros clientes</motion.h2>  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">  
              {testimonials.map((testimonial) => (  
                <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-md">  
                  <div className="flex items-center gap-3 mb-4">  
                    <div className="w-12 h-12 bg-gray-300 rounded-full" />  
                    <div>  
                      <h4 className="font-semibold">{testimonial.name}</h4>  
                      <p className="text-sm text-gray-500">{testimonial.rating}/5</p>  
                    </div>  
                  </div>  
                  <p className="text-gray-700 italic">"{testimonial.message}"</p>  
                </motion.div>  
              ))}  
            </div>  
          </section>  
        )}  

        <section className="text-center mb-12">  
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6">¿Listo para tu nuevo auto?</motion.h2>  
          <motion.button  
            className="bg-green-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg"  
            whileHover={{ scale: 1.05 }}  
            onClick={() => window.open('https://wa.me/549123456789', '_blank')}  
          >  
            Chatea Ahora - ¡Es Gratis!  
          </motion.button>  
        </section>  

        <section>  
          <h2 className="text-3xl font-bold mb-6">Todos los Vehículos</h2>  
          <VehicleGrid vehicles={vehicles} loading={loading} />  
        </section>  
      </div>  

      <footer className="bg-gray-900 text-white py-12 mt-16">  
        <div className="container mx-auto px-4 text-center">  
          <h3 className="text-2xl font-bold mb-4">AutoElite</h3>  
          <p className="text-gray-400 mb-6">Tu agencia de confianza para vehículos premium en Argentina.</p>  
          <div className="flex justify-center gap-6 text-gray-400 mb-8">  
            <a href="#" className="hover:text-white">Términos</a>  
            <a href="#" className="hover:text-white">Privacidad</a>  
            <a href="#" className="hover:text-white">Contacto</a>  
          </div>  
          <p className="text-sm text-gray-500">&copy; 2024 AutoElite. Todos los derechos reservados.</p>  
        </div>  
      </footer>  
    </div>  
  )  
}  

export default Home