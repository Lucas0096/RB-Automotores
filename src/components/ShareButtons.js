import React from 'react'  
import { motion } from 'framer-motion'  
import { Share2, MessageCircle, Heart } from 'lucide-react'  

const ShareButtons = ({ vehicle }) => {  
  const shareWhatsApp = () => {  
    const message = `¡Mira este auto genial! ${vehicle.title} - ${vehicle.price} ARS ${window.location.href}`  
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')  
  }  

  const shareInstagram = () => {  
    window.open(`https://www.instagram.com/`, '_blank')  
  }  

  const shareFacebook = () => {  
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')  
  }  

  return (  
    <div className="flex items-center gap-4 mb-6">  
      <h4 className="text-lg font-semibold text-gray-900">Comparte esta joya</h4>  
      <motion.div className="flex gap-3 ml-auto" whileHover={{ scale: 1.05 }}>  
        <button onClick={shareWhatsApp} className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center gap-2">  
          <MessageCircle className="w-5 h-5" />  
          WhatsApp  
        </button>  
        <button onClick={shareFacebook} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2">  
          <Heart className="w-5 h-5" />  
          Facebook  
        </button>  
        <button onClick={shareInstagram} className="p-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 flex items-center gap-2">  
          <Share2 className="w-5 h-5" />  
          Instagram  
        </button>  
      </motion.div>  
    </div>  
  )  
}  

export default ShareButtons