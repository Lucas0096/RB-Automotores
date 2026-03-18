import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import VehicleGrid from "../components/VehicleGrid";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [recentVehicles, setRecentVehicles] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setDbError("");

      const [featuredRes, recentRes, testimonialsRes, allVehiclesRes] =
        await Promise.all([
          supabase
            .from("vehicles")
            .select("*")
            .eq("status", "published")
            .eq("is_featured", true)
            .limit(4),

          supabase
            .from("vehicles")
            .select("*")
            .eq("status", "published")
            .order("created_at", { ascending: false })
            .limit(4),

          supabase.from("testimonials").select("*").limit(3),

          supabase
            .from("vehicles")
            .select("*")
            .eq("status", "published")
            .order("created_at", { ascending: false }),
        ]);

      const errors = [
        featuredRes.error,
        recentRes.error,
        testimonialsRes.error,
        allVehiclesRes.error,
      ].filter(Boolean);

      if (errors.length > 0) {
        console.error("Errores de Supabase:", errors);
        setDbError(
          "No se pudieron cargar algunos datos. Revisá que las tablas existan en Supabase."
        );
      }

      setFeaturedVehicles(featuredRes.data || []);
      setRecentVehicles(recentRes.data || []);
      setTestimonials(testimonialsRes.data || []);
      setVehicles(allVehiclesRes.data || []);
    } catch (error) {
      console.error(error);
      setDbError("Ocurrió un error cargando la información del sitio.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async (filters = {}) => {
    try {
      let query = supabase
        .from("vehicles")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (filters.maxPrice) {
        query = query.lte("price", parseFloat(filters.maxPrice));
      }

      if (filters.location) {
        query = query.eq("location", filters.location);
      }

      if (filters.searchTerm) {
        query = query.ilike("title", `%${filters.searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
        setDbError(
          "No se pudieron filtrar los vehículos. Revisá la estructura de la base."
        );
        return;
      }

      setVehicles(data || []);
    } catch (error) {
      console.error(error);
      setDbError("Error inesperado filtrando vehículos.");
    }
  };

  return (
    <div>
      <HeroSection />
      <SearchBar onSearch={fetchVehicles} />

      <section className="max-w-7xl mx-auto px-4 py-8">
        {dbError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {dbError}
          </div>
        )}

        {loading ? (
          <p className="text-slate-600">Cargando vehículos...</p>
        ) : (
          <>
            {featuredVehicles.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Vehículos Destacados</h2>
                <VehicleGrid vehicles={featuredVehicles} />
              </>
            )}

            {recentVehicles.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mt-10 mb-4">
                  Recientemente Publicados
                </h2>
                <VehicleGrid vehicles={recentVehicles} />
              </>
            )}

            <h2 className="text-2xl font-bold mt-10 mb-4">Todos los Vehículos</h2>
            <VehicleGrid vehicles={vehicles} />

            {testimonials.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">
                  Lo que dicen nuestros clientes
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="rounded-2xl border p-5 shadow-sm bg-white"
                    >
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-slate-500 mb-2">
                        {testimonial.rating}/5
                      </p>
                      <p className="text-slate-600">“{testimonial.message}”</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;