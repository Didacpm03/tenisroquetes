import React from 'react';

const FeaturedInfoSection: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Intro Text */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900">Nuestra Historia</h2>
          <p className="mt-4 text-lg text-gray-600">
            Una mirada al pasado, al esfuerzo compartido y a los pasos que nos han traído hasta aquí. 
            Esta promoción no es solo un grupo, es una familia con historias únicas y recuerdos imborrables.
          </p>
        </div>

        {/* Bloque 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src="/assets/png/foto1.png"
            alt="Historia"
            className="w-full h-auto rounded-xl shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Orígenes humildes</h3>
            <p className="text-gray-600 text-lg">
              Comenzamos este viaje con ilusión, incertidumbre y muchas ganas de aprender. 
              Cada paso en la UPC Vilanova I la Geltrú ha sido un peldaño hacia el futuro.
            </p>
          </div>
        </div>

        {/* Bloque 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
          <img
            src="/assets/png/foto2.png"
            alt="Valores"
            className="w-full h-auto rounded-xl shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Valores que nos unen</h3>
            <p className="text-gray-600 text-lg">
              Amistad, esfuerzo, compañerismo. Son más que palabras: son las bases de cada proyecto, 
              cada clase, y cada momento que compartimos.
            </p>
          </div>
        </div>

        {/* Bloque 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src="/assets/png/foto3.png"
            alt="Futuro"
            className="w-full h-auto rounded-xl shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mirando al futuro</h3>
            <p className="text-gray-600 text-lg">
              Cada uno tomará un camino distinto, pero llevaremos con nosotros todo lo vivido. 
              Esta no es una despedida, es el principio de nuevas historias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedInfoSection;
