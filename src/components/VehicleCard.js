import React from 'react'  
import { motion } from 'framer-motion'  
import { Heart, MapPin, Calendar, DollarSign, Phone } from 'lucide-react'  
import { Link } from 'react-router-dom'  

const VehicleCard = ({ vehicle, onToggleFavorite }) => {  
  const { id, title, price, year, mileage, location, image, is_new, is_featured } = vehicle  

  const formatPrice = (price) => {  
    return new Intl.NumberFormat('es-AR', {  
      style: 'currency',  
      currency: 'ARS'  
    }).format(price)  
  }  

  const handleWhatsApp = () => {  
    const message = `Hola, estoy interesado en este vehículo: ${title} - ${formatPrice(price)}`  
    window.open(`https://wa.me/549123456789?text=${encodeURIComponent(message)}`, '_blank')  
  }  

  return (  
    <motion.div  
      layout  
      initial={{ opacity: 0, y: 20 }}  
      whileInView={{ opacity: 1, y: 0 }}  
      transition={{ duration: 0.5 }}  
      className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${  
        is_featured ? 'ring-2 ring-blue-500' : ''  
      }`}  
    >  
      <div className="relative overflow-hidden">  
        <img  
          src={image || 'https://via.placeholder.com/400x250?text=Auto'}  
          alt={title}  
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"  
        />  
        {is_new && (  
          <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">  
            0KM  
          </span>  
        )}  
        {is_featured && (  
          <span className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">  
            Destacado  
          </span>  
        )}  
        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={onToggleFavorite}>  
          <Heart className="w-5 h-5 text-gray-600" />  
        </button>  
      </div>  

      <div className="p-6">  
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>  
        <div className="flex items-center justify-between mb-4">  
          <div className="flex items-center gap-4 text-sm text-gray-600">  
            <span className="flex items-center gap-1">  
              <Calendar className="w-4 h-4" />  
              {year}  
            </span>  
            <span className="flex items-center gap-1">  
              {mileage} km  
            </span>  
          </div>  
          <div className="text-right">  
            <p className="text-2xl font-bold text-blue-600">{formatPrice(price)}</p>  
          </div>  
        </div>  

        <div className="flex items-center justify-between">  
          <span className="flex items-center gap-1 text-sm text-gray-500">  
            <MapPin className="w-4 h-4" />  
            {location}  
          </span>  
          <div className="flex gap-2">  
            <Link  
              to={`/vehicle/${id}`}  
              className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"  
            >  
              Ver más  
            </Link>  
            <motion.button  
              onClick={handleWhatsApp}  
              className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center gap-2"  
              whileHover={{ scale: 1.05 }}  
              whileTap={{ scale: 0.95 }}  
            >  
              <Phone className="w-4 h-4" />  
              Chatear  
            </motion.button>  
          </div>  
        </div>  
      </div>  
    </motion.div>  
  )  
}  

export default VehicleCard