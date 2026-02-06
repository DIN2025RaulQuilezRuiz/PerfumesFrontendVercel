/**
 * Formulario component for adding new perfumes to the catalog
 * 
 * Manages a form with the following fields:
 * - nombre (string): Perfume name - required
 * - descripcion (string): Perfume description - optional, minimum 20 characters if provided
 * - precio (number): Perfume price - required, must be a valid positive decimal
 * - categoria (string): Perfume category - required, options: 'masculino' or 'femenino'
 * - imagen (string): Image URL - optional, must start with 'http' if provided
 * 
 * @component
 * @returns {JSX.Element} A form section for perfume data input with validation and error handling
 * 
 * @example
 * return (
 *   <Formulario />
 * )
 * 
 * @state {Object} perfumeData - Form data state containing nombre, descripcion, precio, categoria, and imagen
 * @state {string} error - Error message state for form validation feedback
 * 
 * @function handleChange - Updates perfumeData state and clears error message on input change
 * @param {Event} e - The change event from form inputs
 * 
 * @function handleSubmit - Validates form data and displays success alert with perfume information
 * @param {Event} e - The form submission event
 * @validation Validates required fields, description length, price format and range, and image URL format
 */
import { useState } from "react";
import { usePostPerfume } from "../hooks/usePostPerfume";

export default function Formulario() {

    const [perfumeData, setPerfumeData] = useState({
        nombre: "", descripcion: "", precio: "", categoria: "", imagen: ""
    })

    const [error, setError] = useState("");

    const { addPerfume, loading, error: err } = usePostPerfume()

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPerfumeData((prev) => ({
            ...prev,
            [id]: value,
        }));
        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!perfumeData.nombre.trim() || !perfumeData.precio || !perfumeData.categoria) {
            setError("El nombre, la categoría y el precio son obligatorios.");
            return;
        }

        // El backend exige `description` como required (schema). Hacemos la validación aquí.
        if (!perfumeData.descripcion || perfumeData.descripcion.length < 20) {
            setError("La descripción es obligatoria y debe tener al menos 20 caracteres.");
            return;
        }

        const precioNumero = parseFloat(perfumeData.precio);
        if (isNaN(precioNumero) || precioNumero < 0) {
            setError("El precio debe ser un número decimal válido (ej. 12.00).");
            return;
        }

        if (perfumeData.imagen && !perfumeData.imagen.startsWith("http")) {
            setError("La URL de la imagen debe empezar por http.");
            return;
        }

        const success = await addPerfume({
            ...perfumeData,
            precio: precioNumero
        })

        if (!success) {
            // show server error (from hook) or generic message
            setError(err || 'Error al enviar el perfume. Revisa los campos.');
            return;
        }

        setError("");
        alert("Perfume enviado correctamente\n" +
            (perfumeData.nombre +
                "\n" + perfumeData.precio +
                "\n" + perfumeData.categoria +
                "\n" + perfumeData.descripcion +
                "\n" + perfumeData.imagen));
    }
    return (
        <>
            <section className="detalle-contenedor bg-white">
                <h3 className="detalle-titulo">Añadir un nuevo perfume</h3>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

                    <div className="flex flex-col">
                        <label htmlFor="nombre" className="detalle-subtitulo">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            value={perfumeData.nombre}
                            onChange={handleChange}
                            className="search-input"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="descripcion" className="detalle-subtitulo">
                            Descripción
                        </label>
                        <input
                            id="descripcion"
                            type="text"
                            value={perfumeData.descripcion}
                            onChange={handleChange}
                            className="search-input"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="precio" className="detalle-subtitulo">
                            Precio
                        </label>
                        <input
                            id="precio"
                            type="number"
                            step="0.01"
                            min="0"
                            value={perfumeData.precio}
                            onChange={handleChange}
                            className="search-input"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="categoria" className="detalle-subtitulo">
                            Categoría
                        </label>
                        <select
                            id="categoria"
                            value={perfumeData.categoria}
                            onChange={(e) => handleChange({ target: { id: 'categoria', value: e.target.value } })}
                            className="search-input"
                        >
                            <option value="" disabled>Seleccione una opción...</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="imagen" className="detalle-subtitulo">
                            Imagen URL
                        </label>
                        <input
                            id="imagen"
                            type="url"
                            value={perfumeData.imagen}
                            onChange={handleChange}
                            className="search-input"
                        />
                    </div>

                    {(error || err) && (
                        <p className="text-red-600 font-bold bg-red-100 p-3 rounded border border-red-400">
                            {error || err}
                        </p>
                    )}

                    <button type="submit" className="detalle-button-comprar">Enviar</button>
                </form>
            </section>
        </>
    )
}