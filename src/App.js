import React from 'react'  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'  
import { motion } from 'framer-motion'  
import Header from './components/Header'  
import Home from './pages/Home'  
import VehicleDetail from './pages/VehicleDetail'  
import Login from './pages/Login'  
import Dashboard from './pages/Dashboard'  
import AdminDashboard from './pages/AdminDashboard'  

function App() {  
  return (  
    <Router>  
      <div className="App">  
        <Header />  
        <Routes>  
          <Route path="/" element={  
            <motion.main  
              initial="initial"  
              animate="animate"  
              variants={{  
                initial: { opacity: 0 },  
                animate: { opacity: 1 }  
              }}  
              transition={{ duration: 0.6 }}  
            >  
              <Home />  
            </motion.main>  
          } />  
          <Route path="/vehicle/:id" element={<VehicleDetail />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/dashboard" element={<Dashboard />} />  
          <Route path="/admin" element={<AdminDashboard />} />  
        </Routes>  
      </div>  
    </Router>  
  )  
}  

export default App