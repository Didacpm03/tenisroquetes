import React from 'react';
import foto1 from '../assets/png/fotouno.png';
import foto2 from '../assets/png/latuna.png';
import foto3 from '../assets/png/estudiantina.png';
import foto4 from '../assets/png/mariatzell.png'; // Nueva imagen (por ejemplo)

const FeaturedInfoSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-32">

        {/* TÍTULO PRINCIPAL */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold text-gray-900">Promoció 1961 · Una Germandat Inoblidable</h2>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            El que va començar com un grup d’estudiants de peritatge industrial i integrants de La Tuna
            esdevingué una xarxa d’amistats que transcendeix generacions i fronteres.
          </p>
        </div>

        {/* BLOQUE 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 w-full md:w-1/2">
            <img
              src={foto1}
              alt="Llegat viu"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
            />
          </div>
          <div className="md:w-1/2 md:pl-12 max-w-xl">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Un llegat viu</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              La Promoció de 1961 de l’Escola Tècnica de Pèrits Industrials de Vilanova i la Geltrú, no és només un record de joventut, sinó un llegat viu que continua, reafirmant el valor de l’amistat i la germanor construïdes a partir d’una experiència única i irrepetible.<br /><br />
              Per entendre la forta cohesió dels membres de la Promoció de 1961, cal situar-se en el context de l’època (1956-1962). Avui dia, sembla impensable que els estudiants passessin un trimestre sencer sense tornar a casa. Tanmateix, en aquell moment, els cotxes particulars eren una raresa. Aquests condicionants, conjuntament amb la convivència de cinc cursos acadèmics de nou mesos lluny de la llar, van resultar els detonants perfectes per crear vincles més que profunds.
            </p>
          </div>
        </div>

        {/* BLOQUE 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex-shrink-0 w-full md:w-1/2">
            <img
              src={foto2}
              alt="Context època"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
            />
          </div>
          <div className="md:w-1/2 md:pr-12 max-w-xl">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Un context únic</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Aquests estudiants van tenir la capacitat de gestionar un conveni amb un allotjament hoteler i convertir-lo en residència exclusiva per als alumnes. Així va néixer La Goya, un espai que va esdevenir la seva llar durant el curs acadèmic i es va convertir en l’escenari de la vida estudiantil.<br /><br />
              Un esdeveniment que va marcar la promoció fou el Pas de l’Equador, celebrat el 1959. Els estudiants van construir i llançar un coet anomenat Xarneguito des de la Plaça de la Vila. No se sap amb exactitud quina trajectòria va seguir, però la seva memòria encara ressona entre els membres de la promoció.
            </p>
          </div>
        </div>

        {/* BLOQUE 3 */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 w-full md:w-1/2">
            <img
              src={foto3}
              alt="Pas de l'Equador"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
            />
          </div>
          <div className="md:w-1/2 md:pl-12 max-w-xl">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Innovació i records</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Una altra fita va ser el viatge de la Tuna a Àustria l’any 1960, epopeia que es va convertir en part fonamental de la memòria col·lectiva de la Promoció.<br /><br />
              L’esperit que va generar aquest viatge no es va limitar als records. Alguns membres s’han implicat activament en intercanvis culturals entre Catalunya i Àustria, com l’entrega de Palmes a Mariazell, o la plantada d’un Roure a Stadtpark de Viena.
            </p>
          </div>
        </div>

        {/* BLOQUE 4 – Nueva imagen y cierre */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex-shrink-0 w-full md:w-1/2">
            <img
              src={foto4}
              alt="Reunions anuals"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
            />
          </div>
          <div className="md:w-1/2 md:pr-12 max-w-xl">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Germanor per sempre</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              A causa de la complexitat del nom original, el col·lectiu va començar a ser conegut com a <strong>Freunde Österreich</strong> o <strong>Amics d’Àustria</strong>.<br /><br />
              Cinc anys de convivència acadèmica no podien acabar amb un simple adéu. Per això, molts membres van iniciar les <strong>Reunions Anuals</strong> després de Reis, celebrades ininterrompudament des de 1963 i amb la participació de les seves esposes, esdevenint un element clau de cohesió fins avui.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedInfoSection;
