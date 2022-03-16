/* eslint-disable react-hooks/exhaustive-deps */
import { FaRegCheckCircle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { getCliente } from '../../service/api';
import '../painel.css';
import Cookies from 'universal-cookie';

export default function EmConclusao() { 
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

     const conclusaoF = cliente.filter(item => item.andamento === "APROVADO")
     const conclusaoE = cliente.filter(item => item.andamento === "EMITIDO")
     const conclusao = parseInt(conclusaoF.length) + parseInt(conclusaoE.length)

     return (
          <div className="col-lg-3">
               <div className="conclusao">
                    <h3>
                         <span>Processos Concluídos</span>
                         <FaRegCheckCircle />
                    </h3>
                    <p>{conclusao}</p>
               </div>

          </div>

     )
}