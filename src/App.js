import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import VehicleDetail from "./pages/VehicleDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Financiamiento from "./pages/Financiamiento";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-slate-900">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Home />} />
            <Route path="/vehicles/:id" element={<VehicleDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/financiamiento" element={<Financiamiento />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;