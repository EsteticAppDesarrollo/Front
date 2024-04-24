import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaUserDoctor, FaUser  } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import style from './Login.css'
import js from './LoginScripts.js'

export default function SignInSide() {
    const navigate = useNavigate();
    const RedirectToUserLogin = () => {
        navigate('/LoginUser');
    };
    const RedirectToUserMedic = () => {
        navigate('/LoginMedic');
    };
  return (
    <div className="container-fluid h-100">
        <div className="row align-items-center login-container">
            <div className="col-md-7 login-image"></div>
            <div className="col-md-5 login-form">
                <section >
                    <div className="cont-head-login">
                        <img src="./public/Icono.ico" width="150" alt=""></img>
                        <h2 className="mb-4 text-decoration-underline">Iniciar Sesión</h2>
                    </div>
                </section>
                <section id="divInicio" style={{display:'flex', justifyContent: 'space-evenly'}}>
                    <div>
                        <div className="circle" id="usuarioCircle" onClick={RedirectToUserLogin}>
                            <FaUser/>
                        </div>
                        <div className="title-soy text-center">
                            <p>Soy</p>
                            <p><strong>Usuario</strong></p>
                        </div>
                    </div>
                    <div>
                    <div className="circle" id="medicoCircle" onClick={RedirectToUserMedic}>
                            <FaUserDoctor/>
                        </div>
                        <div className="title-soy text-center">
                            <p>Soy</p>
                            <p><strong>Médico</strong></p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
  );
}