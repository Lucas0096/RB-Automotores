import React, { useState } from 'react'  
import { motion } from 'framer-motion'  
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'  

const ImageGallery = ({ media }) => {  
  const [currentIndex, setCurrentIndex] = useState(0)  
  const [isVideo, setIsVideo] = useState(false)  

  const images = media.filter(m => m.media_type === 'image')  
  const videos = media.filter(m => m.media_type === 'video')  

  if (images.length === 0 && videos.length === 0) {  
    return <div className="w-full h-64 bg-gray-200 rounded-2xl flex items-center justify-center">Sin imágenes disponibles</div>  
  }  

  const nextSlide = () => {  
    setCurrentIndex((prev) => (prev + 1) % images.length)  
  }  

  const prevSlide = () => {  
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)  
  }  

  return (  
    <div className="relative">  
      <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-lg">  
        {videos[0] && !isVideo && (  
          <button  
            onClick={() => setIsVideo(true)}  
            className="absolute inset-0 flex items-center justify-center bg-black/20 z-10"  
          >  
            <Play className="w-16 h-16 text-white" />  
          </button>  
        )}  
        {isVideo && videos[0] ? (  
          <video  
            src={videos[0].media_url}  
            controls  
            className="w-full h-full object-cover"  
            onEnded={() => setIsVideo(false)}  
          />  
        ) : (  
          <motion.img  
            key={currentIndex}  
            src={images[currentIndex]?.media_url}  
            alt="Vehículo"  
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"  
            initial={{ scale: 1 }}  
            whileHover={{ scale: 1.05 }}  
          />  
        )}  
      </div>  

      {images.length > 1 && !isVideo && (  
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">  
          {images.map((_, index) => (  
            <button  
              key={index}  
              onClick={() => setCurrentIndex(index)}  
              className={`w-3 h-3 rounded-full transition-colors ${  
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'  
              }`}  
            />  
          ))}  
        </div>  
      )}  

      {images.length > 1 && !isVideo && (  
        <>  
          <button  
            onClick={prevSlide}  
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"  
          >  
            <ChevronLeft className="w-6 h-6" />  
          </button>  
          <button  
            onClick={nextSlide}  
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"  
          >  
            <ChevronRight className="w-6 h-6" />  
          </button>  
        </>  
      )}  
    </div>  
  )  
}  

export default ImageGallery