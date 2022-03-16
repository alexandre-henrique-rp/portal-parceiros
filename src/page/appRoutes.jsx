import { BrowserRouter as Routers, Route, Routes, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Painel from '../painel/painel';
import Login from '../login/login';
import { AuthProvider, AuthContext } from '../contexts/auth';
import { Spinner } from "react-bootstrap";
import ModalEdit from '../painel/componente/modalEdit';


export default function AppRoutes() {
     
     const Private = ({ children }) => {
          const nanvigate = useNavigate();
          const { authenticated, loading } = useContext(AuthContext);
          if (loading) {
               return <Spinner animation="border" role="status">  <span className="visually-hidden">Carregando...</span></Spinner>
          }
          if (!authenticated) {
               return nanvigate("/login");
          }
          return children;
     };

     return (
          <Routers>
               <AuthProvider>
                    <Routes>
                         <Route exact path="/login" element={<Login />} />
                         <Route exact path="/" element={<Private><Painel /></Private>} />
                         <Route exact path="/editar" element={<Private><ModalEdit /></Private>} />
                    </Routes>
               </AuthProvider>
          </Routers>
     );
}