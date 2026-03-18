import React from 'react'  
import { motion } from 'framer-motion'  
import { Rocket, Shield, Truck } from 'lucide-react'  
import { Link } from 'react-router-dom'  

const HeroSection = () => {  
  return (  
    <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 pt-32 pb-20">  
      <div className="container mx-auto px-4 text-center">  
        <motion.h1  
          initial={{ opacity: 0, y: 30 }}  
          animate={{ opacity: 1, y: 0 }}  
          transition={{ duration: 0.8 }}  
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"  
        >  
          Encuentra tu auto  
          <span className="block text-4xl md:text-5xl">soñado hoy</span>  
        </motion.h1>  

        <motion.p  
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }}  
          transition={{ delay: 0.3 }}  
          className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"  
        >  
          Descubre vehículos nuevos, usados e importados con financiamiento flexible. Confianza, calidad y el mejor servicio en Argentina.  
        </motion.p>  

        <motion.div  
          initial={{ opacity: 0, scale: 0.9 }}  
          animate={{ opacity: 1, scale: 1 }}  
          transition={{ delay: 0.5 }}  
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"  
        >  
          <Link to="/vehicles" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">  
            Explorar Vehículos  
          </Link>  
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300" onClick={() => window.open('https://wa.me/549123456789', '_blank')}>  
            Contáctanos  
          </button>  
        </motion.div>  

        <motion.div  
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          transition={{ delay: 0.7 }}  
        >  
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg">  
            <Rocket className="w-12 h-12 text-blue-600 mb-4" />  
            <h3 className="text-lg font-semibold mb-2">Entrega Rápida</h3>  
            <p className="text-gray-600 text-center">Recibe tu auto en días, con gestoría incluida.</p>  
          </div>  

          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg">  
            <Shield className="w-12 h-12 text-green-600 mb-4" />  
            <h3 className="text-lg font-semibold mb-2">Garantía Total</h3>  
            <p className="text-gray-600 text-center">Todos nuestros vehículos verificados y con garantía.</p>  
          </div>  

          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg">  
            <Truck className="w-12 h-12 text-purple-600 mb-4" />  
            <h3 className="text-lg font-semibold mb-2">Financiamiento</h3>  
            <p className="text-gray-600 text-center">Opciones flexibles para que conduzcas sin esperas.</p>  
          </div>  
        </motion.div>  
      </div>  
    </section>  
  )  
}  

export default HeroSection