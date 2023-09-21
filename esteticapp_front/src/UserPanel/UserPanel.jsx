import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import Navbar from '../NavBarUser/NavBar'


export default function SignUpUser() {
    const [adress, setAdress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [userId, setUserId] = useState('');

    //Modificar usuario
    const handleSubmit = (event) => {
        event.preventDefault();
        let User = {
            emailAddress: emailAddress,
            name: name,
            lastName: lastName,
            phone: parseInt(phone),
            adress: adress,
            birthdate: new Date(birthdate),
            userId:userId,
        };
        let userDTO ={
            user: User,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDTO)
        };
        fetch(window.conexion + '/User/ModifyUser', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (data?.status == 200 && data?.message == "Exitoso") {
                    console.log("pasa mostro")
                }
                if (data?.status == 200 && data?.message == "el email ya esta registrado") {
                    var alertEmailDupicate = document.getElementById('alertEmailDupicate')
                    alertEmailDupicate.style.display = '';
                }
                if (data?.status == 401 && data?.message == "Contraseña incorrecta") {
                    var alertIncorrectPassword = document.getElementById('alertIncorrectPassword')
                    alertIncorrectPassword.style.display = '';
                }
            })
            .catch(function (error) {
                var alert500 = document.getElementById('alert500')
                alert500.style.display = '';
            })
    };
    //Cargar datos del usuario
    useEffect(() => {
        var user = JSON.parse(localStorage.getItem("user"));

        setName(user.user.name != null ? user.user.name : '');
        setLastName(user.user.lastName != null ? user.user.lastName : '');
        setEmailAddress(user.user.emailAddress != null ? user.user.emailAddress : '');
        setBirthdate(user.user.birthdate != null ? user.user.birthdate : '');
        setAdress(user.user.adress != null ? user.user.adress : '');
        setPhone(user.user.phone != null ? user.user.phone : '');
        setUserId(user.user.userId != null ? user.user.userId : 0)
    }, [])

    return (
        
        <Grid >
            <Navbar />
            <CssBaseline />
            <Grid sx={{
                backgroundImage: "url(/foto2.jpg)",
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height:'100vh'
            }}>
                <Container component="main" maxWidth='xs'>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#53b375' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Nombre"
                                        autoFocus
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Apellido"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Telefono"
                                        name="phone"
                                        type="number"
                                        autoComplete="family-name"
                                    />
                                </Grid>                               
                                <Grid item xs={12} sm={12} sx={{ width: '100vh' }}>
                                    <InputLabel htmlFor="birthdate">Fecha de Nacimiento</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            value={birthdate ? dayjs(birthdate) : null}
                                            onChange={(date) => {
                                                const d = new Date(date).toLocaleDateString('fr-FR');
                                                setBirthdate(d);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    value={emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>                                
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Guardar cambios
                            </Button>
                            <Alert severity="error" id='alertEmailDupicate' style={{ display: 'none' }}>El email ya se encuentra registrado</Alert>
                            <Alert severity="error" id='alert500' style={{ display: 'none' }}>No pudo procesarse la creación de usuario, vuelva a intentarlo en unos minutos</Alert>
                            <Alert severity="error" id='alertIncorrectPassword' style={{ display: 'none' }}>El Email y/o Contraseña son incorrectos</Alert>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}