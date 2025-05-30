import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

import cordones from '../png/cordones_2.png';
import offwhite from '../png/offwhite.png';
import gorrasupreme from '../png/gorrasupreme.png';
import camisetajordan from '../png/camisetajordan.png';
import mochilanike from '../png/mochilanike.png';
import botella from '../png/botella.png';
import muñequera from '../png/muñequeras.png'
import botasfutbol from '../png/botasfutbol.png';
import backtothefuture from '../png/backtothefuture.png'
import mujerzapas from '../png/mujerzapas.png'
import gorrajordan from '../png/gorrajordan.png'
import botasdos from '../png/botasdos.png'
import adidasxds from '../png/adidasxds.png'
import nikebasicas from '../png/nikebasicas.png'

const ComprarProducto = () => {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || 'null');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const productList = [
    { name: 'Cordones Nike', description: 'Cordones de alta calidad.', price: 30, image: cordones, discountPrice: 40, requiredPlan: 'Free' },
    { name: 'Camiseta Jordan', description: '100% algodón.', price: 50, image: camisetajordan, requiredPlan: 'Free' },
    { name: 'Mochila Nike', description: 'Espaciosa y cómoda.', price: 70, image: mochilanike, requiredPlan: 'Free' },
    { name: 'Muñequeras Air', description: 'Muñequeras', price: 15, image: muñequera, requiredPlan: 'Free' },
    { name: 'Botella deportiva', description: 'Botella Nike.', price: 20, image: botella, requiredPlan: 'Free' },

    { name: 'Nike Air Force 1,07 LX', description: 'Edición limitada.', price: 129, image: mujerzapas, requiredPlan: 'Plan Start' },
    { name: 'Gorra Supreme', description: 'Estilo urbano.', price: 50, image: gorrasupreme, requiredPlan: 'Plan Start' },
    { name: 'Nike Air Mercurial', description: 'Rendimiento y estabilidad.', price: 290, image: botasdos, requiredPlan: 'Plan Start' },
    { name: 'Gorra Jordan', description: 'Edición urbana exclusiva.', price: 32, image: gorrajordan, requiredPlan: 'Plan Start' },
    { name: 'Bolsa Gym Flex', description: 'Compacta y resistente.', price: 40, image: mochilanike, requiredPlan: 'Plan Start' },

    { name: 'Zapatillas Off-White', description: 'Edición limitada.', price: 320, image: offwhite, requiredPlan: 'Plan Premium' },
    { name: 'Adidas Adizero PRO', description: 'Seguimiento fitness y estilo.', price: 500, image: adidasxds, requiredPlan: 'Plan Premium' },
    { name: 'Zapatilla Nike Air Force', description: 'Visión HD y protección UV.', price: 110, image: nikebasicas, requiredPlan: 'Plan Premium' },

    { name: 'Nike Mercurial Superfly 10', description: 'Sólo para leyendas. Edición ultra limitada.', price: 309, image: botasfutbol, requiredPlan: 'Plan Leyenda', topProduct: true },
    { name: 'Nike Air Max 90 Future', description: 'Moda del futuro, hoy.', price: 12.5, image: backtothefuture, requiredPlan: 'Plan Leyenda', topProduct: true },
  ];

  const planOrder = ['Free', 'Plan Start', 'Plan Premium', 'Plan Leyenda'];
  const userPlan = loggedUser?.subscription || 'Free';

  const canAccessProduct = (product: any) => {
    const userIndex = planOrder.indexOf(userPlan);
    const productIndex = planOrder.indexOf(product.requiredPlan);
    if (product.topProduct) return userPlan === 'Plan Leyenda';
    return userIndex >= productIndex;
  };

  const handleAddToCart = (product: any) => {
    const existing = JSON.parse(localStorage.getItem('cart') || '[]');
    const updated = [...existing, product];
    localStorage.setItem('cart', JSON.stringify(updated));
    setSuccessMessage('✅ Producto añadido a la cesta');
  };

  // Separar productos Leyenda para centrarlos
  const leyendaProducts = productList.filter(p => p.requiredPlan === 'Plan Leyenda');
  const otherProducts = productList.filter(p => p.requiredPlan !== 'Plan Leyenda');

  return (
    <>
      <Navbar
        loggedUser={loggedUser}
        onCartClick={() => navigate('/cesta')}
        handleLogout={() => { }}
      />

      {successMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-out">
          {successMessage}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-r from-purple-900 via-black to-fuchsia-900 animate-gradientMove">
        <div className="max-w-7xl mx-auto px-4 py-16"> <br></br>
          <h1 className="text-4xl font-bold text-center mb-10 text-white drop-shadow-xl">Especiales</h1>

          <h2 className="text-center text-white text-lg mb-6">
            Tu plan actual: <span className="text-pink-400 font-semibold">{userPlan}</span>
          </h2>


          {/* Productos normales (no Leyenda) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20">
            {otherProducts.map((product, index) => {
              const hasAccess = canAccessProduct(product);

              if (!hasAccess) {
                return (
                  <div
                    key={index}
                    className="relative group rounded-xl border border-white/20 bg-black bg-opacity-60 flex flex-col items-center justify-center p-6 shadow-2xl"
                    style={{ minHeight: '350px' }}
                  >
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 rounded-xl blur-xl opacity-60 group-hover:opacity-90 transition duration-1000 animate-gradient"></div>

                    <div className="relative z-10 flex flex-col items-center gap-6 text-gray-400 select-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 11c1.656 0 3 1.344 3 3v3a3 3 0 01-6 0v-3c0-1.656 1.344-3 3-3zm0-6a4 4 0 00-4 4v2h8v-2a4 4 0 00-4-4z"
                        />
                      </svg>

                      <p className="text-center text-lg font-semibold">
                        Acceso exclusivo para <br />
                        <span className="text-pink-400">{product.requiredPlan}</span>
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className="relative group">
                  {product.topProduct && (
                    <div className="absolute top-2 left-2 bg-purple-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                      🧬 TOP
                    </div>
                  )}
                  {!product.topProduct && product.discountPrice && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg rotate-[-10deg] z-10">
                      ¡OFERTA!
                    </div>
                  )}


                  <div className="absolute -inset-[2px] bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-yellow-400 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:blur-2xl animate-gradient"></div>
                  <div className="relative bg-black bg-opacity-60 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4 text-white">
                      <h2 className="text-lg font-semibold">{product.name}</h2>
                      <p className="text-sm text-white/80 mb-2">{product.description}</p>

                      <div className="mb-3">
                        {product.discountPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-fuchsia-200">{product.price} €</span>
                            <span className="line-through text-sm text-white/40">{product.discountPrice} €</span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-fuchsia-200">{product.price} €</span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-2 transition shadow-lg"
                      >
                        Añadir a la cesta
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Productos Leyenda centrados */}
          <div className="flex justify-center gap-12">
            {leyendaProducts.map((product, index) => {
              const hasAccess = canAccessProduct(product);

              if (!hasAccess) {
                return (
                  <div
                    key={index}
                    className="relative group rounded-xl border border-white/20 bg-black bg-opacity-60 flex flex-col items-center justify-center p-6 shadow-2xl"
                    style={{ minHeight: '350px', width: '320px' }}
                  >
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 rounded-xl blur-xl opacity-60 group-hover:opacity-90 transition duration-1000 animate-gradient"></div>

                    <div className="relative z-10 flex flex-col items-center gap-6 text-gray-400 select-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 11c1.656 0 3 1.344 3 3v3a3 3 0 01-6 0v-3c0-1.656 1.344-3 3-3zm0-6a4 4 0 00-4 4v2h8v-2a4 4 0 00-4-4z"
                        />
                      </svg>

                      <p className="text-center text-lg font-semibold">
                        Acceso exclusivo para <br />
                        <span className="text-pink-400">{product.requiredPlan}</span>
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className="relative group w-80">
                  {/* Corona animada */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <div className="relative flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full shadow-xl animate-pulse">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="w-10 h-10 text-white drop-shadow-lg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-black select-none">TOP</span>
                    </div>
                  </div>

                  <div className="absolute -inset-[2px] bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 rounded-xl blur-xl opacity-90 group-hover:opacity-100 transition duration-1000 group-hover:blur-3xl animate-gradient"></div>
                  <div className="relative bg-black bg-opacity-70 backdrop-blur-md rounded-xl overflow-hidden border border-yellow-500 shadow-2xl">
                    <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                    <div className="p-6 text-white">
                      <h2 className="text-xl font-extrabold">{product.name}</h2>
                      <p className="text-sm text-yellow-300 mb-4">{product.description}</p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-yellow-300">{product.price} €</span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold py-3 transition shadow-xl"
                      >
                        Añadir a la cesta
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComprarProducto;
