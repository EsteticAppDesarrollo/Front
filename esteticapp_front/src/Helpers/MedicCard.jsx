import * as React from 'react';
import { Grid, Typography, Card, CardContent, Box, CardMedia } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';

export default function MedicCard(props) {
    const { MedicalOfficeName, OfficeDescription, Adress } = props;

    useEffect(() => {
        console.log(props);
    }, []);
    return (
        <Card sx={{ mt: 5, height: '200px' }}>
            <Grid container>
                <Grid item xs={4}>
                    {/* Imagen a la izquierda */}
                    <CardMedia
                        component="img"
                        alt="Imagen"
                        height="180px"
                        image="https://imgs.search.brave.com/vYmDmX96nAineLn2FOtal5GsVroDHzAjwW3nBJCAdiA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/ZG9jdG9yLXBhY2ll/bnRlXzE0MjEtNjQu/anBnP3NpemU9NjI2/JmV4dD1qcGc" // URL de la imagen
                    />
                </Grid>
                <Grid item xs={8}>
                    <CardContent>
                        {/* Texto en el tercio superior */}
                        <Typography variant="h4">{MedicalOfficeName}</Typography>
                        {/* Texto con icono de ubicación en el tercio medio */}
                        <Box display="flex" alignItems="center" sx={{mt:1}}>
                            <LocationOnIcon style={{ marginRight: '8px' }} />
                            <Typography variant="h6">{Adress}</Typography>
                        </Box>
                        {/* Texto en el último tercio */}
                        <Typography variant="h5">{OfficeDescription}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}