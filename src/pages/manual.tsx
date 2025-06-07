import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Manual() {
    const [activeStep, setActiveStep] = useState(1);
    const navigate = useNavigate();

    const steps = [
        {
            title: "Accede a la página de reservas",
            description: "Haz clic en el botón 'Reservar' del menú principal",
            image: "https://img.icons8.com/fluency/96/calendar--v1.png",
            action: "Ir a Reservas",
        },
        {
            title: "Selecciona tu pista y horario",
            description: "Elige entre tierra batida, rápida o pádel y elige el día y hora que prefieras",
            image: "https://img.icons8.com/fluency/96/clock--v1.png",
            action: "Ver horarios",
        },
        {
            title: "Completa tus datos",
            description: "Ingresa tu nombre de usuario y el de tu compañero (consultar con la persona su USERNAME) para confirmar la reserva",
            image: "https://img.icons8.com/fluency/96/user-male-circle--v1.png",
            action: "Empezar a reservar",
        },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 pt-24 text-white">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16"> <br></br><br></br>
                        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                            Guía de Reservas
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Sigue estos sencillos pasos para reservar tu pista favorita
                        </p>
                        <p className="mt-6 text-2xl font-semibold text-yellow-400 bg-yellow-900 bg-opacity-30 rounded-md max-w-xl mx-auto p-4">
                            ⚠️ Importante: Da click en cada una de las casillas (1, 2 y 3) para ver el manual completo
                        </p>
                    </div>


                    {/* Steps */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${activeStep === index + 1 ? "bg-gradient-to-br from-gray-800 to-gray-700 shadow-xl ring-2 ring-blue-500" : "bg-gray-800"}`}
                                onClick={() => setActiveStep(index + 1)}
                            >
                                <div className="absolute -top-5 -left-5 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                                    {index + 1}
                                </div>
                                <div className="flex flex-col items-center">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-24 h-24 mb-6 object-contain"
                                    />
                                    <h3 className="text-2xl font-semibold mb-3 text-center">{step.title}</h3>
                                    {activeStep === index + 1 && (
                                        <button
                                            onClick={() => navigate("/reservar")}
                                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full font-medium hover:opacity-90 transition"
                                        >
                                            {step.action}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Instructions */}
                    <div className="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold mb-4">{steps[activeStep - 1].title}</h2>
                                {activeStep === 1 && (
                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-start">
                                            <span className="text-green-400 mr-2">1</span>
                                            <span className="text-lg">Navega al menú principal</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-400 mr-2">2</span>
                                            <span className="text-lg">Haz clic en la opción "Reservar"</span>
                                        </li>
                                    </ul>
                                )}

                                {activeStep === 2 && (
                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-start">
                                            <span className="text-green-400 mr-2">3</span>
                                            <span className="text-lg">Elige el tipo de pista/deporte que prefieras (Tierra, Quick o Padel)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-400 mr-2">4</span>
                                            <span className="text-lg">Selecciona un día disponible (verde)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-400 mr-2">5</span>
                                            <span className="text-lg">Haz clic en un horario disponible</span>
                                        </li>
                                    </ul>
                                )}

                                {activeStep === 3 && (
                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-start">
                                            <span className="text-green-400 mr-2">6</span>
                                            <span className="text-lg">Ingresa tu nombre de usuario exacto</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-400 mr-2">7</span>
                                            <span className="text-lg">Si juegas con alguien más, ingresa su nombre de usuario exacto <br /><br />Ejemplo: si la persona se llama manolo sanchez será 'manolo_sanchez'</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-400 mr-2">8</span>
                                            <span className="text-lg">Confirma la reserva</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-400 mr-2">9</span>
                                            <span className="text-lg">Revisa que se ha realizado correctamente la reserva en la página 'mis reservas'</span>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="rounded-xl p-10">
                                    <img
                                        src={
                                            activeStep === 1
                                                ? "https://img.icons8.com/fluency/96/calendar--v1.png"
                                                : activeStep === 2
                                                    ? "https://img.icons8.com/fluency/96/clock--v1.png"
                                                    : "https://img.icons8.com/fluency/96/user-male-circle--v1.png"
                                        }
                                        alt="Illustration"
                                        className="w-full h-auto rounded-lg"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-semibold mb-6">Información</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-red-500">
                                <h4 className="font-bold text-lg mb-2">Cancelaciones</h4>
                                <p className="text-gray-300">Cancelar con mínimo 3h de anticipación, hagamos un buen uso de la web</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-500">
                                <h4 className="font-bold text-lg mb-2">Reservas semanales</h4>
                                <p className="text-gray-300">Puedes hacer hasta 2 reservas por semana (en tierra), tanto en Quick como Pádel puedes reservas las que quieras!</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-purple-500">
                                <h4 className="font-bold text-lg mb-2">Problemas</h4>
                                <p className="text-gray-300">Cualquier problema acceder a la página de 'contacto' para solucionarlo lo antes posible</p> <br></br>
                            </div>
                        </div><br></br><br></br><br></br>
                    </div>
                </div>
            </main>
        </>
    );
}