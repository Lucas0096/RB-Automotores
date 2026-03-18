import React, { useState } from 'react'  
import { motion } from 'framer-motion'  
import { Mail, Lock, UserPlus } from 'lucide-react'  
import { supabase } from '../supabaseClient'  
import { useNavigate } from 'react-router-dom'  

const LoginForm = () => {  
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')  
  const [isLogin, setIsLogin] = useState(true)  
  const [loading, setLoading] = useState(false)  
  const [error, setError] = useState('')  
  const navigate = useNavigate()  

  const handleAuth = async (e) => {  
    e.preventDefault()  
    setLoading(true)  
    setError('')  

    try {  
      let authError  
      let user  

      if (isLogin) {  
        const { data, error: loginError } = await supabase.auth.signInWithPassword({  
          email,  
          password  
        })  
        authError = loginError  
        user = data?.user  
      } else {  
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({  
          email,  
          password  
        })  
        if (signUpError) throw signUpError  

        // Sign in after sign up to get immediate session  
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({  
          email,  
          password  
        })  
        authError = loginError  
        user = loginData?.user  
      }  

      if (authError) throw authError  

      if (user) {  
        navigate('/')  
      }  
    } catch (err) {  
      setError(err.message)  
    } finally {  
      setLoading(false)  
    }  
  }  

  return (  
    <motion.div  
      initial={{ opacity: 0, scale: 0.9 }}  
      animate={{ opacity: 1, scale: 1 }}  
      className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl"  
    >  
      <h2 className="text-3xl font-bold text-center mb-6">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>  

      <form onSubmit={handleAuth} className="space-y-4">  
        <div>  
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>  
          <div className="relative">  
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />  
            <input  
              type="email"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)}  
              required  
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
            />  
          </div>  
        </div>  

        <div>  
          <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>  
          <div className="relative">  
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />  
            <input  
              type="password"  
              value={password}  
              onChange={(e) => setPassword(e.target.value)}  
              required  
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
            />  
          </div>  
        </div>  

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}  

        <motion.button  
          type="submit"  
          disabled={loading}  
          className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold disabled:opacity-50"  
          whileHover={{ scale: 1.02 }}  
          whileTap={{ scale: 0.98 }}  
        >  
          {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}  
        </motion.button>  
      </form>  

      <p className="text-center mt-6 text-gray-600">  
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}  
        <button  
          onClick={() => setIsLogin(!isLogin)}  
          className="ml-1 text-blue-600 hover:underline font-medium"  
        >  
          {isLogin ? 'Regístrate' : 'Inicia sesión'}  
        </button>  
      </p>  

      {!isLogin && (  
        <motion.div  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          className="mt-4 p-4 bg-green-50 rounded-2xl flex items-center gap-2"  
        >  
          <UserPlus className="w-5 h-5 text-green-600" />  
          <span className="text-green-800">¡Regístrate gratis y guarda tus favoritos!</span>  
        </motion.div>  
      )}  
    </motion.div>  
  )  
}  

export default LoginForm