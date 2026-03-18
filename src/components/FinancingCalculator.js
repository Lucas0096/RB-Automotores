import React, { useState } from 'react'  
import { motion } from 'framer-motion'  
import { Calculator, DollarSign } from 'lucide-react'  

const FinancingCalculator = ({ price }) => {  
  const [loanAmount, setLoanAmount] = useState(price * 0.8)  
  const [interestRate, setInterestRate] = useState(12)  
  const [months, setMonths] = useState(48)  

  const calculatePayment = () => {  
    const principal = loanAmount  
    const monthlyRate = interestRate / 100 / 12  
    const numPayments = months  
    if (monthlyRate === 0) return principal / numPayments  
    return principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1)  
  }  

  const monthlyPayment = calculatePayment()  

  return (  
    <motion.div  
      initial={{ opacity: 0, y: 20 }}  
      whileInView={{ opacity: 1, y: 0 }}  
      className="bg-white rounded-3xl p-6 shadow-xl mb-8"  
    >  
      <div className="flex items-center gap-3 mb-6">  
        <Calculator className="w-6 h-6 text-blue-600" />  
        <h3 className="text-xl font-bold text-gray-900">Calculadora de Financiamiento</h3>  
      </div>  

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">  
        <div>  
          <label className="block text-sm font-medium text-gray-700 mb-2">Monto del préstamo</label>  
          <div className="relative">  
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />  
            <input  
              type="number"  
              value={loanAmount}  
              onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}  
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
            />  
          </div>  
        </div>  

        <div>  
          <label className="block text-sm font-medium text-gray-700 mb-2">Tasa de interés (%)</label>  
          <input  
            type="number"  
            value={interestRate}  
            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}  
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
          />  
        </div>  

        <div>  
          <label className="block text-sm font-medium text-gray-700 mb-2">Plazo (meses)</label>  
          <select  
            value={months}  
            onChange={(e) => setMonths(parseInt(e.target.value))}  
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
          >  
            {[12, 24, 36, 48, 60].map((m) => (  
              <option key={m} value={m}>{m} meses</option>  
            ))}  
          </select>  
        </div>  
      </div>  

      <div className="bg-gray-50 rounded-2xl p-4 text-center">  
        <p className="text-3xl font-bold text-green-600 mb-1">Cuota mensual</p>  
        <p className="text-xl text-gray-600">${monthlyPayment.toFixed(0)}</p>  
      </div>  

      <motion.button  
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"  
        whileHover={{ scale: 1.02 }}  
        whileTap={{ scale: 0.98 }}  
      >  
        Solicitar Financiamiento  
      </motion.button>  
    </motion.div>  
  )  
}  

export default FinancingCalculator