/**
 * Detalle - Product detail page component for displaying individual perfume information
 * 
 * This component displays detailed information about a selected perfume product,
 * including name, category, description, price, and purchase options. It retrieves
 * the perfume data based on the product ID from the URL parameters.
 * 
 * @component
 * @returns {JSX.Element} A section containing the perfume details with navigation
 * and purchase functionality, or an error message if the product is not found.
 * 
 * @example
 * // This component is typically used with React Router
 * <Route path="/detalle/:id" element={<Detalle />} />
 * 
 * @remarks
 * - Uses React Router's useParams hook to extract the perfume ID from the URL
 * - Uses React Router's useNavigate hook to handle navigation back to the shop
 * - The perfume ID is expected to be a valid numeric index from the perfumes array
 * - Includes accessibility features with ARIA labels and semantic HTML
 * 
 * @throws Will display an error message if the perfume with the given ID is not found
 */
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOnePerfume } from '../hooks/useGetOnePerfume';
import { deletePerfume } from '../services/PerfumeService';
import { useDeletePerfume } from '../hooks/useDeletePerfume';

function Detalle() {
    // Eliminamos el estado y la función setImageError

    const { id } = useParams();
    const navigate = useNavigate();

    const { removePerfume } = useDeletePerfume(id)
    const { perfume: perfume, loading, error } = useGetOnePerfume(id)

    const handleDelete = async () => {
        const idToDelete = perfume?._id ?? perfume?.id
        if (!idToDelete) {
            alert('ID de producto no disponible para eliminar.')
            return
        }

        const ok = window.confirm('¿Estás seguro de que quieres eliminar este perfume?')
        if (!ok) return

        try {
            await removePerfume(idToDelete)
            navigate('/tienda')
        } catch (err) {
            const msg = err?.response?.data?.message || err.message || 'Error al eliminar'
            alert(msg)
        }
    }

    if (loading) {
        return <p>Cargando</p>
    }

    if (error != null) {
        return <p>{error}</p>
    }

    // Manejo de error o producto no encontrado
    if (!perfume) {
        return (
            <section className="detalle-contenedor secondary-bg" role="alert" aria-labelledby="error-title">
                <h1 id="error-title" className="detalle-titulo">Perfume no encontrado</h1>
                <p>El código de producto no existe en nuestro catálogo.</p>
                <button
                    onClick={() => navigate('/tienda')}
                    className="detalle-button-regresar"
                    aria-label="Volver a la tienda de perfumes"
                >
                    Volver a la tienda
                </button>
            </section>
        );
    }

    // Eliminamos la definición de placeholderUrl

    return (
        <section className="detalle-contenedor secondary-bg" aria-labelledby="perfume-name-title">

            <button
                onClick={() => navigate('/tienda')}
                className="detalle-button-regresar"
                aria-label="Volver a la tienda de perfumes"
            >
                &larr; Volver a la Tienda
            </button>

            <div className="detalle-contenido">

                <figure className="detalle-imagen-col">
                    <img
                        // Fuente de imagen con fallback a `photo` del backend
                        src={perfume.imagen ?? perfume.photo}
                        alt={`Botella de perfume ${perfume.nombre ?? perfume.name}: ${perfume.descripcion ?? perfume.description}`}
                        className="detalle-imagen"
                    />
                    <figcaption className="sr-only">Imagen de la botella de perfume {perfume.nombre ?? perfume.name}</figcaption>
                </figure>

                <div className="detalle-info-col">

                    <h1 id="perfume-name-title" className="detalle-titulo">{perfume.nombre ?? perfume.name}</h1>

                    <p className="detalle-categoria">
                        <span className="detalle-label">Categoría:</span> <strong>{perfume.categoria ?? perfume.category}</strong>
                    </p>

                    <div className="detalle-descripcion-box">
                        <h2 className="detalle-subtitulo">Detalles de la Fragancia</h2>
                        <p className="detalle-descripcion">{perfume.descripcion ?? perfume.description}</p>
                    </div>

                    <p className="detalle-precio" aria-live="polite">
                        Precio: €{perfume.precio ?? perfume.price}
                    </p>

                    <div className="detalle-acciones">
                        <button
                            className="detalle-button-comprar"
                            aria-label={`Añadir ${perfume.nombre ?? perfume.name} al carrito de compras`}
                        >
                            Añadir {perfume.nombre ?? perfume.name} al carrito
                        </button>

                        <button
                            onClick={handleDelete}
                            className="detalle-button-eliminar"
                            aria-label={`Eliminar ${perfume.nombre ?? perfume.name}`}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Detalle;