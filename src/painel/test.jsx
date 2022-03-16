/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './painel.css';
import { Modal, Button, Form, Row, InputGroup, Alert, FloatingLabel, Table, Spinner } from 'react-bootstrap';
import { FaRegEnvelopeOpen } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import { addcliente, getCliente } from '../service/api';
import { hot } from 'react-hot-loader/root';
import Cookies from 'universal-cookie';
import ListaEdit from './registro/edit';



function Test() {
     const [cliente, setCliente] = useState([])
     const [loading, setLoading] = useState(true);
     const [show, setShow] = useState(false);
     const [pagamento, setPagamento] = useState('');
    



     const [dt_agenda, setDt_agenda] = useState('');
     const [nome, setNome] = useState('');
     const [email, setEmail] = useState('');
     const [rg, setRg] = useState('');
     const [cpf, setCpf] = useState('');
     const [cnpj, setCnpj] = useState('');
     const [unidade, setUnidade] = useState('');
     const [tipocd, setTipocd] = useState('');
     const [hr_agenda, setHr_agenda] = useState('');
     const [fomapgto, setFomapgto] = useState('');
     const [valorcd, setValorcd] = useState('');
     const [ct_parcela, setCt_parcela] = useState('');
     const [telefone, setTelefone] = useState('');
     const [dt_nascimento, setDt_nascimento] = useState('');
     const [reg_cnh, setReg_cnh] = useState('');
     const [cei, setCei] = useState('');
     const [razaosocial, setRazaosocial] = useState('');
     const [validacao, setValidacao] = useState('');

     const cookies = new Cookies();



     var alert = false;

     const alertB = pagamento === "Boleto" ? () => alert(true) : "";
     const alertP = pagamento === "Pendura" ? () => alert(true) : "";
     const price = pagamento === "Pendura" ? "disabled" : "";
     const credt = pagamento === "Cartao credito" ? "" : "disabled";
     const certPF = tipocd === "A1PF" ? "disabled" : tipocd === "A3PF" ? "disabled" : "";
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
     

     useEffect(() => {
          (async () => {
               const respota = await getCliente(userNumber);
               setLoading(false);
               setCliente(respota.data);
               setFomapgto(pagamento);
               setUnidade(userNumber);
               setValidacao("VIDEO CONF.");
          })();

     }, []);

    
     const recoveredUser = cookies.get('userPolo');
     const userNumber = JSON.parse(recoveredUser);


     const send = () => {
          Saveinfo(dt_agenda, nome, email, rg, cpf, cnpj, unidade, tipocd, hr_agenda, fomapgto, valorcd, ct_parcela, telefone, dt_nascimento, reg_cnh, cei, razaosocial, validacao);
          handleClose();
     }


     const Saveinfo = async (dt_agenda, nome, email, rg, cpf, cnpj, unidade, tipocd, hr_agenda, fomapgto, valorcd, ct_parcela, telefone, dt_nascimento, reg_cnh, cei, razaosocial, validacao) => {
          const response = await addcliente(dt_agenda, nome, email, rg, cpf, cnpj, unidade, tipocd, hr_agenda, fomapgto, valorcd, ct_parcela, telefone, dt_nascimento, reg_cnh, cei, razaosocial, validacao);

          const newCliente = await cliente;
          setCliente(oldCliente => [...oldCliente, newCliente])

          console.log("Save", response.data);
     };


    



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




     return (
          <>
               <div className="overflow-auto tabelaProcesso">
                    <Table responsive="sm">
                         <thead>
                              <tr>
                                   <th>Id</th>
                                   <th>Nome/Razão</th>
                                   <th>Tipo de certificado</th>
                                   <th>Status</th>
                                   <th>Voucher</th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                                   <th></th>

                              </tr>
                         </thead>
                         <tbody>
                              <ListaEdit />
                         </tbody>
                    </Table>
               </div>

               <div>
                    <a variant="primary" className="iconAdd float-end" onClick={handleShow}>
                         <BsPlusCircle />
                    </a>

                    <Modal
                         size="lg"
                         show={show}
                         onHide={handleClose}
                         backdrop="static"
                         keyboard={true}
                         centered
                    >

                         <Modal.Header closeButton>
                              <Modal.Title>Central De Agendamento</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>

                              <Form>
                                   <Row className="mb-5 mt-3">
                                        <Form.Group className="col-lg-6 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="Data Agendamento">
                                                  <Form.Control type="date" placeholder="Data Agendamento" value={dt_agenda} onChange={(e) => setDt_agenda(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="col-lg-6 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="Hora Agendamento">
                                                  <Form.Control type="time" placeholder="Hora Agendamento" onChange={(e) => setHr_agenda(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="col-lg-6 mb-2">
                                             <FloatingLabel controlId="floatingSelect" label="Tipo de Certificado">
                                                  <Form.Select onChange={e => setTipocd(e.target.value)}>
                                                       <option> </option>
                                                       <option value="A1PF">A1PF</option>
                                                       <option value="A3PF">A3PF</option>
                                                       <option value="A1PJ">A1PJ</option>
                                                       <option value="A3PJ">A3PJ</option>
                                                  </Form.Select>
                                             </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="col-lg-6 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="Forma de pagamento">
                                                  <Form.Select onChange={e => setPagamento(e.target.value)}>
                                                       <option> </option>
                                                       <option value="Boleto">Boleto</option>
                                                       <option value="PIX">Pix</option>
                                                       <option value="Cartao credito">Cartão credito</option>
                                                       <option value="Pendura">Pendura</option>
                                                  </Form.Select>
                                             </FloatingLabel>
                                        </Form.Group>

                                        <Alert show={alertB} variant="danger" onClose={alert} className="p-1 col-lg-11 mx-auto mb-2 mt-2">
                                             <Alert.Heading className="col text-md-center">Atenção!!!</Alert.Heading>
                                             <p className="col text-md-center">
                                                  A Rede Brasil Rp Não aceita divisão na Forma de pagamento Boleto,
                                                  e os Boletos gerando, tem 5 dias úteis para o vencimento!
                                             </p>
                                        </Alert>

                                        <Alert show={alertP} variant="danger" onClose={alert} className="p-1 col-lg-11 mx-auto mb-2 mt-2">
                                             <Alert.Heading className="text-md-center">Atenção!!!</Alert.Heading>
                                             <p className="pb-0 text-md-center">
                                                  Método Pendura sera cobrado posteriormente do AGR!
                                             </p>
                                        </Alert>
                                        <Form.Group className="col-lg-6 mb-2 mb-2 disabled">
                                             <FloatingLabel controlId="floatingInput" label="valor da venda">
                                                  <Form.Control type="text" placeholder="valor da venda" disabled={price} onChange={e => setValorcd(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>




                                        <Form.Group className="col-lg-3 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="Método Credito">
                                                  <Form.Select disabled={credt} onChange={e => setCt_parcela(e.target.value)}>
                                                       <option> </option>
                                                       <option value="A vista">A vista</option>
                                                       <option value="2 x">2 X</option>
                                                       <option value="3 x">3 X</option>
                                                  </Form.Select>
                                             </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="col-lg-3 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="Whatsapp">
                                                  <Form.Control type="tel" placeholder="Whatsapp" onChange={e => setTelefone(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>
                                        <Row className="col-lg-12">

                                             <InputGroup className="col-lg mb-2">
                                                  <InputGroup.Text><FaRegEnvelopeOpen /></InputGroup.Text>
                                                  <FloatingLabel controlId="floatingInput" label="E-mail" className="col">
                                                       <Form.Control placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
                                                  </FloatingLabel>
                                             </InputGroup>
                                        </Row>

                                        <Form.Group className="mb-2">
                                             <FloatingLabel controlId="floatingInput" label="Nome completo">
                                                  <Form.Control type="text" placeholder="Nome completo" onChange={e => setNome(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>

                                        <Form.Group className="col-lg-6 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="CPF">
                                                  <Form.Control type="text" placeholder="CPF" onChange={e => setCpf(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="col-lg-6 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="RG">
                                                  <Form.Control type="text" placeholder="Rg" onChange={e => setRg(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="col-lg-6 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="Data de Nascimento">
                                                  <Form.Control type="date" placeholder="Data de Nascimento" onChange={e => setDt_nascimento(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>



                                        <Form.Group className="col-lg-6 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="Numero da CNH">
                                                  <Form.Control type="number" placeholder="Numero da CNH" onChange={e => setReg_cnh(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>


                                        <Form.Group className="col-lg-6 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="Mat. CEI">
                                                  <Form.Control type="text" placeholder="Mat. CEI" onChange={e => setCei(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="col-lg-6 mb-2">
                                             <FloatingLabel controlId="floatingInput" label="CNPJ">
                                                  <Form.Control type="text" placeholder="CNPJ" disabled={certPF} onChange={e => setCnpj(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>


                                        <Form.Group className="mb-2">
                                             <FloatingLabel controlId="floatingInput" label="Razão Social">
                                                  <Form.Control type="text" placeholder="Razão Social" disabled={certPF} onChange={e => setRazaosocial(e.target.value)} />
                                             </FloatingLabel>
                                        </Form.Group>

                                   </Row>
                                   <Button variant="success" onClick={send} className="col-12 mb-4">
                                        Salvar
                                   </Button>
                              </Form>
                         </Modal.Body>
                    </Modal>

                    {/* edit */}


               </div>
          </>

     )
}

export default hot(Test);