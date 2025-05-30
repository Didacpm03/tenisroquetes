import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import { useParams, useLocation } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const location = useLocation(); // ✅ Aquí obtenemos la URL
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<string | null>(null);

  // Estado para filtro de estilo
  const [selectedStyleCategory, setSelectedStyleCategory] = React.useState<string | null>(null);

  //Este useEffect lee el parámetro style en la URL al cargar
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const style = params.get('style');
    if (style) {
      setSelectedStyleCategory(style);
    }
  }, [location.search]);

  React.useEffect(() => {
  window.scrollTo(0, 0);
  }, [category, selectedStyleCategory]);

  const getCategoryTitle = () => {
    switch (category) {
      case 'men': return "Men's Collection";
      case 'women': return "Women's Collection";
      case 'new-arrivals': return 'New Arrivals';
      case 'sale': return 'Sale Items';
      default: return 'All Products';
    }
  };

  const filteredProducts = React.useMemo(() => {
    let baseProducts = mockProducts;

    switch (category) {
      case 'sale':
        baseProducts = baseProducts.filter(product => product.onSale);
        break;
      case 'new-arrivals':
        baseProducts = baseProducts.filter(product => product.isNew);
        break;
      case 'men':
      case 'women':
        baseProducts = baseProducts.filter(product => product.category === category);
        break;
    }

    if (selectedBrand) {
      baseProducts = baseProducts.filter(product => product.brand === selectedBrand);
    }

    if (selectedStyleCategory) {
      baseProducts = baseProducts.filter(product => product.styleCategory === selectedStyleCategory);
    }

    if (sortOrder === 'asc') {
      baseProducts = [...baseProducts].sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        return priceA - priceB;
      });
    } else if (sortOrder === 'desc') {
      baseProducts = [...baseProducts].sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        return priceB - priceA;
      });
    }

    return baseProducts;
  }, [category, selectedBrand, selectedStyleCategory, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{getCategoryTitle()}</h1>
            <p className="text-lg text-gray-600">Discover our latest collection of premium sneakers</p>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              {/* Ordenar precio */}
              <select
                className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm"
                onChange={(e) => {
                  const value = e.target.value;
                  setSortOrder(value === 'Ordenar' ? null : value);
                }}
              >
                <option>Ordenar</option>
                <option value="asc">Precio más barato</option>
                <option value="desc">Precio más alto</option>
              </select>

              {/* Filtro marcas */}
              <select
                className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm"
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedBrand(value === 'Todo' ? null : value);
                }}
              >
                <option>Todo</option>
                <option>Nike</option>
                <option>Adidas</option>
                <option>Puma</option>
                <option>Vans</option>
                <option>New Balance</option>
              </select>

              {/* Filtro estilo */}
              <select
                className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm"
                value={selectedStyleCategory || 'Todos los estilos'}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedStyleCategory(value === 'Todos los estilos' ? null : value);
                }}
              >
                <option>Todos los estilos</option>
                <option>Running</option>
                <option>Basketball</option>
                <option>Lifestyle</option>
                <option>Limited Edition</option>
              </select>
            </div>

            <p className="text-sm text-gray-600">{filteredProducts.length} products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
