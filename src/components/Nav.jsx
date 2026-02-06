/**
 * Navigate - Responsive mobile navigation component.
 *
 * Renders a burger button that toggles a mobile navigation menu and a set of NavLink items.
 * Internally uses the useState hook to manage an "open" boolean:
 *  - open: boolean flag indicating whether the mobile menu is open.
 *  - setOpen: state updater used to toggle the menu.
 *  - closeMenu: convenience function that sets open to false to close the menu (used on link clicks).
 *
 * Accessibility:
 *  - The toggle button updates aria-expanded to reflect the open state.
 *  - aria-controls references the nav element with id "main-navigation".
 *  - aria-label switches between "Abrir menú principal" and "Cerrar menú principal" depending on open.
 *
 * Markup behavior:
 *  - The nav element has id="main-navigation" and className "nav-links".
 *  - When open is true, the nav element receives the additional class "nav-mobile-open".
 *  - Each NavLink calls closeMenu on click to close the mobile menu after navigation.
 *
 * @component
 * @returns {JSX.Element} A navigation block with a burger toggle and NavLink items for "Inicio", "Tienda" and "Admin".
 * @example
 * <Navigate />
 */
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navigate() {
    const [open, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);
    const { userLogged, login, logout } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <div className="nav-container-movil">
            <button
                className="burger-button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls="main-navigation"
                aria-label={open ? "Cerrar menú principal" : "Abrir menú principal"}
            >
                ☰
            </button>

            <nav
                id="main-navigation"
                className={`nav-links ${open ? "nav-mobile-open" : ""}`}
            >
                <NavLink to='/inicio' onClick={closeMenu}>Inicio</NavLink>
                <NavLink to='/tienda' onClick={closeMenu}>Tienda</NavLink>
                <NavLink to='/admin' onClick={closeMenu}>Admin</NavLink>

                {userLogged ?
                    <button
                        className="nav-button"
                        onClick={logout}
                    >
                        Logout
                    </button>
                    :
                    <button
                        className="nav-button"
                        onClick={() => { navigate("/admin") }}
                    >
                        Login
                    </button>
                }

            </nav>
        </div>
    );
}

export default Navigate

