import React from 'react';
import { Link } from 'react-router-dom';
import { Marquee } from './ui/marquee';
import { motion, useScroll, useTransform } from 'framer-motion';

import imgUniversitaria from '../assets/png/universitaria.png';
import imgEstudiantina from '../assets/png/estudiantina.png';
import imgTuna from '../assets/png/austria1.jpg';
import imgReunions from '../assets/png/reunions.png';
import imgAustria from '../assets/png/arbresaustria.png';
import imgVilanova from '../assets/png/arbresvilanova.png';
import imgViatge from '../assets/png/viatge.png';
import imgMariatzell from '../assets/png/mariatzell.png';

const Categories: React.FC = () => {
  const categories = [
    {
      id: 1,
      name: 'La vida universitària',
      slug: 'universitaria',
      image: imgUniversitaria,
    },
    {
      id: 2,
      name: 'La Estudiantina',
      slug: 'estudiantina',
      image: imgEstudiantina,
    },
        {
      id: 6,
      name: 'Arbres Vilanova',
      slug: 'arbres-vilanova',
      image: imgVilanova,
    },
    {
      id: 3,
      name: 'Austria',
      slug: 'austria',
      image: imgTuna,
    },
    {
      id: 4,
      name: 'Reunions',
      slug: 'reunions',
      image: imgReunions,
    },
    {
      id: 5,
      name: 'Arbres Àustria',
      slug: 'arbres-austria',
      image: imgAustria,
    },
    {
      id: 7,
      name: 'Viatge final de carrera',
      slug: 'viatge-final',
      image: imgViatge,
    },
    {
      id: 8,
      name: 'Mariatzell',
      slug: 'mariatzell',
      image: imgMariatzell,
    },
  ];

  const firstRow = categories.slice(0, categories.length / 2);
  const secondRow = categories.slice(categories.length / 2);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const CategoryCard = ({ category }: { category: typeof categories[0] }) => (
    <Link
      to={`${category.slug}`}
      className="relative h-64 w-80 overflow-hidden rounded-xl mx-4 group"
    >
      <motion.img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 h-full w-full object-cover object-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-bold text-white">{category.name}</h3>
      </div>
    </Link>
  );

  return (
    <div className="py-16 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" style={{ scale, opacity }}>
          <h2 className="text-3xl font-bold text-gray-900">Explora per temàtica</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Descobreix els moments, llocs i records que han marcat la Promoció de 1961.
          </p>
        </motion.div>

        <div className="mt-12 relative">
          <Marquee pauseOnHover className="[--duration:30s]">
            {firstRow.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="mt-8 [--duration:30s]">
            {secondRow.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-50" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-50" />
        </div>
      </div>
    </div>
  );
};

export default Categories;
