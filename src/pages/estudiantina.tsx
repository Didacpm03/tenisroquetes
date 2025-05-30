import React from 'react';
import Navbar from '../components/Navbar';

import portada01 from '../assets/png/fototodos.png';
import portada02 from '../assets/png/latuna.png';
import portada03 from '../assets/png/fotouno.png';
import portada04 from '../assets/png/mariatzell.png';
import portada06 from '../assets/png/reunions.png';
import portada07 from '../assets/png/fototodos.png';
import portada08 from '../assets/png/viatge.png';
import portada09 from '../assets/png/arbresvilanova.png';
import portada10 from '../assets/png/fototodos.png';
import portada11 from '../assets/png/fototodos.png';
import portada12 from '../assets/png/fototodos.png';
import portada13 from '../assets/png/fototodos.png';
import portada14 from '../assets/png/fototodos.png';
import portada15 from '../assets/png/fototodos.png';
import portada16 from '../assets/png/fototodos.png';
import portada17 from '../assets/png/fototodos.png';
import portada18 from '../assets/png/fototodos.png';
import portada19 from '../assets/png/fototodos.png';
import portada21 from '../assets/png/fototodos.png';
import portada22 from '../assets/png/fototodos.png';
import portada23 from '../assets/png/fototodos.png';
import portada24 from '../assets/png/fototodos.png';

