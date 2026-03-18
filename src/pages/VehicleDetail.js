import React, { useState, useEffect } from 'react'  
import { useParams } from 'react-router-dom'  
import { supabase } from '../supabaseClient'  
import { motion } from 'framer-motion'  
import { Phone, MapPin, Calendar, DollarSign, Check, AlertCircle } from 'lucide-react'  
import ImageGallery from '../components/ImageGallery'  
import FinancingCalculator from '../components/FinancingCalculator'  
import ShareButtons from '../components/ShareButtons'  

const VehicleDetail = () => {  
  const { id } = useParams()  
  const [vehicle, setVehicle] = useState(null)  
  const [media, setMedia] = useState([])  
  const [features, setFeatures] = useState([])  
  const [loading, setLoading] = useState(true)  
  const [reservationSent, setReservationSent] = useState(false)  

  useEffect(() => {  
    fetchVehicle()  
  }, [id])  

  const fetchVehicle = async () => {  
    setLoading(true)  
    const { data: vehicleData, error: vehicleError } = await supabase  
      .from('vehicles')  
      .select(`*, brands(name), models(name), sellers(name)`)  
      .eq('id', id)  
      .single()  

    if (!vehicleError && vehicleData) {  
      setVehicle(vehicleData)  

      const { data: mediaData } = await supabase  
        .from('vehicle_media')  
        .select('*')  
        .eq('vehicle_id', id)  
        .order('order_index')  

      const { data: featuresData } = await supabase  
        .from('vehicle_features')  
        .select('feature_key, feature_value')  
        .eq('vehicle_id', id)  

      setMedia(mediaData || [])  
      setFeatures(featuresData || [])  
    }  

    setLoading(false)  
  }  

  const handleWhatsApp = () => {  
    const message = `Hola, estoy interesado en este vehículo: ${vehicle.title} - ${vehicle.brands.name} ${vehicle.models.name} ${vehicle.year} (${window.location.href})`  
    window.open(`https://wa.me/549123456789?text=${encodeURIComponent(message)}`, '_blank')  
  }  

  const handleReserve = async () => {  
    const { error } = await supabase  
      .from('inquiries')  
      .insert({  
        vehicle_id: id,  
        message: 'Quiero reservar/señar este vehículo',  
        contact_method: 'whatsapp'  
      })  

    if (!error) {  
      setReservationSent(true)  
      handleWhatsApp()  
    }  
  }  

  const formatPrice = (price) => {  
    return new Intl.NumberFormat('es-AR', {  
      style: 'currency',  
      currency: 'ARS'  
    }).format(price)  
  }  

  if (loading) {  
    return <div className="py-20 text-center">Cargando...</div>  
  }  

  if (!vehicle) {  
    return <div className="py-20 text-center">Vehículo no encontrado</div>  
  }  

  return (  
    <div className="min-h-screen bg-gray-50 py-8">  
      <div className="container mx-auto px-4 max-w-6xl">  
        <motion.button  
          onClick={() => window.history.back()}  
          className="mb-6 text-blue-600 hover:underline flex items-center gap-2"  
          whileHover={{ scale: 1.05 }}  
        >  
          ← Volver  
        </motion.button>  

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">  
          <ImageGallery media={media} />  

          <div className="space-y-6">  
            <h1 className="text-3xl font-bold text-gray-900">{vehicle.title}</h1>  

            <div className="bg-white rounded-2xl p-6 shadow-md">  
              <div className="flex items-center justify-between mb-4">  
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${  
                  vehicle.status === 'available' ? 'bg-green-100 text-green-800' :  
                  vehicle.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'  
                }`}>  
                  {vehicle.status === 'available' ? 'Disponible' : vehicle.status === 'reserved' ? 'Reservado' : 'Vendido'}  
                </span>  
                <span className="text-4xl font-bold text-blue-600">{formatPrice(vehicle.price)}</span>  
              </div>  

              <div className="grid grid-cols-2 gap-4 text-sm">  
                <div className="flex items-center gap-2">  
                  <Calendar className="w-4 h-4 text-gray-500" />  
                  <span>{vehicle.year}</span>  
                </div>  
                <div className="flex items-center gap-2">  
                  <span>{vehicle.mileage.toLocaleString()} km</span>  
                </div>  
                <div className="flex items-center gap-2">  
                  <MapPin className="w-4 h-4 text-gray-500" />  
                  <span>{vehicle.location}</span>  
                </div>  
                {vehicle.is_new && (  
                  <div className="flex items-center gap-2">  
                    <Check className="w-4 h-4 text-green-500" />  
                    <span>0 KM</span>  
                  </div>  
                )}  
              </div>  
            </div>  

            <ShareButtons vehicle={vehicle} />  

            <div className="flex gap-4">  
              <motion.button  
                onClick={handleWhatsApp}  
                className="flex-1 bg-green-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-600"  
                whileHover={{ scale: 1.05 }}  
                whileTap={{ scale: 0.95 }}  
              >  
                <Phone className="w-5 h-5" />  
                Contactar por WhatsApp  
              </motion.button>  

              <motion.button  
                onClick={handleReserve}  
                disabled={vehicle.status !== 'available' || reservationSent}  
                className={`flex-1 py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 ${  
                  vehicle.status !== 'available' || reservationSent  
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'  
                    : 'bg-blue-600 text-white hover:bg-blue-700'  
                }`}  
                whileHover={vehicle.status === 'available' && !reservationSent ? { scale: 1.05 } : {}}  
                whileTap={vehicle.status === 'available' && !reservationSent ? { scale: 0.95 } : {}}  
              >  
                {reservationSent ? '¡Enviado!' : 'Reservar / Señalar'}  
              </motion.button>  
            </div>  
          </div>  
        </div>  

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">  
          <div className="lg:col-span-2 space-y-6">  
            <section className="bg-white rounded-2xl p-6 shadow-md">  
              <h2 className="text-2xl font-bold mb-4">Descripción</h2>  
              <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>  
            </section>  

            {features.length > 0 && (  
              <section className="bg-white rounded-2xl p-6 shadow-md">  
                <h2 className="text-2xl font-bold mb-4">Especificaciones</h2>  
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">  
                  {features.map((feature) => (  
                    <div key={feature.feature_key} className="flex items-center gap-2">  
                      <Check className="w-5 h-5 text-green-500" />  
                      <span>{feature.feature_key.replace(/_/g, ' ')}</span>  
                    </div>  
                  ))}  
                </div>  
              </section>  
            )}  

            <section className="bg-white rounded-2xl p-6 shadow-md">  
              <h2 className="text-2xl font-bold mb-4">Ubicación</h2>  
              <div className="relative w-full h-64 rounded-2xl overflow-hidden">  
                <iframe  
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.0${vehicle.latitude && vehicle.longitude ? `!2d${vehicle.longitude}!3d${vehicle.latitude}` : ''}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${vehicle.latitude || ''}%2C${vehicle.longitude || ''}!5e0!3m2!1ses!2sar!4v1${Date.now()}`}  
                  width="100%"  
                  height="100%"  
                  style={{ border: 0 }}  
                  allowFullScreen=""  
                  loading="lazy"  
                  referrerPolicy="no-referrer-when-downgrade"  
                  title="Mapa"  
                />  
              </div>  
              <p className="text-gray-600 mt-4">Gestoría incluida en la compra. Entrega en {vehicle.location}.</p>  
            </section>  
          </div>  

          <div className="space-y-6">  
            <FinancingCalculator price={vehicle.price} />  

            <div className="bg-white rounded-2xl p-6 shadow-md">  
              <h3 className="text-lg font-bold mb-4">Vendedor</h3>  
              <p className="text-gray-700">{vehicle.sellers?.name || 'AutoElite Agencia'}</p>  
              <motion.button  
                className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl hover:bg-green-600"  
                whileHover={{ scale: 1.02 }}  
                onClick={handleWhatsApp}  
              >  
                Contactar Vendedor  
              </motion.button>  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  )  
}  

export default VehicleDetail