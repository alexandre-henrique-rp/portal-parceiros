/* eslint-disable react-hooks/exhaustive-deps */
import { FaRegEdit } from 'react-icons/fa';
import '../painel.css';
import React, { useEffect, useState } from 'react';
import { getCliente } from '../../service/api';
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

     const conclusaoF = cliente.filter(item => item.andamento === "EM EDICAO")
     const conclusaob = cliente.filter(item => item.andamento === "AGENDADO")
     const conclusao = parseInt(conclusaoF.length) + parseInt(conclusaob.length)
     return (
          <div className="col-lg-3">
               <div className="edição">
                    <h3>
                         <span>Processos em Edição</span>
                         <FaRegEdit />
                    </h3>
                    <p>{conclusao}</p>
               </div>

          </div>

     )
}