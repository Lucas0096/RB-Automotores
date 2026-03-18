import React, { useEffect, useState } from 'react'  
import { useNavigate } from 'react-router-dom'  
import { supabase } from '../supabaseClient'  
import AdminVehicleForm from '../components/AdminVehicleForm'  
import AdminMetrics from '../components/AdminMetrics'  
import VehicleGrid from '../components/VehicleGrid'  

const AdminDashboard = () => {  
  const [user, setUser] = useState(null)  
  const [vehicles, setVehicles] = useState([])  
  const navigate = useNavigate()  

  useEffect(() => {  
    const getUser = async () => {  
      const { data: { user } } = await supabase.auth.getUser()  
      if (!user) {  
        navigate('/login')  
        return  
      }  

      const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()  
      if (profile?.role !== 'admin') {  
        navigate('/')  
        return  
      }  

      setUser(user)  
      fetchVehicles()  
    }  
    getUser()  
  }, [navigate])  

  const fetchVehicles = async () => {  
    const { data } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false })  
    setVehicles(data || [])  
  }  

  const handleVehicleAdded = () => {  
    fetchVehicles()  
  }  

  if (!user) return null  

  return (  
    <div className="min-h-screen bg-gray-50 py-8">  
      <div className="container mx-auto px-4">  
        <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>  

        <AdminMetrics />  

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">  
          <div className="lg:col-span-1">  
            <h2 className="text-2xl font-bold mb-6">Agregar Nuevo Vehículo</h2>  
            <AdminVehicleForm onVehicleAdded={handleVehicleAdded} />  
          </div>  

          <div className="lg:col-span-2">  
            <h2 className="text-2xl font-bold mb-6">Tus Vehículos</h2>  
            <VehicleGrid vehicles={vehicles} loading={false} />  
          </div>  
        </div>  
      </div>  
    </div>  
  )  
}  

export default AdminDashboard