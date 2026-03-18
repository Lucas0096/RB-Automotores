import React from "react";

export default function Contacto() {
  const phone = "549123456789";
  const message = encodeURIComponent(
    "Hola, quiero consultar por un vehículo publicado en RB Automotores."
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-3">Hablemos</h2>
          <p className="text-slate-600 mb-4">
            Contactanos para consultar disponibilidad, financiación, reserva o
            coordinar una visita.
          </p>

          <a
            href={`https://wa.me/${phone}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-xl bg-green-600 px-4 py-3 text-white font-medium hover:bg-green-700"
          >
            Escribir por WhatsApp
          </a>
        </div>

        <div className="rounded-2xl border p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-3">Ubicación</h2>
          <p className="text-slate-600">
            Agregá acá la dirección real de la agencia y el mapa cuando lo
            definas.
          </p>
        </div>
      </div>
    </div>
  );
}