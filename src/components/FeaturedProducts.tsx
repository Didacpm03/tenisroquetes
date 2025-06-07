import { Link } from "react-router-dom";
import Tenis2 from "../assets/png/rapida.png";
import Tenis3 from "../assets/png/tenis3.jpg";
import Tenis4 from "../assets/png/tenis.png";

export default function FeaturedProducts() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white">
      {/* HERO SECTION - Clay Court Aesthetic */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black bg-opacity-40"></div>
        <img
          src={Tenis3}
          alt="Hero"
          className="absolute w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
            Club de Tennis Roquetes
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10 text-gray-200 font-light drop-shadow">
            La nueva era del tenis. Reservas inteligentes, estadísticas en tiempo real y experiencia premium.
          </p>
          <Link to="/reservar">
            <button className="relative overflow-hidden group border-2 border-orange-500 hover:border-orange-400 px-10 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 bg-black bg-opacity-30">
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center text-white">
                Reservar ahora
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </section>

      {/* MAIN CONTENT - Modern Card Design */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-32">
        {/* Sección Reservar */}
        <div className="grid md:grid-cols-2 gap-16 items-center group">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
            <img
              src={Tenis4}
              alt="Reserva"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              Reserva inteligente
            </h2>
            <p className="text-lg leading-relaxed text-white">
              Nuestro sistema de reservas con IA te sugiere los mejores horarios según tu historial.
              Selección instantánea con confirmación en tiempo real mediante blockchain.
            </p> <br></br>
            <Link to="/reservar">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <span>Reservar ahora</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Sección Clasificación */}
        <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse group">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
            <img
              src={Tenis2}
              alt="Clasificación"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
              Estadísticas en vivo
            </h2>
            <p className="text-lg leading-relaxed text-white">
              Dashboard interactivo con análisis avanzado de tu rendimiento.
              Comparativas con otros jugadores y predicciones de tu próxima posición en el ranking.
            </p><br></br>
            <Link to="/clasificaciones">
              <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <span>Ver estadísticas</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Sección Contacto */}
        <div className="grid md:grid-cols-2 gap-16 items-center group">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
            <img
              src={Tenis3}
              alt="Contacto"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
              Soporte premium
            </h2>
            <p className="text-lg leading-relaxed text-white">
              Chatbot con inteligencia artificial disponible 24/7.
              También puedes programar videollamadas con nuestros expertos en tenis.
            </p><br></br>
            <Link to="/contacto">
              <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <span>Contactar ahora</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}