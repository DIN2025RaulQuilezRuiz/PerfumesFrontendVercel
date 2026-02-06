/**
 * Componente Inicio
 *
 * Componente funcional que renderiza un encabezado de bienvenida para la aplicación FRASCO.
 *
 * @module /src/pages/Inicio.jsx
 *
 * @component
 * @returns {JSX.Element} Un elemento <h1> con la clase CSS "contenedor__h1" y el texto "Bienvenidos a FRASCO".
 *
 * @example
 * // Uso:
 * // <Inicio />
 */
import '../assets/index.css'

function Inicio() {
  return (
    <h1 className="contenedor__h1">Bienvenidos a FRASCO</h1>
  )
}

export default Inicio