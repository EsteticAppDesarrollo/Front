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
    fetch(window.conexion + '/Login/LoginMedic', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        if (data?.status == 200) {
            localStorage.setItem('medic', JSON.stringify(data))
            window.location.href = `/MedicPanel`
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
    <div className="container-fluid h-100">
        <div className="row align-items-center login-container">
            <div className="col-md-7 login-image"></div>
            <div className="col-md-5 login-form p-5">
                <section className="mb-4">
                    <div className="cont-head-login">
                    <img src="./public/Icono.ico" width="150" alt=""></img>
                    <h2 className="mb-4 text-decoration-underline">Iniciar Sesión</h2>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required></input>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="contrasena" placeholder="contrasena" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required></input>
                        <label htmlFor="contrasena">Contraseña</label>
                    </div>
                </section>
                <section className="mb-4">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Recordarme
                        </label>
                    </div>
                </section>
                <section className="mb-4">
                    <input type="button" className="btn-login" value="Iniciar Sesión" onClick={handleSubmit}></input>
                </section >
                <section className="d-flex recupero justify-content-between">
                    <p>Recuperar Contraseña</p>
                    <p>¿No tiene cuenta? Registrarse</p>
                </section>
            </div>
        </div>
    </div>
  );
}