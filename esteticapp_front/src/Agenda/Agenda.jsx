import React, { useState } from "react";
import CalendarComponent from "../Agenda/CalendarComponent";
import TimeSlots from "../Agenda/TimeSlots";
import { Grid, Typography, Container, Paper } from '@mui/material';

function Agenda(idMedic,medic) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Agenda de turnos
            </Typography>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6}>
                    <CalendarComponent onSelectDate={handleDateSelect}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {selectedDate && (
                        <TimeSlots selectedDate={selectedDate} onSelectSlot={handleSlotSelect} idMedic={idMedic} medic={medic}/>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

export default Agenda;
