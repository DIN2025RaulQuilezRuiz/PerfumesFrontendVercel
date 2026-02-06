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
import { useMemo } from "react";
import { useState } from "react";

function Tienda() {
    const [searchTerm, setSearchTerm] = useState("");

    const { perfumes: perfumes, loading, error } = useGetAllProducts()

    const filteredPerfumes = useMemo(() => {

        if (!perfumes) {
            return []
        }

        if (!searchTerm) {
            return perfumes;
            // Si no hay término, devuelve la lista completa
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return perfumes.filter((perfume) =>
            // Filtra por el nombre del perfume
            perfume.nombre.toLowerCase().includes(lowerCaseSearchTerm)
        );
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

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Buscar perfumes por nombre..."
            />

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