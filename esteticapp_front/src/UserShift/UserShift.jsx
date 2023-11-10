import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español


moment.locale('es'); // Establece el idioma de moment

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([
    {
      title: 'Tratamiento para estrías',
      start: moment("2023-11-17T07:00:00").toDate(),
      end: moment("2023-11-17T08:00:00").toDate(),
    },
    // Puedes agregar más eventos según sea necesario
  ]);

  return (
    <div className="App">
      <h1>Agenda React con react-big-calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default App;