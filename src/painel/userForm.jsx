/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { getUsuarios, updateUsuarios } from '../service/api';
import { Spinner } from "react-bootstrap";
import axios from 'axios';






export default function UserForm() {
     const { logout } = useContext(AuthContext);
     const [usuario, setUsuario] = useState("");
     const [loading, setLoading] = useState(true);

     const [logradouro, setLogradouro] = useState('');
     const [bairro, setBairro] = useState('');
     const [municipio, setMunicipio] = useState('');
     const [uf, setUf] = useState('');

     const [nome, setNome] = useState('');
     const [cpf, setCpf] = useState('');
     const [nascimento, setNascimento] = useState('');
     const [rg, setRg] = useState('');
     const [numero, setNumero] = useState('');
     const [complemento, setComplemento] = useState('');
     const [cep, setCep] = useState('');

     const [whatsapp, setWhatsapp] = useState('');
     const [chavepix, setChavepix] = useState('');
     const [tipopix, setTipopix] = useState('');

     const [rua, setRua] = useState('');
     const [cidade, setCidade] = useState('');
     const [estado, setEstado] = useState('');
     const [nomeBairro, setNomeBairro] = useState('');

     useEffect(() => {
          (async () => {
               const respota = await getUsuarios(userId);
               setLoading(false);
               setUsuario(respota.data);
          })();
     }, []);


     const handleLogout = () => {
          logout();
     }
     const recoveredUser = localStorage.getItem('user');
     const userId = JSON.parse(recoveredUser).id;


     if (loading) {
          return (
               <div className="container">

                    <Spinner animation="border" role="status">
                         <span className="visually-hidden mt-5">
                              Carregando...
                         </span>
                    </Spinner>
               </div>
          )
     }

     // estilos---------------------------------

     const chekCep = (e) => {
          const cep = e.target.value.replace(/\D/g, '');
          axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(function (response) {
               // console.log(response);
               setRua(response.data.logradouro);
               setNomeBairro(response.data.bairro);
               setCidade(response.data.localidade);
               setEstado(response.data.uf);
          })
     }
     const update = () => {
          Save(userId, nome, cpf, nascimento, rg, logradouro, numero, complemento, bairro, cep, municipio, uf, whatsapp, chavepix, tipopix);
     }


     const Save = async (userId, nome, cpf, nascimento, rg, logradouro, numero, complemento, bairro, cep, municipio, uf, whatsapp, chavepix, tipopix) => {

          const response = await updateUsuarios(userId, nome, cpf, nascimento, rg, logradouro, numero, complemento, bairro, cep, municipio, uf, whatsapp, chavepix, tipopix);
          console.log("Save", response.data);
     };


     return (
          <div>
               <Form key={usuario.idagrv}>
                    <Row>
                         <Form.Group className="mb-2">
                              <Form.Label>Nome completo</Form.Label>
                              <Form.Control type="text" placeholder={usuario.nome} value={nome} onChange={(e) => setNome(e.target.value)} />
                         </Form.Group>

                         <Form.Group className="col-md-6 mb-2">
                              <Form.Label>CPF</Form.Label>
                              <Form.Control type="text" placeholder={usuario.cpf} value={cpf} onChange={(e) => setCpf(e.target.value)} />
                         </Form.Group>
                         <Form.Group className="col-md-6 mb-2">
                              <Form.Label>RG</Form.Label>
                              <Form.Control type="text" placeholder={usuario.rg} value={rg} onChange={(e) => setRg(e.target.value)} />
                         </Form.Group>
                         <Form.Group className="col-md-6 mb-2">
                              <Form.Control type="date" placeholder={usuario.nascimento} value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
                              <Form.Label>Data de Nascimento</Form.Label>
                         </Form.Group>
                         <Form.Group className="col-md-6 mb-2">
                              <Form.Control type="tel" placeholder={usuario.whatsapp} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                              <Form.Label>Whatsapp</Form.Label>
                         </Form.Group>
                    </Row>
                    <Row className="mb-4">
                         <Form.Group className="mb-2">
                              <Form.Label>Chave Pix</Form.Label>
                              <Form.Control type="text" placeholder={usuario.chavepix} value={chavepix} onChange={(e) => setChavepix(e.target.value)} />
                         </Form.Group>

                         <Form.Group>
                              <Form.Label>Modelo chave Pix</Form.Label>
                              <Form.Select aria-label="Modelo chave Pix"  onChange={(e) => setTipopix(e.target.value)}>
                                   <option value={usuario.tipopix}>{usuario.tipopix}</option>
                                   <option value={tipopix}></option>
                                   <option value="CPF/CNP">CPF/CNPJ</option>
                                   <option value="Celular">Celular</option>
                                   <option value="E-mail">E-mail</option>
                                   <option value="Chave Aleatória">Chave Aleatória</option>
                              </Form.Select>
                         </Form.Group>

                    </Row>
                    <Row className="mb-2">
                         <Form.Group className="col-md-5">
                              <Form.Label>CEP</Form.Label>
                              <Form.Control type="text" placeholder={usuario.cep} onBlur={chekCep} onChange={(e) => setCep(e.target.value)} />
                         </Form.Group>
                         <Form.Group className="col-md-3">
                              <Form.Label>UF</Form.Label>
                              <Form.Control type="text" placeholder={usuario.uf} value={estado} onChange={(e) => setUf(e.target.value)} />
                         </Form.Group>
                         <Form.Group className="col-md-3">
                              <Form.Label>N°</Form.Label>
                              <Form.Control type="text" placeholder={usuario.numero} value={numero} onChange={(e) => setNumero(e.target.value)} />
                         </Form.Group>
                    </Row>
                    <Form.Group className="mb-2">
                         <Form.Label>Rua</Form.Label>
                         <Form.Control type="text" placeholder={usuario.logradouro} value={rua} onChange={(e) => setLogradouro(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                         <Form.Label>Complemento</Form.Label>
                         <Form.Control type="text" placeholder={usuario.complemento} value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                         <Form.Label>Bairro</Form.Label>
                         <Form.Control type="text" placeholder={usuario.bairro} value={nomeBairro} onChange={(e) => setBairro(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-5">
                         <Form.Label>municipio</Form.Label>
                         <Form.Control type="text" placeholder={usuario.municipio} value={cidade} onChange={(e) => setMunicipio(e.target.value)} />
                    </Form.Group>

                    <p>preços de certificados</p>
                    <Row className="mb-3">
                         <p className="col-md-5">A1PF = R${usuario.a1pf_12m}</p>
                         <p className="col-md-5">A3PF = R${usuario.a3pf_36m}</p>
                         <p className="col-md-5">A1PJ = R${usuario.a1pj_12m}</p>
                         <p className="col-md-5">A3PJ = R${usuario.a3pj_36m}</p>
                    </Row>
                    <Button variant="success" className="mb-3 col-12" onClick={update} >
                         Salvar
                    </Button>

                    <Button variant="dark" className="col-12" onClick={handleLogout}>
                         Logout
                    </Button>
               </Form>
          </div>
     );
}

