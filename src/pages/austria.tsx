import React from 'react';
import Navbar from "../components/Navbar";
import MusicCarousel from "../components/MusicCarousel";

import foto1 from "../assets/png/fototodos.png";
import foto2 from "../assets/png/fototodos.png";
import foto3 from "../assets/png/fototodos.png";
import viatgeVideo from "../assets/videos/2010 Tuna 50 Aniversario.mp4";

const pdfLinks = [
  "/pdfs/austria1.pdf",
  "/pdfs/austria2.pdf",
  "/pdfs/austria3.pdf",
];

const imageTextData = [
  {
    image: foto1,
    title: "La Prensa (Barcelona) – 16 Noviembre 1960",
    text: "L'Estudiantina de l'Escola de Perits Industrials de Villanueva i Geltrú va promoure una subscripció per a portar una rèplica de la Verge de Montserrat al santuari austríac de Mariazell. La imatge va ser beneïda a Montserrat abans del viatge."
  },
  {
    image: foto2,
    title: "Solidaridad Nacional – 19 Noviembre 1960",
    text: "L'Estudiantina va recaptar 20.000 pessetes per a la rèplica de la Verge, que seria oferta al santuari de Mariazell, visitat per pelegrins de tot el món. Destaca el suport dels universitaris i el poble."
  },
  {
    image: foto3,
    title: "Le Patriote (Francia) – 6 Diciembre 1960",
    text: "L'Estudiantina de Villanueva i Geltrú, vestida amb vestits tradicionals, va actuar a Mònaco durant el seu viatge a Àustria. Portaven instruments com a guitarres i tamborines, oferint serenates."
  },
];

const newsData = [
  {
    date: "1960 11 16",
    city: "Barcelona",
    newspaper: "La Prensa",
    details: "Recorte Fotografía (Tuna Fallas) Noticia",
  },
  {
    date: "1960 11 16",
    city: "Madrid",
    newspaper: "Pueblo",
    details: "Recorte Fotografía (Tuna Mallorca) Artículo",
  },
  {
    date: "1960 11 17",
    city: "Barcelona",
    newspaper: "La Vanguardia",
    details: "Hemeroteca pag 31 – Noticia",
  },
  {
    date: "1960 11 17",
    city: "Barcelona",
    newspaper: "El Correo Catalán",
    details: "Recorte, Noticia",
  },
  {
    date: "1960 11 18",
    city: "Barcelona",
    newspaper: "La Vanguardia",
    details: "Hemeroteca pag 21 – Noticia",
  },
  {
    date: "1960 11 19",
    city: "Lérida (Lleida)",
    newspaper: "La Mañana",
    details: "Recorte Artículo",
  },
  {
    date: "1960 11 19",
    city: "Barcelona",
    newspaper: "Solidaridad Nacional",
    details: "Recorte Noticia",
  },
  {
    date: "1960 11 19",
    city: "Villanueva y Geltrú",
    newspaper: "Semanario",
    details: "Recorte – Noticia",
  },
  {
    date: "1960 11 20",
    city: "Lérida (Lleida)",
    newspaper: "La Mañana",
    details: "Recorte Noticia",
  },
];

