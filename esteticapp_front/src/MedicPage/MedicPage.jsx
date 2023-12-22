import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Box, Tabs, Tab,Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../NavBarUser/NavBar';
import Agenda from '../Agenda/Agenda';

// Estilos personalizados para el mapa
const mapStyles = {
    width: '100%',
    height: '400px',
};

export default function MedicPage() {
    const [address, setAddress] = useState('');
    const [medic, setMedic] = useState(null);
    const [loading, setLoading] = useState(true);
    const { MedicId } = useParams();
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // Función para cargar los datos del médico
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(window.conexion + "/Medic/GetMedicById?id=" + MedicId);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del médico.');
                }
                const data = await response.json();
                setMedic(data);
                setAddress(data.medic.adress);
                setLoading(false);
                console.log(medic)
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [MedicId]);

    // Función para cargar el mapa cuando los datos del médico estén disponibles
    useEffect(() => {
        if (medic) {
            async function initMap() {
                try {
                    const geocoder = new window.google.maps.Geocoder();

                    geocoder.geocode({ address: address }, (results, status) => {
                        if (status === 'OK' && results.length > 0) {
                            const location = results[0].geometry.location;
                            const latLng = { lat: location.lat(), lng: location.lng() };

                            const map = new window.google.maps.Map(document.getElementById("map"), {
                                zoom: 15,
                                center: latLng,
                                mapId: "DEMO_MAP_ID",
                            });

                            new window.google.maps.Marker({
                                map: map,
                                position: latLng,
                                title: address,
                            });
                        } else {
                            console.error('Error al geocodificar la dirección:', status);
                        }
                    });
                } catch (error) {
                    console.error('Error al geocodificar la dirección:', error);
                }
            }

            initMap();
        }
    }, [medic, address]);

    const tabLabelStyle = {
        fontWeight: "bold",
        fontSize: "18px"
    };
    return (
        <Grid>
            <Navbar />
            {loading ? (
                <Typography variant="h5" align="center">
                    Cargando datos del médico...
                </Typography>
            ) : (
                <Grid container spacing={2} sx={{ padding: 3 }}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align="left">
                            {medic.medic.medicalOfficeName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <img
                            src="https://imgs.search.brave.com/vYmDmX96nAineLn2FOtal5GsVroDHzAjwW3nBJCAdiA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/ZG9jdG9yLXBhY2ll/bnRlXzE0MjEtNjQu/anBnP3NpemU9NjI2/JmV4dD1qcGc"
                            alt="Imagen"
                            width="200"
                            height="200"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            <div id="map" style={mapStyles}></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6">
                            {medic.medic.officeDescription}
                        </Typography>
                    </Grid>
                    <Container>
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Imagenes" sx={tabLabelStyle}/>
                            <Tab label="Tratamientos" sx={tabLabelStyle}/>
                            <Tab label="Formas de pago" sx={tabLabelStyle}/>
                            <Tab label="Turnos" sx={tabLabelStyle}/>
                        </Tabs>
                        {selectedTab === 3 && <Agenda idMedic={MedicId} medic={medic}/>}
                    </Container>
                </Grid>

            )}
        </Grid>
    );
}
