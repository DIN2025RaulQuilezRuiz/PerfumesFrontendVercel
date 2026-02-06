import '../assets/index.css';

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {login} = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <>
            <h1 className="contenedor__h1">Login</h1>
            <section className="detalle-contenedor bg-white flex flex-col items-center justify-center p-8">
                <button 
                    className="detalle-button-comprar w-full max-w-xs"
                    onClick={() => {login(), navigate("/admin")}}
                >
                    Iniciar Sesión
                </button>
            </section>
        </>
    );
};

export default Login;
