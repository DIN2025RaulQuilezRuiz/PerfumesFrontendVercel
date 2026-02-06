/**
 * Perfume card component that displays perfume information in a navigable card format.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {number} props.indexPerfume - The unique identifier/index of the perfume product
 * @param {string} props.foto - The URL/path of the perfume bottle image
 * @param {string} props.nombre - The name of the perfume product
 * @param {React.ReactNode} props.children - The description text or content of the perfume
 * 
 * @returns {React.ReactElement} A linked card component displaying the perfume details
 * 
 * @example
 * <Perfume 
 *   indexPerfume={1} 
 *   foto="/images/perfume1.jpg" 
 *   nombre="Eau de Toilette"
 * >
 *   Fresh and elegant fragrance
 * </Perfume>
 */
import { Link } from 'react-router-dom';

function Perfume({ indexPerfume, foto, nombre, children }) { 
    return (
        <Link 
            to={`/tienda/detalle/${indexPerfume}`} 
            className="no-underline text-inherit"
            aria-label={`Ver detalles del perfume ${nombre}`}
        > 
            <article
                tabIndex="0" 
                className="card-layout secondary-bg" 
            >
                <figure className="perfume-imagen-contenedor"> 
                    <img
                        src={foto}
                        alt={`Botella de perfume ${nombre}`}
                        loading="lazy"
                        className="perfume-imagen"
                    /> 
                    <figcaption className="sr-only">Botella de perfume {nombre}: {children}</figcaption>
                </figure>

                <header>
                    <h2 className="perfume-titulo-card"> 
                        <strong>{nombre}</strong>
                    </h2>
                </header>
                
                <p className="perfume-descripcion-texto">
                    {children} 
                </p>
            </article>

        </Link> 
    );
}

export default Perfume;

