import React from "react";

export default function Financiamiento() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Financiamiento</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-3">Préstamos prendarios</h2>
          <p className="text-slate-600 mb-4">
            Te ayudamos a encontrar la mejor opción de financiación para tu
            próximo vehículo. Trabajamos para vincular al cliente con entidades
            bancarias y opciones de crédito.
          </p>
          <ul className="list-disc pl-5 text-slate-600 space-y-2">
            <li>Simulación de cuotas</li>
            <li>Asesoramiento personalizado</li>
            <li>Gestoría incluida</li>
          </ul>
        </div>

        <div className="rounded-2xl border p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-3">¿Cómo funciona?</h2>
          <ol className="list-decimal pl-5 text-slate-600 space-y-2">
            <li>Elegís el vehículo.</li>
            <li>Analizamos tu perfil y opciones disponibles.</li>
            <li>Te presentamos alternativas de financiación.</li>
            <li>Avanzamos con la operación y la gestoría.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}