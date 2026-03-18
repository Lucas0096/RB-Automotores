import React, { useEffect, useState } from 'react'  
import { useNavigate } from 'react-router-dom'  
import { supabase } from '../supabaseClient'  
import Favorites from '../components/Favorites'  
import AlertsForm from '../components/AlertsForm'  

const Dashboard = () => {  
  const [user, setUser] = useState(null)  
  const navigate = useNavigate()  

  useEffect(() => {  
    const getUser = async () => {  
      const { data: { user } } = await supabase.auth.getUser()  
      if (!user) {  
        navigate('/login')  
      } else {  
        setUser(user)  
      }  
    }  
    getUser()  
  }, [navigate])  

  if (!user) return null  

  return (  
    <div className="min-h-screen bg-gray-50 py-8">  
      <div className="container mx-auto px-4 max-w-4xl">  
        <h1 className="text-3xl font-bold mb-8">Bienvenido, {user.email}</h1>  

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">  
          <AlertsForm userId={user.id} />  
          <Favorites userId={user.id} />  
        </div>  
      </div>  
    </div>  
  )  
}  

export default Dashboard