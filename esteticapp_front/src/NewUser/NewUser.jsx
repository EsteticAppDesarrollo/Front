import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

export default function SignUp() {
    const [date, setDate] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(date)
        let User = {
            emailAddress: data.get('email'),
            password: data.get('password'),
            name: data.get('name'),
            lastName: data.get('lastName'),
            phone: parseInt(data.get('phone')),
            adress: data.get('adress'),
            country: data.get('country'),
            province: data.get('province'),
            city: data.get('city'),           
            birthdate: new Date(date),
        };
        var conexion = window.conexion
        console.log(conexion)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(User)
        };
        fetch(window.conexion+'/User/CreateUser', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                
                if (data?.status == 200 && data?.message == "Exitoso") {
                    console.log("pasa mostro")
                }
                if (data?.message == "el email ya esta registrado") {
                    var alertEmailDupicate = document.getElementById('alertEmailDupicate')
                    alertEmailDupicate.style.display = '';
                }
                
            })
            .catch(function(error){
                var alert500 = document.getElementById('alert500')
                alert500.style.display = '';
            })
    };

    return (
        <Grid>
            <Container component="main" maxWidth='xs' sx={{ width: '120vh', mt:'-2vh' }}>
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
                                    autoComplete="given-name"
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
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Telefono"
                                    name="phone"
                                    type="number"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="adress"
                                    label="Dirección"
                                    name="adress"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="country"
                                    label="País"
                                    name="country"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="province"
                                    label="Provincia"
                                    name="province"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    label="Ciudad"
                                    name="city"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        onChange={(date) => {
                                            const d = new Date(date).toLocaleDateString('fr-FR');
                                            setDate(d);
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Crear cuenta
                        </Button>
                        <Alert severity="error" id='alertEmailDupicate' style={{ display: 'none' }}>El email ya se encuentra registrado</Alert>
                        <Alert severity="error" id='alert500' style={{ display: 'none' }}>No pudo procesarse la creación de usuario</Alert>
                    </Box>
                </Box>
            </Container>
        </Grid>
    );
}