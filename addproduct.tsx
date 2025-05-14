import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [imageData, setImageData] = useState<string | null>(null);
  const [men, setMen] = useState(false);
  const [women, setWomen] = useState(false);

  const navigate = useNavigate();

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categories = ['new-arrivals'];
    if (men) categories.push('men');
    if (women) categories.push('women');

    const newProduct = {
      id: Date.now(),
      name,
      model,
      price: parseFloat(price),
      image_url: imageData,
      categories
    };

    const existing = localStorage.getItem('products');
    const products = existing ? JSON.parse(existing) : [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    navigate('/category/men');
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Añadir producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Modelo" value={model} onChange={e => setModel(e.target.value)} className="w-full border p-2 rounded" />
        <input type="number" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} className="w-full border p-2 rounded" />

        {/* Zona de arrastrar imagen */}
        <div
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-40 border-2 border-dashed border-gray-400 rounded flex items-center justify-center text-gray-500 cursor-pointer"
          onClick={() => document.getElementById('imageInput')?.click()}
        >
          {imageData ? (
            <img src={imageData} alt="Preview" className="h-full object-contain" />
          ) : (
            <span>Arrastra una imagen aquí o haz clic</span>
          )}
        </div>
        <input id="imageInput" type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />

        <div className="flex gap-4">
          <label>
            <input type="checkbox" checked={men} onChange={() => setMen(!men)} />
            <span className="ml-2">Men</span>
          </label>
          <label>
            <input type="checkbox" checked={women} onChange={() => setWomen(!women)} />
            <span className="ml-2">Women</span>
          </label>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Añadir
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
