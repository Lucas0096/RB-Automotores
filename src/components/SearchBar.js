import React, { useState } from 'react'  
import { motion } from 'framer-motion'  
import { Search, Filter, Calendar, MapPin, DollarSign, ChevronDown } from 'lucide-react'  

const SearchBar = ({ onSearch }) => {  
  const [searchTerm, setSearchTerm] = useState('')  
  const [filters, setFilters] = useState({  
    brand: '',  
    minPrice: '',  
    maxPrice: '',  
    year: '',  
    location: ''  
  })  

  const handleSubmit = (e) => {  
    e.preventDefault()  
    onSearch({ ...filters, searchTerm })  
  }  

  const brands = ['Toyota', 'Ford', 'Volkswagen', 'Renault', 'Fiat'] // De supabase en prod  

  return (  
    <motion.form  
      onSubmit={handleSubmit}  
      className="bg-white rounded-3xl shadow-xl p-6 mb-8"  
      initial={{ y: 20, opacity: 0 }}  
      animate={{ y: 0, opacity: 1 }}  
      transition={{ delay: 0.2 }}  
    >  
      <div className="flex flex-col lg:flex-row gap-4 items-end">  
        <div className="flex-1 relative">  
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />  
          <input  
            type="text"  
            placeholder="¿Qué auto buscas? (ej: Toyota Hilux)"  
            value={searchTerm}  
            onChange={(e) => setSearchTerm(e.target.value)}  
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
          />  
        </div>  

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 max-w-md">  
          <select  
            value={filters.brand}  
            onChange={(e) => setFilters({...filters, brand: e.target.value})}  
            className="px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
          >  
            <option value="">Todas las marcas</option>  
            {brands.map((brand) => (  
              <option key={brand} value={brand}>{brand}</option>  
            ))}  
          </select>  

          <div className="relative">  
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />  
            <input  
              type="number"  
              placeholder="Precio máx."  
              value={filters.maxPrice}  
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}  
              className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
            />  
          </div>  

          <select  
            value={filters.location}  
            onChange={(e) => setFilters({...filters, location: e.target.value})}  
            className="px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
          >  
            <option value="">Todas las ubicaciones</option>  
            <option value="Mendoza">Mendoza</option>  
            <option value="Buenos Aires">Buenos Aires</option>  
            <option value="Córdoba">Córdoba</option>  
          </select>  
        </div>  

        <motion.button  
          type="submit"  
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:shadow-lg"  
          whileHover={{ scale: 1.05 }}  
          whileTap={{ scale: 0.95 }}  
        >  
          <Search className="w-5 h-5" />  
          Buscar  
        </motion.button>  

        <button className="md:hidden p-2 text-gray-500">  
          <Filter className="w-5 h-5" />  
        </button>  
      </div>  
    </motion.form>  
  )  
}  

export default SearchBar