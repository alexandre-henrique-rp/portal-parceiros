/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { getCliente, robo, excluirCliente } from '../../service/api';
import { ImBin } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';



function ListaEdit() {


     const [cliente, setCliente] = useState([])
     const [loading, setLoading] = useState(true);
     const [unidade, setUnidade] = useState('');

     const nanvigate = useNavigate();
     const cookies = new Cookies();




     useEffect(() => {
          (async () => {
               const respota = await getCliente(userNumber);
               setCliente(respota.data);
               setUnidade(uni)
               setLoading(false);
          })();
     }, []);
     const recoveredUser = cookies.get('userPolo');
     const userNumber = JSON.parse(recoveredUser);
     const uni = "2";


     const reload = async () => {
          setLoading(true);
          const respota = await getCliente(userNumber);
          setCliente(respota.data);
          setLoading(false);
     }

     const redirecti = () => { 
          const win = window.open('https://arredebrasilrp.acsoluti.com.br/site/emissao-online', '_blank');
          win.focus();
     }

     const rendCliente = cliente.map(function (cliente) {

          const id = cliente.id;
          const unico = cliente.unico;
          const json = JSON.stringify(unico) ;
          const voucherString = json.replace(/.json/g, '');
          const voucher = JSON.parse(voucherString);

          const send = () => {
               Saveinfo(id);
          }
          const Saveinfo = async (id) => {
               const response = await robo(id);
               console.log("Save", response.data);
          };

          const edit = () => {
               cookies.set('clienteId', id,)
               nanvigate("/editar");
          }


          const excluir = () => {
               upinfo(id, unidade);
               reload()
          }

          const upinfo = async (id, unidade) => {

               const response = await excluirCliente(id, unidade);
               console.log("Save", response.data);

          };

          return (
               <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.tipocd === "A1PF" ? cliente.nome : cliente.tipocd === "A3PF" ? cliente.nome : cliente.razaosocial}</td>
                    <td>{cliente.tipocd}</td>
                    <td>{cliente.andamento}</td>
                    <td>{voucher}</td>
                    <td><Button variant="info" onClick={edit} className="BTMSoluti">Editar</Button></td>
                    <td><Button variant="primary" className="BTMSoluti" onClick={send}>Gerar Voucher</Button></td>
                    <td><Button variant="secondary" onClick={redirecti} className="BTMSoluti">Integrar Solut</Button></td>
                    <td><Button variant="danger" className="BTMSolutiLixeira" onClick={excluir}><ImBin /></Button></td>
               </tr>
          )
     });




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
               {rendCliente}
          </>
     )
}


export default hot(ListaEdit);