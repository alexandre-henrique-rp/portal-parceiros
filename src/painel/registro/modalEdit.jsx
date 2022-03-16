/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Alert, FloatingLabel, Form, InputGroup, Button, Spinner, Modal, Row } from "react-bootstrap"
import { FaRegEnvelopeOpen } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { updateCliente, getEdtCliente } from "../../service/api";



export default function ModalEdit() {

     const show = () => true;
     const [cliente, setCliente] = useState([]);
     const [id, setId] = useState('');
     const [dt_agenda, setDt_agenda] = useState('');
     const [nome, setNome] = useState('');
     const [email, setEmail] = useState('');
     const [rg, setRg] = useState('');
     const [cpf, setCpf] = useState('');
     const [cnpj, setCnpj] = useState('');
     const [tipocd, setTipocd] = useState('');
     const [hr_agenda, setHr_agenda] = useState('');
     const [formapgto, setFormapgto] = useState('');
     const [valorcd, setValorcd] = useState('');
     const [ct_parcela, setCt_parcela] = useState('');
     const [telefone, setTelefone] = useState('');
     const [dtnascimento, setDtnascimento] = useState('');
     const [reg_cnh, setReg_cnh] = useState('');
     const [cei, setCei] = useState('');
     const [razaosocial, setRazaosocial] = useState('');
     const [loading, setLoading] = useState(true);
     const cookies = new Cookies();
     const nanvigate = useNavigate();


     useEffect(() => {
          (async () => {
               const respota = await getEdtCliente(userNumber);
               setCliente(respota.data);
               setLoading(false);
               setId(userNumber);
          })();
     }, []);

     var alert = false;


     const alertB = formapgto === "Boleto" ? () => alert(true) : "";
     const alertP = formapgto === "Pendura" ? () => alert(true) : "";
     const price = formapgto === "Pendura" ? "disabled" : "";
     const credt = formapgto === "Cartao credito" ? "" : "disabled";
     const certPF = tipocd === "A1PF" ? "disabled" : tipocd === "A3PF" ? "disabled" : "";

  

     const update = () => {
          upinfo(id, nome, cpf, rg, dtnascimento, reg_cnh, razaosocial, cei, cnpj, telefone, ct_parcela, valorcd, tipocd, formapgto, hr_agenda, email, dt_agenda);
          nanvigate("/");
     }


     const upinfo = async (id, nome, cpf, rg, dtnascimento, reg_cnh, razaosocial, cei, cnpj, telefone, ct_parcela, valorcd, tipocd, formapgto, hr_agenda, email, dt_agenda) => {
          const response = await updateCliente(id, nome, cpf, rg, dtnascimento, reg_cnh, razaosocial, cei, cnpj, telefone, ct_parcela, valorcd, tipocd, formapgto, hr_agenda, email, dt_agenda);
          Cookies.remove("user");
          console.log("Save", response.data);
     };

     const retur = () => {
          cookies.remove("user");
          nanvigate("/");
     }

     const recoveredCliente = cookies.get('clienteId');
     const userNumber = JSON.parse(recoveredCliente);
     

     useEffect(() => { data() }, [cliente]);
     
     const data = () => {
          setDt_agenda(cliente.dt_agenda);
          setHr_agenda(cliente.hr_agenda);
          setNome(cliente.nome);
          setEmail(cliente.email);
          setRg(cliente.rg);
          setCpf(cliente.cpf);
          setCnpj(cliente.cnpj);
          setTipocd(cliente.tipocd);
          setValorcd(cliente.valorcd);
          setCt_parcela(cliente.ct_parcela);
          setTelefone(cliente.telefone);
          setDtnascimento(cliente.dtnascimento);
          setReg_cnh(cliente.reg_cnh);
          setCei(cliente.cei);
          setRazaosocial(cliente.razaosocial);
          setFormapgto(cliente.formapgto);
     }
     


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
          <div className="container-lg">

               <Modal
                    size="lg"
                    show={show}
                    onHide={retur}
                    backdrop="static"
                    keyboard={true}
                    centered
               >

                    <Modal.Header closeButton>
                         <Modal.Title>Edição de cliente</Modal.Title>
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
                                             <Form.Control type="time" placeholder="Hora Agendamento" value={hr_agenda} onChange={(e) => setHr_agenda(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>
                                   <Form.Group className="col-lg-6 mb-2">
                                        <FloatingLabel controlId="floatingSelect" label="Tipo de Certificado">
                                             <Form.Select onChange={e => setTipocd(e.target.value)}>
                                                  <option value={tipocd}>{tipocd}</option>
                                                  <option value="A1PF">A1PF</option>
                                                  <option value="A3PF">A3PF</option>
                                                  <option value="A1PJ">A1PJ</option>
                                                  <option value="A3PJ">A3PJ</option>
                                             </Form.Select>
                                        </FloatingLabel>
                                   </Form.Group>
                                   <Form.Group className="col-lg-6 mb-2">
                                        <FloatingLabel controlId="floatingInput" label="Forma de pagamento">
                                             <Form.Select onChange={e => setFormapgto(e.target.value)}>
                                                  <option value={formapgto}>{formapgto}</option>
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
                                             <Form.Control type="text" placeholder="valor da venda" disabled={price} value={valorcd} onChange={e => setValorcd(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>
                                   <Form.Group className="col-lg-3 mb-2">
                                        <FloatingLabel controlId="floatingInput" label="Método Credito">
                                             <Form.Select disabled={credt} onChange={e => setCt_parcela(e.target.value)}>
                                                  <option value={ct_parcela}>{ct_parcela}</option>
                                                  <option value="A vista">A vista</option>
                                                  <option value="2 x">2 X</option>
                                                  <option value="3 x">3 X</option>
                                             </Form.Select>
                                        </FloatingLabel>
                                   </Form.Group>
                                   <Form.Group className="col-lg-3 mb-2">
                                        <FloatingLabel controlId="floatingInput" label="Whatsapp">
                                             <Form.Control type="tel" placeholder="Whatsapp" value={telefone} onChange={e => setTelefone(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>
                                   <InputGroup className="col-lg mb-2">
                                        <InputGroup.Text><FaRegEnvelopeOpen /></InputGroup.Text>
                                        <FloatingLabel controlId="floatingInput" label="E-mail" className="col">
                                             <Form.Control placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                                        </FloatingLabel>
                                   </InputGroup>
                                   <Form.Group className="mb-2">
                                        <FloatingLabel controlId="floatingInput" label="Nome completo">
                                             <Form.Control type="text" placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>
                                   <Form.Group className="col-lg-6 mb-2">
                                        <FloatingLabel controlId="floatingInput" label="CPF">
                                             <Form.Control type="text" placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>
                                   <Form.Group className="col-lg-6 mb-2">
                                        <FloatingLabel controlId="floatingInput" label="RG">
                                             <Form.Control type="text" placeholder="Rg" value={rg} onChange={e => setRg(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>
                                   <Form.Group className="col-lg-6 mb-2">
                                        <FloatingLabel controlId="floatingInput" label="Data de Nascimento">
                                             <Form.Control type="date" placeholder="Data de Nascimento" value={dtnascimento} onChange={e => setDtnascimento(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>
                                   <Form.Group className="col-lg-6 mb-2">
                                        <FloatingLabel controlId="floatingInput" label="Numero da CNH">
                                             <Form.Control type="number" placeholder="Numero da CNH" value={reg_cnh} onChange={e => setReg_cnh(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>
                                   <Form.Group className="col-lg-6 mb-2">
                                        <FloatingLabel controlId="floatingInput" label="Mat. CEI">
                                             <Form.Control type="text" placeholder="Mat. CEI" value={cei} onChange={e => setCei(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>
                                   <Form.Group className="col-lg-6 mb-2">
                                        <FloatingLabel controlId="floatingInput" label="CNPJ">
                                             <Form.Control type="text" placeholder="CNPJ" disabled={certPF} value={cnpj} onChange={e => setCnpj(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>


                                   <Form.Group className="mb-2">
                                        <FloatingLabel controlId="floatingInput" label="Razão Social">
                                             <Form.Control type="text" placeholder="Razão Social" disabled={certPF} value={razaosocial} onChange={e => setRazaosocial(e.target.value)} />
                                        </FloatingLabel>
                                   </Form.Group>
                              </Row>

                              <Button variant="success" onClick={update} className="col-6 mb-4">
                                   Salvar
                              </Button>
                              <Button variant="danger" onClick={retur} className="col-6 mb-4">Cancelar</Button>

                         </Form>
                    </Modal.Body>
               </Modal>
          </div>
     )
}