import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import Navbar from '../NavBarUser/NavBar'
import { Grid, Modal, Box, Typography, Button } from '@mui/material';

moment.locale('es');
const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shifts, setShifts] = useState([]);
  const minTime = moment('2000-01-01T07:00:00').toDate();
  const maxTime = moment('2000-01-01T22:00:00').toDate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        var user = JSON.parse(localStorage.getItem("user"));
  
        const response = await fetch(window.conexion + "/User/GetShiftByUser?userId=" + user.user.userId);
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
            hour:item.hour,
            medic: item.medic
          };
        });
  
        setEvents(updatedShifts);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [setEvents]);

  // Al hacer clic en un evento, abre el modal y guarda el evento seleccionado
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    // Cierra el modal al hacer clic en Cerrar
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
          onSelectEvent={handleEventClick} // Maneja el clic en un evento
        />

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
                  <div>Fecha: {moment(selectedEvent.start).format('DD/MM/YY').toString() +' '+ selectedEvent.hour}</div>
                </>
              )}
            </Typography>
            <Typography variant="h6" component="h2" id="event-modal-title">
              Detalles del Medico
            </Typography>
            <Typography id="event-modal-description">
              {/* Muestra los detalles del evento */}
              {selectedEvent && (
                <>
                  <div>Nombre: {selectedEvent.medic.name}</div>
                  <div>Apellido: {selectedEvent.medic.lastName}</div>
                  <div>Nombre: {selectedEvent.medic.medicalOfficeName}</div>
                  <div>Dirección: {selectedEvent.medic.adress}</div>
                </>
              )}
            </Typography>
            <Button onClick={handleCloseModal}>Cerrar</Button>
          </Box>
        </Modal>
      </div>
    </Grid>
  );
}

export default App;
