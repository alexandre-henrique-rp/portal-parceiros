/* eslint-disable jsx-a11y/anchor-is-valid */
import { Offcanvas } from 'react-bootstrap';
import React, { useState } from 'react';
import UserForm from './userForm';
import { FaRegUserCircle } from 'react-icons/fa';
import './userButton.css';


export default function UserButton() {
     const [show, setShow] = useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
     return (
          <div className="userBTM">
               <a className="userButton" onClick={handleShow}>
                    <FaRegUserCircle />
               </a>

               <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                         <Offcanvas.Title>Perfil</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                         <UserForm />
                    </Offcanvas.Body>
               </Offcanvas>

          </div>
     );
}


