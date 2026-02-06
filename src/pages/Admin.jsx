/**
 * Admin page component that displays the administration interface.
 * 
 * @component
 * @returns {JSX.Element} The admin page with a title and a form component.
 */
import Formulario from "../components/Formulario"

function Admin(){
    return(
        <>
        <p id="tienda-title" className="contenedor__h1 mt-4">Esta es la página de Administración</p>

        <Formulario/>
        </>
    )
    
}

export default Admin