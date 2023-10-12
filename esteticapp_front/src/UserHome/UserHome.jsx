import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper, Grid, TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import MedicCard from '../Helpers/MedicCard';
import Navbar from '../NavBarUser/NavBar';

export default function UserHome() {
    const [medics, setMedics] = useState([]);

    useEffect(() => {
        fetch(window.conexion + "/Medic/GetMedics")
            .then(response => response.json())
            .then(data => setMedics(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Grid>
            <Navbar />
            <Grid container spacing={2}>

                <Grid item xs={4} sm={3}>
                    <Paper
                        style={{
                            background: 'lightgrey',
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center', // Centra verticalmente
                            alignItems: 'center', // Centra horizontalmente
                        }}
                    >
                        <TextField
                            variant="outlined"
                            label="Nombre"
                            style={{ marginBottom: '10px', width: '80%' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Ubicación"
                            style={{ marginBottom: '10px', width: '80%' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <LocationOnIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Turno disponible"
                            style={{ marginBottom: '10px', width: '80%' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <EventIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={7} sm={9}>
                    <Typography variant="h4" style={{ textAlign: 'left', color: 'black', marginLeft: 30, marginBottom: 50 }}>
                        Lo que estás buscando
                    </Typography>
                    {medics.map((medic, index) => (
                        <MedicCard
                            key={index}
                            MedicId={medic.medicId}
                            MedicalOfficeName={medic.medicalOfficeName}
                            OfficeDescription={medic.officeDescription}
                            Adress={medic.adress}
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}