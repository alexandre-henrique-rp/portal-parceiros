/* eslint-disable react-hooks/exhaustive-deps */
import { FaRegClock } from 'react-icons/fa';
import './painel.css';
import React, { useEffect, useState } from 'react';
import { getCliente } from '../service/api';
import Cookies from 'universal-cookie';

export default function EmAnalise() {
     const [cliente, setCliente] = useState([])

     const cookies = new Cookies();

     const recoveredUser = cookies.get('userPolo');
     const userNumber = JSON.parse(recoveredUser);
     useEffect(() => {
          (async () => {
               const respota = await getCliente(userNumber);
               setCliente(respota.data);
          })();
     }, []);
     

     const conclusaoF = cliente.filter(item => item.andamento === "REVOGADO")
     const conclusaoE = cliente.filter(item => item.andamento === "CANCELADO")
     const conclusao = parseInt(conclusaoF.length) + parseInt(conclusaoE.length)

     return (
          <div className="col-lg-3">
               <div className="analise">
                    <h3>
                         <span>Processos Encerrado</span>
                         <FaRegClock />
                    </h3>
                    <p>{conclusao}</p>
               </div>

          </div>

     )
}