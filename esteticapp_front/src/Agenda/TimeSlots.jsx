import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { Grid, Typography, Card, CardContent } from '@mui/material';

function TimeSlots({ selectedDate, onSelectSlot, idMedic }) {
    // Verifica si selectedDate es una fecha válida
    if (!selectedDate || !dayjs(selectedDate).isValid()) {
        return <div>Seleccioná una fecha válida primero.</div>;
    }

    
    console.log(dayjs(selectedDate).format("DD/MM/YYYY"))
    
    const timeSlots = ["07:00","08:00"];

    useEffect(()=>{
        
    }),[]

    return (
        <Grid container spacing={2} >
            {timeSlots.map((slot, index) => (
                <Grid item xs={12} key={index} sm={4}>
                    <Card>
                        <CardContent>
                            <Grid item sm={4}>
                                <Typography variant="h6" component="div">
                                    {slot}
                                </Typography>
                            </Grid>
                            <Grid item sm={4}> 
                                <Button variant="contained" color="primary">
                                    Reservar
                                </Button>
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default TimeSlots;
