import React, { useState, useEffect } from 'react'  
import { supabase } from '../supabaseClient'  
import { motion } from 'framer-motion'  
import { BarChart3, Eye, MousePointer, MessageCircle, TrendingUp } from 'lucide-react'  

const AdminMetrics = () => {  
  const [metrics, setMetrics] = useState({  
    totalViews: 0,  
    totalInquiries: 0,  
    topVehicle: null  
  })  
  const [loading, setLoading] = useState(true)  

  useEffect(() => {  
    fetchMetrics()  
  }, [])  

  const fetchMetrics = async () => {  
    setLoading(true)  
    const { data: eventsData } = await supabase.from('vehicle_events').select('event_type, vehicle_id').eq('event_type', 'view')  
    const views = eventsData?.length || 0  

    const { data: inquiriesData } = await supabase.from('inquiries').select('*')  
    const inquiries = inquiriesData?.length || 0  

    const { data: topData } = await supabase  
      .from('vehicles')  
      .select('title, (SELECT COUNT(*) FROM vehicle_events WHERE vehicle_id = vehicles.id AND event_type = \'view\') as view_count')  
      .order('view_count', { ascending: false })  
      .limit(1)  

    setMetrics({ totalViews: views, totalInquiries: inquiries, topVehicle: topData?.[0] })  
    setLoading(false)  
  }  

  if (loading) return <p>Cargando métricas...</p>  

  return (  
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">  
      <div className="bg-white rounded-2xl p-6 shadow-md">  
        <div className="flex items-center gap-3 mb-4">  
          <Eye className="w-8 h-8 text-blue-600" />  
          <h3 className="text-lg font-semibold">Visualizaciones Totales</h3>  
        </div>  
        <p className="text-3xl font-bold text-gray-900">{metrics.totalViews}</p>  
      </div>  

      <div className="bg-white rounded-2xl p-6 shadow-md">  
        <div className="flex items-center gap-3 mb-4">  
          <MessageCircle className="w-8 h-8 text-green-600" />  
          <h3 className="text-lg font-semibold">Consultas</h3>  
        </div>  
        <p className="text-3xl font-bold text-gray-900">{metrics.totalInquiries}</p>  
      </div>  

      <div className="bg-white rounded-2xl p-6 shadow-md">  
        <div className="flex items-center gap-3 mb-4">  
          <TrendingUp className="w-8 h-8 text-purple-600" />  
          <h3 className="text-lg font-semibold">Más Visto</h3>  
        </div>  
        <p className="font-bold text-gray-900">{metrics.topVehicle?.title || 'Ninguno'}</p>  
      </div>  
    </motion.div>  
  )  
}  

export default AdminMetrics