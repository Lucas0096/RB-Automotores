import React, { useState, useEffect } from 'react'  
import { supabase } from '../supabaseClient'  
import { motion } from 'framer-motion'  
import VehicleCard from './VehicleCard'  

const Favorites = ({ userId }) => {  
  const [favorites, setFavorites] = useState([])  
  const [loading, setLoading] = useState(true)  

  useEffect(() => {  
    if (userId) {  
      fetchFavorites()  
    }  
  }, [userId])  

  const fetchFavorites = async () => {  
    setLoading(true)  
    const { data, error } = await supabase  
      .from('favorites')  
      .select('vehicle_id')  
      .eq('user_id', userId)  

    if (!error && data) {  
      const vehicleIds = data.map(f => f.vehicle_id)  
      const { data: vehiclesData } = await supabase  
        .from('vehicles')  
        .select('*, brands(name), models(name)')  
        .in('id', vehicleIds)  
        .eq('status', 'published')  

      setFavorites(vehiclesData || [])  
    }  
    setLoading(false)  
  }  

  const toggleFavorite = async (vehicleId) => {  
    const { error } = await supabase  
      .from('favorites')  
      .select('id')  
      .eq('user_id', userId)  
      .eq('vehicle_id', vehicleId)  
      .single()  

    if (error) {  
      await supabase.from('favorites').insert({ user_id: userId, vehicle_id: vehicleId })  
    } else {  
      await supabase.from('favorites').delete().eq('user_id', userId).eq('vehicle_id', vehicleId)  
    }  

    fetchFavorites()  
  }  

  if (loading) return <p>Cargando favoritos...</p>  

  return (  
    <div>  
      <h2 className="text-2xl font-bold mb-6">Tus Favoritos</h2>  
      {favorites.length === 0 ? (  
        <p>No tienes autos favoritos aún. ¡Guarda algunos!</p>  
      ) : (  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">  
          {favorites.map((vehicle) => (  
            <motion.div key={vehicle.id} whileHover={{ y: -5 }}>  
              <VehicleCard vehicle={vehicle} onToggleFavorite={() => toggleFavorite(vehicle.id)} />  
            </motion.div>  
          ))}  
        </div>  
      )}  
    </div>  
  )  
}  

export default Favorites