import { Link } from "react-router-dom";
import Tenis2 from "../assets/png/rapida.png";
import Tenis3 from "../assets/png/tenis3.jpg";
import Tenis4 from "../assets/png/tenis.png";

export default function FeaturedProducts() {
  return (
    <div className="bg-gray-50 text-gray-900"> <br></br>
      {/* HERO */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <img
          src={Tenis3}
          alt="Hero"
          className="absolute w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Bienvenido al Club de Tenis Roquetes (FER PAGINA DE APUNTAR RESULTADOS)</h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8">
            Reserva tu pista, sigue la clasificación y contacta con nosotros. Todo en un solo lugar.
          </p>
          <Link to="/reservar">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg rounded-xl shadow-xl transition">
              Reservar ahora
            </button>
          </Link>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-32">
        {/* Sección Reservar */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img
            src={Tenis4}
            alt="Reserva"
            className="rounded-3xl shadow-xl w-full h-full object-cover"
          />
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-blue-700">Reserva tu pista</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Accede fácilmente al sistema de reservas. Selecciona tu pista, elige la hora y confirma en segundos. Jugar al tenis nunca fue tan simple.
            </p>
            <Link to="/reservar"> <br></br>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition shadow-md">
                Reservar ahora
              </button>
            </Link>
          </div>
        </div>

        {/* Sección Clasificación */}
        <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
          <img
            src={Tenis2}
            alt="Clasificación"
            className="rounded-3xl shadow-xl w-full h-full object-cover"
          />
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-green-700">Clasificación actualizada</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Consulta el ranking de jugadores actualizado cada 72 horas. Sigue tu progreso y el de tus rivales en tiempo real.
            </p>
            <Link to="/clasificaciones"> <br></br>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition shadow-md">
                Ver clasificación
              </button>
            </Link>
          </div>
        </div>

        {/* Sección Contacto */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img
            src={Tenis3}
            alt="Contacto"
            className="rounded-3xl shadow-xl w-full h-full object-cover"
          />
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-neutral-800">¿Tienes dudas o sugerencias?</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Contacta con nuestro equipo para cualquier consulta, sugerencia o ayuda que necesites. Estamos aquí para ti.
            </p>
            <Link to="/contacto"> <br></br>
              <button className="bg-neutral-800 hover:bg-black text-white px-6 py-3 rounded-lg transition shadow-md">
                Contactar
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
