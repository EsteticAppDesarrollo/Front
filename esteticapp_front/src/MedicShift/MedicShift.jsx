import * as React from 'react';
import {Grid,Button,Modal,Box,Typography} from '@mui/material';
import Navbar from '../NavBar/NavBar';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Calendar, momentLocalizer } from 'react-big-calendar';


export default function MedicShift() {
    const [idShift, setIdShift] = React.useState(null);
    const minTime = moment('2000-01-01T07:00:00').toDate();
    const maxTime = moment('2000-01-01T22:00:00').toDate();
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openSuccessCancel, setOpenSuccessCancel] = useState(false);

    moment.locale('es');
    const localizer = momentLocalizer(moment);

    //fetch de cancelacion de turno
    const handleCancelShift = () => {
        const medicalShift = {
            id: idShift
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medicalShift)
        };
        fetch(window.conexion + '/Medic/CancelShift', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (data === true) {
                    setOpenSuccessCancel(true);
                }
                else {

                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("no anduvo catch")
            })
    }
    //establecer el idShift con el id del evento seleccionado
    useEffect(() => {
        // Actualizar idShift cuando cambia selectedEvent
        if (selectedEvent) {
            setIdShift(selectedEvent.id);
        }
    }, [selectedEvent]);

    const handleCancelShiftClick = () => {
        if (selectedEvent) {
            console.log(selectedEvent);
            setIdShift(selectedEvent.id);
            handleCancelShift();
            // Cierra el modal de detalles
            handleCloseModal();
        }
    };
    //Get de todos los turnos
    useEffect(() => {
        const fetchData = async () => {
            try {
                var medic = JSON.parse(localStorage.getItem("medic"));

                const response = await fetch(window.conexion + "/Medic/GetShiftByMedic?medicId=" + medic.medic.medicId);
                if (!response.ok) {
                    throw new Error('No se pudieron obtener los turnos.');
                }
                const data = await response.json();
                console.log(data, 'data');

                const updatedShifts = data.map((item) => {
                    const formattedDateTimeInitial = moment(`${item.date} ${item.hour}`, "YYYY-MM-DD HH:mm").format();
                    const endHour = moment(item.hour, 'HH:mm').add(1, 'hour').format('HH:mm');
                    const formattedDateTimeEnd = moment(`${item.date} ${endHour}`, "YYYY-MM-DD HH:mm").format();
                    return {
                        id: item.id, // Asegúrate de tener un identificador único para cada evento
                        title: item.treatmentDescription,
                        start: moment(formattedDateTimeInitial).toDate(),
                        end: moment(formattedDateTimeEnd).toDate(),
                        hour: item.hour,
                        user: item.user
                    };
                });

                setEvents(updatedShifts);
                console.log(events, 'asa')
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [setEvents]);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <Grid>
            <Navbar />
            <div className="App" style={{ height: '100vh' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    messages={{
                        next: "Siguiente",
                        previous: "Anterior",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día"
                    }}
                    min={minTime}
                    max={maxTime}
                    onSelectEvent={handleEventClick}
                />
            </div>

            {/* Modal para mostrar detalles del evento */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="event-modal-title"
                aria-describedby="event-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', p: 4 }}>
                    <Typography variant="h6" component="h2" id="event-modal-title">
                        Detalles del Turno
                    </Typography>
                    <Typography id="event-modal-description">
                        {/* Muestra los detalles del evento */}
                        {selectedEvent && (
                            <>
                                <div>Motivo: {selectedEvent.title}</div>
                                <div>Fecha: {moment(selectedEvent.start).format('DD/MM/YY').toString() + ' ' + selectedEvent.hour}</div>
                            </>
                        )}
                    </Typography>
                    <Typography variant="h6" component="h2" id="event-modal-title">
                        Detalles del paciente
                    </Typography>
                    <Typography id="event-modal-description">
                        {/* Muestra los detalles del evento */}
                        {selectedEvent && (
                            <>
                                <div>Nombre: {selectedEvent.user.name}</div>
                                <div>Apellido: {selectedEvent.user.lastName}</div>
                            </>
                        )}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleCancelShiftClick}>
                            Cancelar Turno
                        </Button>
                        <Button variant="contained" onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {/*Modal para mostrar la confirmación de la cancelacion*/}
            <Modal
                open={openSuccessCancel}
                onClose={() => setOpenSuccessCancel(false)}
                aria-labelledby="success-modal-title"
                aria-describedby="success-modal-description"
            >
                {/* Contenido del modal de éxito */}
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', p: 4 }}>
                    <Typography variant="h6" component="h2" id="success-modal-title">
                        ¡Turno Cancelado!
                    </Typography>
                    <Typography id="success-modal-description">
                        El turno se ha cancelado exitosamente.
                    </Typography>
                    <Button variant="contained" onClick={() => setOpenSuccessCancel(false)}>
                        Cerrar
                    </Button>
                </Box>
            </Modal>
        </Grid>
    );
}
