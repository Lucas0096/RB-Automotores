import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Página no encontrada</h1>
      <p className="text-slate-600 mb-6">
        La ruta que intentaste abrir no existe o todavía no fue creada.
      </p>
      <Link
        to="/"
        className="inline-flex rounded-xl bg-slate-900 px-4 py-3 text-white hover:bg-slate-800"
      >
        Volver al inicio
      </Link>
    </div>
  );
}