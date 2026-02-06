import { createContext, useState, useEffect } from "react";
// Creamos el contexto
const UserContext = createContext();
// Proveedor del contexto
export const UserProvider = ({ children }) => {
    // Estado para el login del usuario
    const [userLogged, setUserLogged] = useState(false);
    // Al montar, comprobamos si hay usuario logueado en localStorage
    useEffect(() => {
        const stored = localStorage.getItem("userLogged");
        if (stored === "true") {
            setUserLogged(true);
        }
    }, []);
    // Función para hacer login (simulado)
    const login = () => {
        setUserLogged(true);
        localStorage.setItem("userLogged", "false");
    };
    // Función para hacer logout
    const logout = () => {
        setUserLogged(false);
        localStorage.removeItem("userLogged");
    };
    return (
        <UserContext.Provider value={{ userLogged, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserContext };