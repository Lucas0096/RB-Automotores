import React from 'react'  
import { motion } from 'framer-motion'  
import VehicleCard from './VehicleCard'  

const VehicleGrid = ({ vehicles, loading, onToggleFavorite }) => {  
  if (loading) {  
    return (  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">  
        {[...Array(8)].map((_, i) => (  
          <div key={i} className="bg-gray-100 animate-pulse rounded-3xl h-96"></div>  
        ))}  
      </div>  
    )  
  }  

  if (!vehicles || vehicles.length === 0) {  
    return (  
      <div className="text-center py-12">  
        <h3 className="text-2xl font-bold text-gray-800 mb-3">¡No hay autos que coincidan!</h3>  
        <p className="text-gray-600">Prueba con otros filtros o visita todos nuestros vehículos.</p>  
      </div>  
    )  
  }  

  return (  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">  
      {vehicles.map((vehicle, index) => (  
        <motion.div  
          key={vehicle.id}  
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }}  
          transition={{ delay: index * 0.05 }}  
        >  
          <VehicleCard vehicle={vehicle} onToggleFavorite={() => onToggleFavorite && onToggleFavorite(vehicle.id)} />  
        </motion.div>  
      ))}  
    </div>  
  )  
}  

export default VehicleGrid