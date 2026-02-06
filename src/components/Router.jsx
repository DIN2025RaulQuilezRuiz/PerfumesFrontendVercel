import { Routes, Route, Navigate } from 'react-router-dom';

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import Contenedor from './Contenedor';
import Inicio from '../pages/Inicio';
import Tienda from '../pages/Tienda';
import Detalle from '../pages/Detalle';
import Admin from '../pages/Admin';
import Login from '../pages/Login'


const PrivateRoute = ({children}) => {
  const {userLogged} = useContext(UserContext)
  if (!userLogged) {
    return <Navigate to="/login" replace/>
  }
  return children
}

export default function Router() {
    return (
        <>
            <Routes>
                <Route element={<Contenedor />}>
                    <Route path='/' element={<Inicio />} />
                    <Route path='/inicio' element={<Navigate to='/' />} />
                    <Route path='/tienda' element={<Tienda />} />
                    <Route path='/tienda/detalle/:id' element={<Detalle />} />
                    <Route path='/admin' element={<PrivateRoute><Admin/></PrivateRoute>} />
                    <Route path='/login' element={<Login />} />
                </Route>

                <Route
                    path="*"
                    element={
                        <Contenedor titulo="Página no encontrada">
                            <p>La ruta no existe</p>
                        </Contenedor>
                    }
                />
            </Routes>
        </>
    )
}    