const DownloadButton = ({
  pdfLink,
  className = "",
}: {
  pdfLink: string;
  className?: string;
}) => (
  <a
    href={pdfLink}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-7 rounded-3xl shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400 ${className}`}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
      />
    </svg>
    Descargar PDF
  </a>
);

const AustriaPage: React.FC = () => {

  return (
    <>

      <div className="bg-gradient-to-b from-indigo-50 via-white to-purple-50 min-h-screen">
        <Navbar />

        {/* Contenedor principal centrado */}
        <div className="flex flex-col items-center"> <br></br>
          <main className="w-full max-w-6xl px-4 sm:px-6 py-12 space-y-20">
            {/* Hero Section */}
            <section className="relative w-full rounded-3xl overflow-hidden shadow-2xl">
              {/* Video de fondo */}
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={viatgeVideo}
                autoPlay
                loop
                muted
                playsInline
              />

              {/* Capa oscura para contraste */}
              <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

              {/* Contenido encima del video */}
              <div className="relative z-20 text-white text-center px-6 py-24 container mx-auto">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Viatge Àustria</h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
                  Descobreix la història de la Tuna de l'E.T.P.I. de Vilanova i la Geltrú i el seu llegat a Mariazell
                </p>
              </div>
            </section>


            {/* Text Block 1 - Centrado */}
            <div className="space-y-6 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-indigo-900">
                La Tuna de la E.T.P.I. de Vilanova i la Geltrú i el seu llegat a Mariazell, Àustria
              </h2>

              <p className="text-lg leading-relaxed text-gray-800">
                <strong className="text-indigo-800">Un viatge històric d'amistat i tradició entre Espanya i Àustria</strong>
              </p>

              <p className="text-lg leading-relaxed text-gray-800">
                La Tuna de l’Escola Tècnica de Perits Industrials (E.T.P.I.) de Vilanova i la Geltrú, formada per estudiants entre 1956 i 1961, va deixar un llegat inesborrable en Mariazell, Àustria, gràcies al seu viatge en 1960. Aquest grup de joves, no sols va portar amb si música i tradició, sinó que també va establir un vincle cultural i religiós amb Àustria que perdura fins avui.
              </p>

              <p className="text-lg leading-relaxed text-gray-800">
                <strong className="text-indigo-800">El viatge de 1960: Un gest d'amistat i fe</strong>
              </p>

              <p className="text-lg leading-relaxed text-gray-800">
                Al desembre de 1960, la Tuna va emprendre un viatge a Àustria. Durant aquest viatge, els tunos van decidir portar una còpia exacta de la Verge de Montserrat, coneguda com «La Moreneta», per a donar-la a la Basílica de Mariazell. Aquest gest simbòlic no sols va ser un acte de fe, sinó també un missatge de solidaritat i amistat entre els pobles d’Espanya i Àustria.
              </p>

              <p className="text-lg leading-relaxed text-gray-800">
                <strong className="text-indigo-800">La Promoció de 1961: Mantenint viva la tradició</strong>
              </p>

              <p className="text-lg leading-relaxed text-gray-800">
                Després de finalitzar els seus estudis en 1961, els membres de la Tuna van formar la «Promoció de 1961», un grup que es va comprometre a mantenir viva la tradició i l’amistat amb Àustria. Al llarg dels anys, aquesta promoció ha organitzat nombrosos actes, intercanvis i esdeveniments que han enfortit els llaços amb Àustria. <br></br> <br></br>
                Un de les fites més importants va ser el lliurament anual de palmes i palmones en Mariazell durant el Diumenge de Rams, una tradició que va començar en 1972 i que s’ha mantingut durant més de 50 anys. Aquest acte simbòlic, en el qual s’intercanvien palmes entre els nens de Mariazell i els visitants espanyols, s’ha convertit en un símbol de pau i amistat entre tots dos països.
              </p>

              <p className="text-lg leading-relaxed text-gray-800">
                <strong className="text-indigo-800">El llegat de la Tuna en Mariazell</strong>
              </p>

              <p className="text-lg leading-relaxed text-gray-800">
                La Tuna no sols va deixar una petjada cultural en Mariazell, sinó que també va contribuir a la restauració de la Basílica i a la promoció del turisme a la regió. En 2010, amb motiu del 50 aniversari del lliurament de la Verge de Montserrat, es van celebrar diversos actes commemoratius en Mariazell, incloent-hi una missa solemne i el lliurament d’una medalla d’or de la ciutat a Jaime M. Montanera, qui fora el cap de la Tuna en 1960. <br></br><br></br>

                A més, en 2012, la Tuna va donar un vestit tradicional al Museu de Mariazell, com a símbol de l’amistat entre totes dues comunitats. Aquest vestit, que inclou les cintes recollides pels tunos durant els seus anys d’activitat, és un testimoniatge viu de la història compartida entre Espanya i Àustria.
              </p>

              <div className="flex justify-center mt-8">
                <DownloadButton pdfLink={pdfLinks[0]} className="rounded-full px-6 py-3 text-lg" />
              </div>
            </div>

            {/* Text Block 2 - Centrado */}
            <div className="space-y-6 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-indigo-900">
                50è aniversari de La Tuna: mig segle de records i música
              </h2>

              <p className="text-lg leading-relaxed text-gray-800">
                El document commemora el 50è aniversari del viatge de la Tuna de l’E.T.P.I. de Vilanova i la Geltrú a Àustria el 1960, celebrat al desembre del 2010. Inclou esdeveniments com un concert amb els Wiener Sängerknaben, una recepció al Stadtpark de Viena i una visita a l’ambaixada d’Espanya, on es va homenatjar una funcionària difunta i es va cantar «Clavelitos». També es va destacar la lliuraga d’una còpia de la Mare de Déu de Montserrat a Mariazell, amb actes commemoratius i la concessió d’una medalla d’or a Jaime M Montanera. El text reflecteix emocions, tradicions i la importància de mantenir llaços culturals i religiosos entre Catalunya i Àustria.              </p>


              <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
                {/* Tarjetas centradas */}
                <div className="bg-indigo-50 rounded-xl shadow-lg p-6 text-center w-full max-w-xs">
                  <div className="text-5xl mb-4">📌</div>
                  <h3 className="text-xl font-semibold text-indigo-800 mb-2">Els inicis</h3>
                  <p className="text-gray-700 text-sm">
                    El document explica els inicis de La Tuna, recordant com es va formar i els primers passos que van fer com a grup.
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-xl shadow-lg p-6 text-center w-full max-w-xs">
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="text-xl font-semibold text-indigo-800 mb-2">Moments destacats</h3>
                  <p className="text-gray-700 text-sm">
                    S’hi relaten anècdotes, viatges i actuacions especials que han definit la història de La Tuna al llarg dels seus 50 anys d’existència.
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-xl shadow-lg p-6 text-center w-full max-w-xs">
                  <div className="text-5xl mb-4">🔄</div>
                  <h3 className="text-xl font-semibold text-indigo-800 mb-2">L'evolució</h3>
                  <p className="text-gray-700 text-sm">
                    Es detalla com La Tuna ha anat canviant amb el temps, adaptant-se a noves generacions i mantenint viva la seva essència i tradicions.
                  </p>
                </div>
              </div>


              <div className="flex justify-center mt-8">
                <DownloadButton pdfLink={pdfLinks[1]} className="rounded-full px-6 py-3 text-lg" />
              </div>
            </div>

            {/* Text Block 3 - Centrado */}
            <div className="space-y-6 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-indigo-900">
                La Tuna de la ETPI Vilanova i la Geltrú (Villanueva y Geltrú) Montserrat, Mariazell, Austria 1960
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-items-center">
                {newsData.map(({ date, city, newspaper, details }, idx) => {
                  const [year, month, day] = date.split(" ");
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow cursor-pointer w-full max-w-xs"
                      title={`${date} - ${newspaper}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-indigo-700 text-sm">
                          {day}/{month}/{year}
                        </span>
                        <span className="text-xs text-gray-500">{city}</span>
                      </div>
                      <h3 className="font-bold text-indigo-900 text-lg mb-1">{newspaper}</h3>
                      <p className="text-gray-700 text-sm">{details}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center mt-8">
                <DownloadButton pdfLink={pdfLinks[2]} className="rounded-full px-6 py-3 text-lg" />
              </div>
            </div>

            {/* Newspaper Images - Centrado */}
            <section className="text-center">
              <h2 className="text-3xl font-bold text-indigo-900 mb-12">Documents històrics</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                {imageTextData.map(({ image, title, text }, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 w-full max-w-sm"
                  >
                    <img
                      src={image}
                      alt={`Imagen ${idx + 1}`}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-indigo-800 mb-3">{title}</h3>
                      <p className="text-gray-600">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Music Carousel - Centrado */}
            <section className="text-center">
              <h2 className="text-4xl font-bold text-indigo-900 mb-12">Album La Tuna 1960</h2>
              <div className="max-w-4xl mx-auto">
                <MusicCarousel />
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default AustriaPage;