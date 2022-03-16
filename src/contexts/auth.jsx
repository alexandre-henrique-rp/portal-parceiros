/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clienteHttp, createSession } from '../service/api';
import Cookies from 'universal-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
     const nanvigate = useNavigate();
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);
     const cookies = new Cookies();
     
     useEffect(() => {
          
          const token = cookies.get('token');
          const recoveredUser = cookies.get('userId', 'userNome', 'userPolo');
          // const recoveredUser = localStorage.getItem('user');
          // const token = localStorage.getItem('token');
     
          if (recoveredUser && token) {
               setUser(JSON.parse(recoveredUser));
               clienteHttp.defaults.headers.Authorization = `Bearer ${token}`;
          }
          setLoading(false);
     }, [])

     const login = async (email, senha) => {
          const response = await createSession(email, senha)
          
          // console.log("login", response.data);

          const loggedUser = response.data.user;
          const token = response.data.token;
          cookies.set('token', token, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
          cookies.set('userId', loggedUser.id, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
          cookies.set('userName', loggedUser.nome, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
          cookies.set('userPolo', loggedUser.numeropolo, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
          
          // localStorage.setItem("user", JSON.stringify(loggedUser));
          // localStorage.setItem("token", token);

          clienteHttp.defaults.headers.Authorization = `Bearer ${token}`;

          setUser(loggedUser);
          nanvigate("/");
     };
     const logout = () => {
          // console.log("logout");
          cookies.remove("token");
          cookies.remove("user");
          // localStorage.removeItem("user");
          // localStorage.removeItem("token");
          clienteHttp.defaults.headers.Authorization = null;
          setUser(null);
          nanvigate("/login");
     };

     return (
          <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
               {children}
          </AuthContext.Provider>
     )
}