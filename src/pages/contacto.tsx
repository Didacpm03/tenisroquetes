import React from 'react';
import Navbar from '../components/Navbar';
import foto2 from '../assets/png/tenis.png';
const Contacto: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div
        className="flex-1 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${foto2})` }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded-2xl shadow-2xl max-w-3xl w-full text-center space-y-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            <span className="text-white">Contáctanos</span>{' '}
            <span className="text-orange-400">hoy mismo</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
            {/* Teléfono */}
            <div className="flex flex-col items-center space-y-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 5.25C2.25 4.01 3.26 3 4.5 3h2.25c.58 0 1.09.33 1.33.84l1.12 2.25a1.5 1.5 0 01-.34 1.75L7.5 9.75a12.005 12.005 0 006.75 6.75l1.91-1.36a1.5 1.5 0 011.75-.34l2.25 1.12c.51.25.84.75.84 1.33V19.5c0 1.24-.99 2.25-2.25 2.25H19C9.163 21.75 2.25 14.837 2.25 7.5V5.25z" />
              </svg>
              <p className="text-xl font-semibold">+34 669 344 430</p>
              <p className="text-sm text-gray-300">Teléfono directo</p>
            </div>

            {/* WhatsApp Chat 1 */}
            <div className="flex flex-col items-center space-y-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h7.5m-7.5 3h4.5m-1.264 6.615a8.25 8.25 0 111.264-14.865 8.25 8.25 0 01-1.264 14.865z" />
              </svg>
              <p className="text-xl font-semibold">+34 669 344 430</p>
              <p className="text-sm text-gray-300">Contacta con Darío</p>
            </div>

            {/* WhatsApp Chat 2 */}
            <div className="flex flex-col items-center space-y-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h7.5m-7.5 3h4.5m-1.264 6.615a8.25 8.25 0 111.264-14.865 8.25 8.25 0 01-1.264 14.865z" />
              </svg>
              <p className="text-xl font-semibold">+34 609 494 339</p>
              <p className="text-sm text-gray-300">Contacta con Didac para cualquier problema/duda relacionada con la web</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;

