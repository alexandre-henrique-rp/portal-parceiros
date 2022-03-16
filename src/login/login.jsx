/* eslint-disable jsx-a11y/anchor-is-valid */
import './login.css';
import { Form, Button } from 'react-bootstrap';
import LOGO from '../img/LOGO.svg';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth';



export default function Login() {
     const { login } = useContext(AuthContext);


     const [email, setEmail] = useState('');
     const [senha, setSenha] = useState('');

     const handleSubmit = (e) => {
          e.preventDefault();

          // console.log("submit", { email, senha });
          login(email, senha);
     };


     return (
          <div className="corpoLogin">
               <div className="container-lg corpoLogin">
                    <div className="row justify-content-center gridPosition">
                         <div className="col-lg-12 gridLogin">
                              <div className="col-lg-6 gridLogo">
                                   <div className="logo">
                                        <img src={LOGO} alt="" />
                                   </div>
                              </div>
                              <div className="col-lg-6 login">
                                   <div className="text-lg-center text-uppercase">
                                        <h1>Login</h1>
                                   </div>
                                   <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                             <Form.Label className="text-center">Email address</Form.Label>
                                             <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                             <Form.Label className="text-center">Password</Form.Label>
                                             <Form.Control type="password" placeholder="Password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                             <Form.Text className="text-muted">
                                                  <a href="https://api.whatsapp.com/send?phone=551633254134&text=Oi%20Esqueci%20minha%20senha%20no%20portal%20do%20associados">
                                                       Esqueci minha senha
                                                  </a>
                                             </Form.Text>
                                        </Form.Group>
                                        <Button variant="success" type="submit" className="BTMLogin">
                                             Entrar
                                        </Button>
                                   </Form>

                              </div>
                         </div>


                    </div>
               </div>
          </div>
          
     )
}