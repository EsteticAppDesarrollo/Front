import * as React from 'react';
import { Grid, Typography, Card, CardContent, Box, CardMedia,IconButton  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

export default function MedicCard(props) {
    const { MedicalOfficeName, OfficeDescription, Adress, MedicId, Favorite,onFavoriteToggle } = props;
    const url = `/MedicPage/${MedicId}`;

    return (
        <Link to={url} style={cardLinkStyle}>
            <Card sx={{ mt: 5, mb: 5, boxShadow: 18 }}>
                <Grid container>
                    <Grid item xs={2} display="flex" alignItems="center">
                        <CardMedia
                            component="img"
                            alt="Imagen"
                            image="https://imgs.search.brave.com/vYmDmX96nAineLn2FOtal5GsVroDHzAjwW3nBJCAdiA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/ZG9jdG9yLXBhY2ll/bnRlXzE0MjEtNjQu/anBnP3NpemU9NjI2/JmV4dD1qcGc"
                            style={{ borderRadius: '50%', width: '160px', height: '140px' }}
                        />
                    </Grid>
                    <Grid item xs={10} justifyContent="flex-start" position="relative">
                        <CardContent>
                            <Typography variant="h4">{MedicalOfficeName}</Typography>
                            <Box display="flex" alignItems="start" sx={{ mt: 1 }}>
                                <LocationOnIcon style={{ marginRight: '8px' }} />
                                <Typography variant="h6">{Adress}</Typography>
                            </Box>
                            <Typography variant="h5">{OfficeDescription}</Typography>
                        </CardContent>
                        <IconButton
                            style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                color: Favorite ? 'gold' : 'inherit',
                            }}
                            onClick={(e) => {
                                e.preventDefault(); // Evita la navegación predeterminada
                                onFavoriteToggle();
                            }}
                        >
                            {Favorite ? <StarIcon /> : <StarOutlineIcon />}
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
        </Link>
    )
}

const cardLinkStyle = {
    textDecoration: 'none',
    cursor: 'pointer',
};