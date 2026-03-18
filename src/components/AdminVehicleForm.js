import React, { useState } from 'react'  
import { motion } from 'framer-motion'  
import { Plus, Image, Video } from 'lucide-react'  
import { supabase } from '../supabaseClient'  

const AdminVehicleForm = ({ onVehicleAdded }) => {  
  const [formData, setFormData] = useState({  
    title: '',  
    brand: '',  
    model: '',  
    year: '',  
    price: '',  
    description: '',  
    location: '',  
    status: 'draft'  
  })  
  const [files, setFiles] = useState([])  
  const [uploading, setUploading] = useState(false)  

  const handleSubmit = async (e) => {  
    e.preventDefault()  
    setUploading(true)  

    const { data: brandData } = await supabase.from('brands').select('id').eq('name', formData.brand).single()  
    const { data: modelData } = await supabase.from('models').select('id').eq('name', formData.model).eq('brand_id', brandData?.id).single()  

    if (!brandData || !modelData) {  
      alert('Marca o modelo no encontrado. Crea primero en admin.')  
      setUploading(false)  
      return  
    }  

    const { data, error } = await supabase  
      .from('vehicles')  
      .insert({  
        title: formData.title,  
        brand_id: brandData.id,  
        model_id: modelData.id,  
        year: parseInt(formData.year),  
        price: parseFloat(formData.price),  
        description: formData.description,  
        location: formData.location,  
        status: formData.status  
      })  
      .select()  
      .single()  

    if (!error && data) {  
      for (const file of files) {  
        const fileExt = file.name.split('.').pop()  
        const fileName = `${data.id}-${Date.now()}.${fileExt}`  
        const { error: uploadError } = await supabase.storage  
          .from('vehicle-media')  
          .upload(fileName, file)  

        if (!uploadError) {  
          const publicUrl = supabase.storage.from('vehicle-media').getPublicUrl(fileName).data.publicUrl  
          await supabase.from('vehicle_media').insert({  
            vehicle_id: data.id,  
            media_url: publicUrl,  
            media_type: file.type.includes('video') ? 'video' : 'image',  
            order_index: files.indexOf(file)  
          })  
        }  
      }  
      onVehicleAdded()  
      setFormData({ title: '', brand: '', model: '', year: '', price: '', description: '', location: '', status: 'draft' })  
      setFiles([])  
    }  

    setUploading(false)  
  }  

  const handleFileChange = (e) => {  
    setFiles(Array.from(e.target.files))  
  }  

  return (  
    <motion.form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-xl space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
        <input  
          type="text"  
          placeholder="Título (ej: Toyota Hilux SRX)"  
          value={formData.title}  
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}  
          required  
          className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <input  
          type="text"  
          placeholder="Marca"  
          value={formData.brand}  
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}  
          required  
          className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <input  
          type="text"  
          placeholder="Modelo"  
          value={formData.model}  
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}  
          required  
          className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <input  
          type="number"  
          placeholder="Año"  
          value={formData.year}  
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}  
          required  
          className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <input  
          type="number"  
          placeholder="Precio (ARS)"  
          value={formData.price}  
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}  
          required  
          className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <input  
          type="text"  
          placeholder="Ubicación"  
          value={formData.location}  
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}  
          required  
          className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
      </div>  

      <textarea  
        placeholder="Descripción detallada"  
        value={formData.description}  
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}  
        rows={4}  
        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
      />  

      <select  
        value={formData.status}  
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}  
        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
      >  
        <option value="draft">Borrador</option>  
        <option value="published">Publicado</option>  
      </select>  

      <input  
        type="file"  
        multiple  
        accept="image/*,video/*"  
        onChange={handleFileChange}  
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"  
      />  

      {files.length > 0 && (  
        <p className="text-sm text-gray-600">Archivos seleccionados: {files.length}</p>  
      )}  

      <motion.button  
        type="submit"  
        disabled={uploading}  
        className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold disabled:opacity-50"  
        whileHover={{ scale: 1.02 }}  
      >  
        {uploading ? 'Subiendo...' : 'Crear Vehículo'}  
      </motion.button>  
    </motion.form>  
  )  
}  

export default AdminVehicleForm