const estudiantinaData = [
  {
    title: 'Estudiantina 01',
    year: 1954,
    description: 'Aquesta primera edició de la revista us ofereix una mirada als centres educatius de Vilanova i la Geltrú, com la “Escuela de Trabajo” i el “Colegio Sama”. Descobrireu la vida del Sindicat Espanyol Universitari (SEU), reflexions sobre el passat estudiantil, col·loquis entre alumnes, un tast d’aeronàutica i consells de salut. També hi ha anuncis de negocis locals.',
    image: portada01,
    pdfLink: '/pdfs/estudiantina01.pdf',
  },
  {
    title: 'Estudiantina 02',
    year: 1955,
    description: 'Aquesta publicació presenta la Unió estudiantil i “Empuje Juvenil”, destacant la importància de la col·laboració i l’opinió dels estudiants. Trobareu reflexions sobre el futur professional, impressions dels estudiants, activitats del SEU i articles d’opinió. També inclou anuncis de negocis locals i informació sobre la vida a la Residència.',
    image: portada02,
    pdfLink: '/pdfs/estudiantina02.pdf',
  },
  {
    title: 'Estudiantina 03',
    year: 1956,
    description: 'En aquesta edició, llegireu sobre la visita de nous alumnes a la Escuela Industrial i les perspectives per al curs. Es discuteixen temes d’interès estudiantil com la participació i la col·laboració. També hi ha informació sobre les activitats del SEU i anuncis de diversos establiments de Vilanova i la Geltrú.',
    image: portada03,
    pdfLink: '/pdfs/estudiantina03.pdf',
  },
  {
    title: 'Estudiantina 04',
    year: 1956,
    description: 'Aquesta edició “Estudiantina” ens presenta l’Escola de Treball i el Col·legi Sama amb un estudiant somiant amb avions (potser vol fugir de classe?). El S.E.U. ja comença a fer sindicat (esperem que deixin temps per estudiar!). I si teniu uns quants diners, els anuncis us esperen!',
    image: portada04,
    pdfLink: '/pdfs/estudiantina04.pdf',
  },
  {
    title: 'Estudiantina 06',
    year: 1957,
    description: 'Al Col·legi Major Sant Jordi de Barcelona, ​​el Secretari Nacional del S.E.U., Juan A. Masip, va lliurar el Víctor de bronze al cap local, José Mª Ferrer Soler. En esports, van començar els campionats d’escacs (8 de febrer, 18 inscrits), tennis de taula (amb dues categories i destacats guanyadors), futbol (empat 5-5 entre Escola Industrial i Col·legi Sanà el 2 de febrer) i bàsquet (Escola de Mestratge va vèncer 18-14.',
    image: portada06,
    pdfLink: '/pdfs/estudiantina06.pdf',
  },
  {
    title: 'Estudiantina 07',
    year: 1957,
    description: 'Inclou informació sobre les festes de Sant Tomàs d’Aquino, amb partits de futbol, bàsquet, gimcanes ciclistes i altres activitats esportives. També es menciona la participació de la Tuna en les Falles de València i es fa una crida als estudiants perquè col·laborin en la venda de quinteles per finançar el viatge de fi de carrera. Es critica la manca de participació i es recorda la importància de la unitat i el companyerisme.',
    image: portada07,
    pdfLink: '/pdfs/estudiantina07.pdf',
  },
  {
    title: 'Estudiantina 08',
    year: 1957,
    description: 'Reflexió sobre la relació Escola-S.E.U. i necessitat de més comprensió entre professors i alumnes. Entrevista a Ramón Romero sobre viatges de formació professional i dificultats de finançament. Nous mandos del S.E.U. Eleccions de delegats. Edició de programes i apunts. I es comenta l’a participació ‘estada de la Tuna a Igualada i Reus.',
    image: portada08,
    pdfLink: '/pdfs/estudiantina08.pdf',
  },
  {
    title: 'Estudiantina 09',
    year: 1957,
    description: 'Aquesta edició presenta un article de José Luis Vidal sobre les seves experiències relacionades amb un mecànic i la biblioteca. Es reflexiona sobre l’entorn i les condicions de vida dels estudiants i s’ofereix una varietat d’anuncis.',
    image: portada09,
    pdfLink: '/pdfs/estudiantina09.pdf',
  },
  {
    title: 'Estudiantina 10',
    year: 1958,
    description: 'Article de La Codorniz sobre dificultats dels estudiants. Convocatòria d’eleccions per als Consells de Curs. Celebració del 25è aniversari del S.E.U. amb missa, ball i cursa de torxes. Inauguració del curs acadèmic i imposició del “Victor de Plata” a José Mª Ferrer Soler.',
    image: portada10,
    pdfLink: '/pdfs/estudiantina10.pdf',
  },
  {
    title: 'Estudiantina 11',
    year: 1958,
    description: 'Nova secció “Poniendo los puntos sobre las íes” per criticar problemes de l’Escola i S.E.U. Crítica a la neteja de les aules. Es comenta el sopar en honor a José Mª Ferrer Soler amb les autoritats locals. Es fa menció a la participació de la Tuna a Tarragona. Entrevista a D. Enrique Guitón sobre Estudiantina i la nova escola.',
    image: portada11,
    pdfLink: '/pdfs/estudiantina11.pdf',
  },
  {
    title: 'Estudiantina 12',
    year: 1958,
    description: 'Crítica als horaris de l’escola, que es consideren desorganitzats i poc eficients. Els estudiants proposen canvis, com eliminar les hores soltes entre classes i alliberar les tardes dels dissabtes. També es menciona la impuntualitat d’alguns professors.',
    image: portada12,
    pdfLink: '/pdfs/estudiantina12.pdf',
  },
  {
    title: 'Estudiantina 13',
    year: 1958,
    description: 'Resposta a la crítica dels professors sobre un article anterior. Es defensa la postura i demana que es millorin els horaris. També es parla d’activitats culturals i esportives, com el cinema cultural i el Teatre Espanyol Universitari (T.E.U.).',
    image: portada13,
    pdfLink: '/pdfs/estudiantina13.pdf',
  },
  {
    title: 'Estudiantina 14',
    year: 1959,
    description: 'Crítica a un professor adjunt interí pels seus comentaris despectius cap als estudiants. Es menciona la manca de professionalitat en la correcció d’exàmens. També s’informa sobre els campionats esportius interclasses i les activitats del T.E.U.',
    image: portada14,
    pdfLink: '/pdfs/estudiantina14.pdf',
  },
  {
    title: 'Estudiantina 15',
    year: 1959,
    description: 'Es destaca la importància de l’esport com a complement a l’estudi. S’informa sobre els campionats esportius i es critica la manca d’organització en alguns partits. També es parla del T.E.U. i de la seva pròxima obra, Un poble de paper.',
    image: portada15,
    pdfLink: '/pdfs/estudiantina15.pdf',
  },
  {
    title: 'Estudiantina 16',
    year: 1959,
    description: 'Reflexió sobre la tasca de l’Estudiantina i el seu compromís amb la crítica constructiva. Es mencionen les activitats del Club Universitari, el cineclub i els tornejos esportius. També es critica la manca de suport d’alguns professors amb la S.E.U.',
    image: portada16,
    pdfLink: '/pdfs/estudiantina16.pdf',
  },
  {
    title: 'Estudiantina 17',
    year: 1959,
    description: 'Es parla del viatge de final de carrera dels estudiants, que han visitat diversos països europeus. S’informa sobre les activitats del T.E.U. i els tornejos esportius. També es critica la manca d’assistència a les activitats culturals organitzades pel S.E.U.',
    image: portada17,
    pdfLink: '/pdfs/estudiantina17.pdf',
  },
  {
    title: 'Estudiantina 18',
    year: 1959,
    description: 'Inclou articles sobre temes com el disseny industrial, la filosofia de Camus i activitats culturals i universitàries. Es convoca un concurs de pintura i dibuix, així com un concurs de barbes per a les festes de Sant Tomàs d’Aquino. També es mencionen canvis en el personal de la revista i es felicita el grup de teatre universitari pel seu èxit. La revista fa una crida als estudiants perquè participin més activament en les activitats universitàries.',
    image: portada18,
    pdfLink: '/pdfs/estudiantina18.pdf',
  },
  {
    title: 'Estudiantina 19',
    year: 1959,
    description: 'Es critica l’estat degradat del jardí de l’escola. Es fa menció al concurs humorístic de barbes i es crítica als rellotges defectuosos.',
    image: portada19,
    pdfLink: '/pdfs/estudiantina19.pdf',
  },
  {
    title: 'Estudiantina 21',
    year: 1961,
    description: 'Crítica als professors, servei de feina per estudiants, problemes amb la biblioteca, resposta de la Cooperativa, activitats de Sant Tomàs.',
    image: portada21,
    pdfLink: '/pdfs/estudiantina21.pdf',
  },
  {
    title: 'Estudiantina 22',
    year: 1961,
    description: 'Nova imatge de la revista, participació en consell cultural, festival amb José Guardiola, promoció del teatre, dificultats del cineclub.',
    image: portada22,
    pdfLink: '/pdfs/estudiantina22.pdf',
  },
  {
    title: 'Estudiantina 23',
    year: 1962,
    description: 'Aquest número conté textos personals dels últims dies de curs i records emotius.',
    image: portada23,
    pdfLink: '/pdfs/estudiantina23.pdf',
  },
  {
    title: 'Estudiantina 24',
    year: 1962,
    description: 'L’última edició recull el tancament d’una etapa memorable.',
    image: portada24,
    pdfLink: '/pdfs/estudiantina24.pdf',
  },
];

