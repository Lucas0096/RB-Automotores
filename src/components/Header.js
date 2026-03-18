import React, { useState, useEffect } from 'react'  
import { motion } from 'framer-motion'  
import { Menu, X, Search, User, Phone, LogIn, LogOut } from 'lucide-react'  
import { Link, useLocation, useNavigate } from 'react-router-dom'  
import { supabase } from '../supabaseClient'  

const Header = () => {  
  const [isMenuOpen, setIsMenuOpen] = useState(false)  
  const [user, setUser] = useState(null)  
  const location = useLocation()  
  const navigate = useNavigate()  

  useEffect(() => {  
    const getUser = async () => {  
      const { data: { user } } = await supabase.auth.getUser()  
      setUser(user)  
    }  
    getUser()  

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {  
      setUser(session?.user ?? null)  
    })  

    return () => {  
      authListener.subscription.unsubscribe()  
    }  
  }, [])  

  const handleLogout = async () => {  
    await supabase.auth.signOut()  
    navigate('/')  
  }  

  const navLinks = [  
    { to: '/', label: 'Inicio' },  
    { to: '/vehicles', label: 'Vehículos' },  
    { to: '/financiamiento', label: 'Financiamiento' },  
    { to: '/contacto', label: 'Contacto' }  
  ]  

  return (  
    <motion.header  
      initial={{ y: -100 }}  
      animate={{ y: 0 }}  
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 shadow-lg"  
    >  
      <div className="container mx-auto px-4 py-4">  
        <div className="flex items-center justify-between">  
          <motion.div  
            className="flex items-center gap-3"  
            whileHover={{ scale: 1.05 }}  
          >  
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">  
              AutoElite  
            </Link>  
          </motion.div>  

          <nav className="hidden md:flex items-center gap-8">  
            {navLinks.map((link) => (  
              <Link  
                key={link.to}  
                to={link.to}  
                className={`font-medium transition-colors ${  
                  location.pathname === link.to  
                    ? 'text-blue-600 border-b-2 border-blue-600'  
                    : 'text-gray-700 hover:text-blue-600'  
                }`}  
              >  
                {link.label}  
              </Link>  
            ))}  
            {user ? (  
              <div className="flex items-center gap-4">  
                <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>  
                <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 flex items-center gap-1">  
                  <LogOut className="w-4 h-4" /> Salir  
                </button>  
              </div>  
            ) : (  
              <Link to="/login" className="text-blue-600 hover:underline">Iniciar Sesión</Link>  
            )}  
          </nav>  

          <div className="flex items-center gap-4">  
            <motion.button  
              className="hidden md:flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"  
              onClick={() => window.open('https://wa.me/549123456789', '_blank')}  
              whileHover={{ scale: 1.05 }}  
            >  
              <Phone className="w-4 h-4" />  
              WhatsApp  
            </motion.button>  

            <motion.button  
              className="p-2 md:hidden"  
              onClick={() => setIsMenuOpen(!isMenuOpen)}  
              whileTap={{ scale: 0.95 }}  
            >  
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}  
            </motion.button>  
          </div>  
        </div>  

        {isMenuOpen && (  
          <motion.div  
            initial={{ opacity: 0, height: 0 }}  
            animate={{ opacity: 1, height: 'auto' }}  
            className="md:hidden mt-4 space-y-2"  
          >  
            {navLinks.map((link) => (  
              <Link  
                key={link.to}  
                to={link.to}  
                className="block py-2 text-gray-700 hover:text-blue-600"  
                onClick={() => setIsMenuOpen(false)}  
              >  
                {link.label}  
              </Link>  
            ))}  
            {user ? (  
              <>  
                <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>  
                <button onClick={handleLogout} className="block py-2 text-left text-gray-700 hover:text-blue-600 w-full">Salir</button>  
              </>  
            ) : (  
              <Link to="/login" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</Link>  
            )}  
          </motion.div>  
        )}  
      </div>  
    </motion.header>  
  )  
}  

export default Header