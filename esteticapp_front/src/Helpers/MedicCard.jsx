import * as React from 'react';
import { Grid, Typography, Card, CardContent, Box, CardMedia } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MedicCard(props) {
    const { MedicalOfficeName, OfficeDescription, Adress,MedicId } = props;
    const url = `/MedicPage/${MedicId}`;

    return (
        <Link to={url} style={cardLinkStyle}>
            <Card sx={{ mt: 5,mb: 5, height: '200px', boxShadow: 18 }}>
                <Grid container>
                    <Grid item xs={2} display="flex" alignItems="center">
                        <CardMedia
                            component="img"
                            alt="Imagen"
                            image="https://imgs.search.brave.com/vYmDmX96nAineLn2FOtal5GsVroDHzAjwW3nBJCAdiA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/ZG9jdG9yLXBhY2ll/bnRlXzE0MjEtNjQu/anBnP3NpemU9NjI2/JmV4dD1qcGc"
                            style={{ borderRadius: '50%', width: '200px', height: '180px' }}
                        />
                    </Grid>
                    <Grid item xs={10}  justifyContent="flex-start">
                        <CardContent>
                            <Typography variant="h4">{MedicalOfficeName}</Typography>
                            <Box display="flex" alignItems="start" sx={{mt:1}}>
                                <LocationOnIcon style={{ marginRight: '8px' }} />
                                <Typography variant="h6">{Adress}</Typography>
                            </Box>
                            <Typography variant="h5">{OfficeDescription}</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Link>
    )
}

const cardLinkStyle = {
    textDecoration: 'none', // Elimina el subrayado del enlace
    cursor: 'pointer', // Cambia el cursor al estilo de enlace
  };