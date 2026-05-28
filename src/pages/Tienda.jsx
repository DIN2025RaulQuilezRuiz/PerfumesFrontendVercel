/**
 * Tienda component - Displays a list of perfumes with search functionality
 * 
 * This component renders a shop page that shows available perfumes in a responsive grid.
 * It includes a search bar that filters perfumes by name in real-time using memoization
 * for performance optimization.
 * 
 * @component
 * @returns {React.ReactElement} A section containing the perfume shop with search functionality
 * 
 * @example
 * return <Tienda />
 * 
 * @description
 * Features:
 * - Displays perfumes in a responsive grid (1 col on mobile, 2 on tablet, 4 on desktop)
 * - Real-time search filtering by perfume name (case-insensitive)
 * - Shows filtered results or a "no results" message
 * - Uses useMemo hook to optimize filter performance
 * 
 * Dependencies:
 * - SearchBar: Input component for search functionality
 * - Perfume: Card component displaying individual perfume details
 * - perfumes: Array of perfume objects from data source
 * - Tailwind CSS: For responsive grid and styling
 */
import '../assets/index.css'
import { useGetAllProducts } from '../hooks/useGetAllPerfumes.js';
import Perfume from "../components/Perfume.jsx"
import SearchBar from '../components/SearchBar.jsx';
import { useMemo, useState, useEffect } from "react";
import useVoiceRecognition from '../hooks/useVoiceRecognition.js';

function Tienda() {
    const [searchTerm, setSearchTerm] = useState("");

    const { perfumes: perfumes, loading, error } = useGetAllProducts()

    // Integración de reconocimiento de voz
    const { isListening, isSupported, startListening } = useVoiceRecognition((text) => {
        setSearchTerm(text);
    });

    // Detectar arrastre (swipe) desde el borde derecho para activar el micrófono
    useEffect(() => {
        let startX = 0;
        let endX = 0;
        let isDragging = false;

        const checkSwipe = () => {
            const screenWidth = window.innerWidth;
            const EDGE_THRESHOLD = 150; // Píxeles desde el borde derecho
            const SWIPE_THRESHOLD = 60; // Distancia mínima

            if (screenWidth - startX <= EDGE_THRESHOLD) {
                if (startX - endX >= SWIPE_THRESHOLD) {
                    if (isSupported && !isListening) {
                        startListening();
                    }
                }
            }
        };

        // --- Eventos Táctiles (Móvil) ---
        const handleTouchStart = (e) => {
            startX = e.changedTouches[0].clientX;
            endX = startX;
        };
        const handleTouchMove = (e) => {
            endX = e.changedTouches[0].clientX;
        };
        const handleTouchEnd = () => {
            checkSwipe();
        };

        // --- Eventos de Ratón (Escritorio) ---
        const handleMouseDown = (e) => {
            isDragging = true;
            startX = e.clientX;
            endX = startX;
        };
        const handleMouseMove = (e) => {
            if (isDragging) {
                endX = e.clientX;
            }
        };
        const handleMouseUp = () => {
            if (isDragging) {
                checkSwipe();
                isDragging = false;
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);

            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isSupported, isListening, startListening]);

    const filteredPerfumes = useMemo(() => {
    if (!perfumes) return [];

    if (!searchTerm) return perfumes;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return perfumes.filter((perfume) => {
        const nombre =
            perfume.nombre ?? perfume.name ?? "";

        return nombre.toLowerCase().includes(lowerCaseSearchTerm);
    });
}, [searchTerm, perfumes]);



    if (loading) {
        return <p>Cargando</p>
    }

    if (error != null) {
        return <p>{error}</p>
    }

    return (
        <section aria-labelledby="tienda-title">
            <h1 id="tienda-title" className="contenedor__h1 mt-4">
                Perfumes
            </h1>

            <p className="font-textopeque">
                Listado de disponibles:
            </p>

            <div className="flex items-center gap-2 w-full max-w-md mx-auto">
                <div className="flex-grow">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        placeholder="Buscar perfumes por nombre..."
                    />
                </div>

                {isSupported && (
                    <button
                        onClick={startListening}
                        disabled={isListening}
                        className={`p-3 rounded-full transition-colors duration-200 ${isListening
                            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                            : 'bg-blue-500 hover:bg-blue-600'
                            } text-white shadow-md`}
                        title="Buscar por voz"
                        aria-label="Activar búsqueda por voz"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                            <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                        </svg>
                    </button>
                )}
            </div>

            {isListening && <p className="text-center text-sm text-gray-500 mt-2">Escuchando...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8">

                {filteredPerfumes.length > 0 ? (
                    filteredPerfumes.map((perfume, idx) => (
                        <Perfume
                            key={perfume._id ?? perfume.id ?? idx}
                            indexPerfume={perfume._id ?? perfume.id ?? idx}
                            nombre={perfume.nombre ?? perfume.name}
                            foto={perfume.imagen ?? perfume.photo}
                        >
                            {perfume.descripcion ?? perfume.description}
                        </Perfume>
                    ))
                ) : (
                    // Mensaje si no hay resultados
                    <p className="col-span-full text-center text-gray-500 p-4">
                        No se encontraron perfumes con el término
                        "{searchTerm}".
                    </p>
                )
                }

            </div>
        </section>
    )
}

export default Tienda;