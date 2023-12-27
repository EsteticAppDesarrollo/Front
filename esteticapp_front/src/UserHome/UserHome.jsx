import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper, Grid, TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import MedicCard from '../Helpers/MedicCard';
import Navbar from '../NavBarUser/NavBar';

export default function UserHome() {
    const [originalMedics, setOriginalMedics] = useState([]);
    const [medics, setMedics] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchMap, setSearchMap] = useState("");

    //Trae todos los medicos
    useEffect(() => {
        const fetchData = async () => {
            try {
                var user = JSON.parse(localStorage.getItem("user"));
                const response = await fetch(window.conexion + "/Medic/GetMedics?userId=" +user.user.userId);
                if (!response.ok) {
                    throw new Error('No se pudieron obtener los médicos.');
                }
                const data = await response.json();

                setOriginalMedics(data);
                setMedics(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    //Agrega/saca de favoritos
    const handleFavoriteToggle = async (medicId) => {
        try {
            var user = JSON.parse(localStorage.getItem("user"));
            const body = {
                userId: user.user.userId,
                medicId: medicId
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            const response = await fetch(window.conexion + '/User/CreateFavorite', requestOptions);
            
            if (response.ok) {
                // Actualizar el estado solo si el fetch es exitoso
                const updatedMedics = medics.map(medic => {
                    if (medic.medicId === medicId) {
                        return { ...medic, favorite: !medic.favorite };
                    }
                    return medic;
                });
    
                setMedics(updatedMedics);
            } else {
                console.error('Error al cambiar el estado de favoritos');
            }
        } catch (error) {
            console.error('Error al cambiar el estado de favoritos', error);
        }
    };
    //Filtra por el nombre
    useEffect(() => {
        // Filtrar médicos por nombre
        const filteredMedics = originalMedics.filter(medic =>
            medic.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setMedics(filteredMedics);
    }, [searchValue, originalMedics]);
    //Filtra por ubicacion
    useEffect(() => {        
        const filteredMedics = originalMedics.filter(medic =>
            medic.adress.toLowerCase().includes(searchMap.toLowerCase())
        );
        setMedics(filteredMedics);
    }, [searchMap, originalMedics]);

    return (
        <Grid>
            <Navbar />
            <Grid container spacing={2}>

                <Grid item xs={0} sm={3}>
                    <Paper
                        style={{
                            background: 'lightgrey',
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            variant="outlined"
                            label="Nombre"
                            style={{ marginBottom: '10px', width: '80%' }}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
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
                            value={searchMap}
                            onChange={(e) => setSearchMap(e.target.value)}
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
                <Grid item xs={12} sm={9}>
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
                            Favorite={medic.favorite}
                            onFavoriteToggle={() => handleFavoriteToggle(medic.medicId)}
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}