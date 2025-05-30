// src/pages/EditorZapatilla.tsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import airmaxImg from '../png/zapas.png';
import superstarImg from '../png/zapas.png';
import jordanImg from '../png/zapas.png';
import pumaImg from '../png/zapas.png';
import reebokImg from '../png/zapas.png';
import newbalanceImg from '../png/zapas.png';

const zapatillasData: Record<string, { nombre: string; imagen: string }> = {
  airmax: { nombre: 'Air Max', imagen: airmaxImg },
  superstar: { nombre: 'Superstar', imagen: superstarImg },
  jordan: { nombre: 'Air Jordan', imagen: jordanImg },
  puma: { nombre: 'Puma Runner', imagen: pumaImg },
  reebok: { nombre: 'Reebok Classic', imagen: reebokImg },
  newbalance: { nombre: 'New Balance 550', imagen: newbalanceImg },
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function EditorZapatilla() {
  const query = useQuery();
  const id = query.get('id') || '';

  const [nombre, setNombre] = useState('');
  const [colorBase, setColorBase] = useState('#ffffff');
  const [colorDetalle, setColorDetalle] = useState('#000000');
  const [pegatina, setPegatina] = useState('🔥');

  const data = zapatillasData[id];

  if (!data)
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onCartClick={() => {}} />
        <main className="p-6 flex-grow">
          <p className="text-center text-red-600 font-semibold">Zapatilla no encontrada.</p>
        </main>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => {}} />

      <main className="flex-grow p-6 flex flex-col md:flex-row-reverse gap-6 bg-gray-100">
        {/* Editor */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{data.nombre}</h1>

          <div>
            <label className="font-semibold">Nombre (aparece en el lateral)</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={12}
              className="w-full border rounded-md p-2 mt-1"
              placeholder="Escribe nombre para la zapatilla"
            />
          </div>

          <div>
            <label className="font-semibold">Color base</label>
            <input
              type="color"
              value={colorBase}
              onChange={(e) => setColorBase(e.target.value)}
              className="w-16 h-10 border rounded ml-2"
            />
          </div>

          <div>
            <label className="font-semibold">Color detalle</label>
            <input
              type="color"
              value={colorDetalle}
              onChange={(e) => setColorDetalle(e.target.value)}
              className="w-16 h-10 border rounded ml-2"
            />
          </div>

          <div>
            <label className="font-semibold">Pegatina</label>
            <select
              value={pegatina}
              onChange={(e) => setPegatina(e.target.value)}
              className="w-full border rounded-md p-2 mt-1"
            >
              <option>🔥</option>
              <option>⭐</option>
              <option>💀</option>
              <option>🛹</option>
              <option>🎮</option>
            </select>
          </div>
        </div>

        {/* Vista previa */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div
            className="relative w-[300px] h-[300px] rounded-2xl shadow-xl"
            style={{ backgroundColor: colorBase }}
          >
            <img
              src={data.imagen}
              alt="preview"
              className="absolute inset-0 object-contain w-full h-full opacity-80"
              style={{ mixBlendMode: 'multiply' }}
            />
            {/* Nombre sobre la zapatilla */}
            <span
              className="absolute top-1/2 left-10 transform -translate-y-1/2 text-2xl font-bold select-none"
              style={{ color: colorDetalle, textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}
            >
              {nombre.trim() !== '' ? nombre : data.nombre}
            </span>
            {/* Pegatina */}
            <span className="absolute top-4 right-4 text-3xl select-none">{pegatina}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
