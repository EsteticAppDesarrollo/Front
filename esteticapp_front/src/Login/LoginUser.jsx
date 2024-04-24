import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import styles from './Login.css'
import js from './LoginScripts.js'


export default function SignInSide() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let User = {
            emailAddress: email,
            password: password,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(User)
        };
        fetch(window.conexion + '/Login/LoginUser', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (data?.status == 200) {
                    localStorage.setItem('user', JSON.stringify(data))
                    window.location.href = `/UserPanel`
                }
                if (data.status == 500) {
                    var alert500 = document.getElementById('alert500')
                    alert500.style.display = '';
                }
                if (data.status == 401) {
                    var alert = document.getElementById('alert')
                    alert.style.display = '';
                }
            })
            .catch(function (error) {
                var alert500 = document.getElementById('alert500')
                alert500.style.display = '';
            })
    };

    return (
        <section id="divUsuario" className="">
            <div className="container-fluid h-100">
                <div className="row align-items-center login-container">
                    <div className="col-md-7 login-image"></div>
                    <div className="col-md-5 login-form">
                        <div className="cont-head-login">
                            <img src="./public/Icono.ico" width="150" alt=""></img>
                            <h2 className="mb-4 text-decoration-underline">Iniciar Sesión</h2>
                        </div>
                        <div className="mb-3">
                            <i id="back" className="fa-solid fa-arrow-left fa-xl" style={{ color: '#5ab9a8' }}></i>
                        </div>
                        <div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" 
                                id="email" placeholder="name@example.com" 
                                autoComplete="false"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required></input>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="contrasena" 
                                placeholder="contrasena" autoComplete="false"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required></input>
                                <label htmlFor="contrasena">Contraseña</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Recordarme
                                </label>
                            </div>
                        </div>
                        <div>
                            <input type="button" className="btn-login" onClick={handleSubmit} value="Iniciar Sesión"></input>

                        </div>
                        <div className="d-flex recupero justify-content-between mt-3">
                            <p>Recuperar Contraseña</p>
                            <p>¿No tiene cuenta? Registrarse</p>
                        </div>
                        <div id="divFormas">
                            <div className="line"></div>
                            <p className="text-center mt-2">Otras forma de iniciar sesión</p>
                            <button type="button" className="btn-facebook mt-3">
                                <div className="d-flex; justify-content-start">
                                    <i className="fa-brands fa-facebook-f fa-xl ms-2" style={{ color: '#fff' }}></i>
                                </div>
                                <div className="d-flex; justify-content-center w-100">
                                    <p className="text-center">INICIAR SESIÓN CON FACEBOOK</p>
                                </div>
                            </button>
                            <button type="button" className="btn-google mt-3">
                                <div className="d-flex; justify-content-start">
                                    <i className="fa-brands fa-google fa-xl ms-2" style={{ color: '#e84d40' }}></i>
                                </div>
                                <div className="d-flex; justify-content-center w-100">
                                    <p className="text-center">INICIAR SESIÓN CON GOOGLE</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}