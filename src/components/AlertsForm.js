import React, { useState } from 'react'  
import { motion } from 'framer-motion'  
import { Bell, Search } from 'lucide-react'  
import { supabase } from '../supabaseClient'  

const AlertsForm = ({ userId }) => {  
  const [filters, setFilters] = useState({  
    brand: '',  
    maxPrice: '',  
    maxMileage: '',  
    location: ''  
  })  
  const [success, setSuccess] = useState(false)  

  const handleSubmit = async (e) => {  
    e.preventDefault()  
    const { error } = await supabase  
      .from('alerts')  
      .insert({  
        user_id: userId,  
        ...filters,  
        is_active: true  
      })  

    if (!error) {  
      setSuccess(true)  
      setTimeout(() => setSuccess(false), 3000)  
      setFilters({ brand: '', maxPrice: '', maxMileage: '', location: '' })  
    }  
  }  

  return (  
    <motion.div  
      initial={{ opacity: 0 }}  
      animate={{ opacity: 1 }}  
      className="bg-white rounded-3xl p-6 shadow-xl"  
    >  
      <div className="flex items-center gap-3 mb-6">  
        <Bell className="w-6 h-6 text-blue-600" />  
        <h3 className="text-xl font-bold">Crear Alerta Personalizada</h3>  
      </div>  

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">  
        <select  
          value={filters.brand}  
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}  
          className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
        >  
          <option value="">Cualquier marca</option>  
          <option value="Toyota">Toyota</option>  
          <option value="Ford">Ford</option>  
          <option value="Volkswagen">Volkswagen</option>  
        </select>  

        <input  
          type="number"  
          placeholder="Precio máximo"  
          value={filters.maxPrice}  
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}  
          className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  

        <input  
          type="number"  
          placeholder="Kilometraje máximo"  
          value={filters.maxMileage}  
          onChange={(e) => setFilters({ ...filters, maxMileage: e.target.value })}  
          className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  

        <select  
          value={filters.location}  
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}  
          className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
        >  
          <option value="">Cualquier ubicación</option>  
          <option value="Mendoza">Mendoza</option>  
          <option value="Buenos Aires">Buenos Aires</option>  
          <option value="Córdoba">Córdoba</option>  
        </select>  

        <motion.button  
          type="submit"  
          className="md:col-span-2 bg-green-500 text-white py-3 rounded-2xl font-semibold hover:bg-green-600"  
          whileHover={{ scale: 1.02 }}  
        >  
          <Search className="w-5 h-5 inline mr-2" />  
          Crear Alerta  
        </motion.button>  
      </form>  

      {success && (  
        <motion.p  
          initial={{ opacity: 0, y: -10 }}  
          animate={{ opacity: 1, y: 0 }}  
          className="text-green-600 text-center mt-4 font-medium"  
        >  
          ¡Alerta creada! Te avisaremos cuando haya coincidencias.  
        </motion.p>  
      )}  
    </motion.div>  
  )  
}  

export default AlertsForm