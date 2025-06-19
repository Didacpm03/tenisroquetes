import React from 'react';
import Navbar from '../components/Navbar';
import foto2 from '../assets/png/tenis.png';

const Contacto: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />

      <div
        className="flex-1 bg-cover bg-center flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: `url(${foto2})` }}
      >
        {/* Efecto de partículas futuristas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400 animate-pulse"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="relative bg-black bg-opacity-80 p-8 md:p-12 rounded-2xl shadow-2xl max-w-4xl w-full text-center space-y-10 border border-cyan-400/20 backdrop-blur-sm hover:shadow-[0_0_30px_#00f0ff30] transition-all duration-500">
          {/* Efecto de borde futurista */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 blur-md animate-gradient-shift"></div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-100 mb-2 relative drop-shadow-[0_0_8px_#00f0ff]">
            CONTÁCTANOS
          </h1>

          <p className="text-cyan-300 font-mono tracking-wider text-sm md:text-base">
            Estamos aquí para ayudarte en cualquier momento
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teléfono */}
            <div className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/80 p-6 rounded-xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_#00f0ff20]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 5.25C2.25 4.01 3.26 3 4.5 3h2.25c.58 0 1.09.33 1.33.84l1.12 2.25a1.5 1.5 0 01-.34 1.75L7.5 9.75a12.005 12.005 0 006.75 6.75l1.91-1.36a1.5 1.5 0 011.75-.34l2.25 1.12c.51.25.84.75.84 1.33V19.5c0 1.24-.99 2.25-2.25 2.25H19C9.163 21.75 2.25 14.837 2.25 7.5V5.25z" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">938 143 104</p>
                <p className="text-sm text-gray-400 font-mono">Teléfono directo</p>
              </div>
            </div>

            {/* WhatsApp Chat 1 */}
            <div className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/80 p-6 rounded-xl border border-gray-700 hover:border-green-400/50 transition-all duration-300 hover:shadow-[0_0_20px_#00ff8820]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors">669 344 430</p>
                <p className="text-sm text-gray-400 font-mono">Contacta con Darío</p>
              </div>
            </div>

            {/* WhatsApp Chat 2 */}
            <div className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/80 p-6 rounded-xl border border-gray-700 hover:border-green-400/50 transition-all duration-300 hover:shadow-[0_0_20px_#00ff8820]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors">609 494 339</p>
                <p className="text-sm text-gray-400 font-mono">Soporte técnico web - Preguntar por Didac</p>
              </div>
            </div>
          </div>

          {/* Efecto de conexión futurista */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40 blur-md"></div>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default Contacto;