const DownloadIcon = () => (
  <svg
    className="w-4 h-4 mr-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
    />
  </svg>
);

const Estudiantina: React.FC = () => {
  const groupedByYear = estudiantinaData.reduce<Record<number, typeof estudiantinaData>>((acc, item) => {
    if (!acc[item.year]) acc[item.year] = [];
    acc[item.year].push(item);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => a - b);

  const modernButton = (pdfLink: string) => (
    <a
      href={pdfLink}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center justify-center bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
    >
      <DownloadIcon />
      Descarregar PDF
    </a>
  );

  return (
    <div className="min-h-screen bg-black-white-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Revistes Estudiantina</h1>

        <div className="space-y-16">
          {sortedYears.map((year) => {
            const items = groupedByYear[year];

            // Verifica si alguna de las revistas de ese año es la 18 o la 19
            const contains18or19 = items.some((item) =>
              item.title.includes('18') || item.title.includes('19')
            );

            return (
              <section key={year}>
                <div className="relative text-center mb-12">
                  <span className="inline-block px-6 py-2 text-2xl font-bold tracking-wide text-black bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full shadow-md">
                    {year}
                  </span>
                  <div className="mt-3 w-32 h-1 mx-auto bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
                </div>

                {items.length === 1 ? (
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex overflow-hidden">
                    <img
                      src={items[0].image}
                      alt={items[0].title}
                      className="w-1/2 object-cover"
                      style={{ maxHeight: '400px' }}
                    />
                    <div className="p-8 flex flex-col justify-center w-1/2">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{items[0].title}</h3>
                      <p className="text-gray-700 text-base">{items[0].description}</p>
                      {modernButton(items[0].pdfLink)}
                    </div>
                  </div>
                ) : items.length === 2 || contains18or19 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
                      >
                        <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                          <p className="text-gray-600 flex-1 text-sm">{item.description}</p>
                          {modernButton(item.pdfLink)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
                      >
                        <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                          <p className="text-gray-600 flex-1 text-sm">{item.description}</p>
                          {modernButton(item.pdfLink)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Estudiantina;





