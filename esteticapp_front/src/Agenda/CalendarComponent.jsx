import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { Grid} from '@mui/material';


function CalendarComponent({ onSelectDate }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onSelectDate(date);
    };

    return (
        <Grid container>
            <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} label="Selecciona una fecha" />}
                        dateFormat="dd/MM/yyyy"
                        valueFormat={(value) => (value ? dayjs(value).format("DD/MM/YYYY") : "")}
                        sx={{width:300}}
                    />
                </LocalizationProvider>
            </Grid>
        </Grid>
    );
}

export default CalendarComponent;
