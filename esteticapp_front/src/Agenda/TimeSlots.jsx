import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { Grid, Typography, Card, CardContent, Modal, Box, FormControl, Select, MenuItem } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function TimeSlots({ selectedDate, onSelectSlot, idMedic }) {
    const [timeSlots, setTimeSlots] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [motivo, setMotivo] = React.useState('Consulta');
    const [medic, setMedic] = useState(null);
    const [ShowTreatmentSelect, setShowTreatmentSelect] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [selectedHour, setSelectedHour] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = React.useState(false);
    const handleOpen = (hour) => {
        setSelectedHour(hour)
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const handleOpenErrorModal = () => setErrorModalOpen(true);
    const handleCloseErrorModal = () => setErrorModalOpen(false);
    const [successModalOpen, setSuccessModalOpen] = React.useState(false);
    const [errorModalFetchOpen, setErrorModalFetchOpen] = React.useState(false);

    //Reservar turno
    const handleReserve = (event) => {
        setMotivo(event.target.value);
        var date = dayjs(selectedDate).format("DD/MM/YYYY")
        var user = JSON.parse(localStorage.getItem("user"));
        const Shift = {
            dateRequest: date,
            hour: selectedHour,
            idMedic: idMedic.idMedic,
            idUser: user.user.userId,
            idTreatment: motivo == 'Tratamiento' ? selectedTreatment : 0
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Shift)
          };
          fetch(window.conexion + '/Medic/CreateShift', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        console.log(data);
        setSuccessModalOpen(true);
      })
      .catch(function (error) {
        console.log(error);
        setErrorModalFetchOpen(true);
      })
    };
    //mostrar o no el segundo select del modal
    const handleMotivoChange = (event) => {
        setMotivo(event.target.value);
        if (event.target.value === "Tratamiento") {
            setShowTreatmentSelect(true);
        } else {
            setShowTreatmentSelect(false);
        }
    };
    //Guardar el tratamiento elegido
    const handleTreatmentChange = (event) => {
        setSelectedTreatment(event.target.value);
        console.log(event.target);
    };
    if (!selectedDate || !dayjs(selectedDate).isValid()) {
        return <div>Seleccioná una fecha válida primero.</div>;
    }
    //Función para obtener los turnos del medico
    useEffect(() => {
        const fetchData = async () => {
            try {
                var date = dayjs(selectedDate).format("DD/MM/YYYY")
                const response = await fetch(window.conexion + "/Medic/GetShift?medicId=" + idMedic.idMedic + "&date=" + date);
                if (!response.ok) {
                    handleOpenErrorModal();
                    return;
                }
                const data = await response.json();
                setTimeSlots(data)
            } catch (error) {
                console.error(error);
                handleOpenErrorModal();
            }
        };
        fetchData();
    }, [selectedDate]);
    //Función para obtener los datos del medico
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(window.conexion + "/Medic/GetMedicById?id=" + idMedic.idMedic);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del médico.');
                }
                const data = await response.json();
                setMedic(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [idMedic.idMedic]);
    return (
        <Grid container spacing={2} >
            {timeSlots.map((slot, index) => (
                <Grid item xs={12} key={index} sm={4}>
                    <Card>
                        <CardContent>
                            <Grid item sm={4}>
                                <Typography variant="h6" component="div">
                                    {slot.hour}
                                </Typography>
                            </Grid>
                            <Grid item sm={4}>
                                <Button variant="contained"
                                    color="primary"
                                    disabled={slot.available == "false"}
                                    onClick={() => handleOpen(slot.hour)}>
                                    Reservar
                                </Button>
                                <div>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography variant="h6" component="h2" sx={{ textAlign: 'left' }}>
                                                Reservación de turno
                                            </Typography>
                                            <FormControl sx={{ mt: 2, minWidth: 200 }}>
                                                <Typography id="motivo-label">Motivo de la consulta</Typography>
                                                <Select
                                                    labelId="motivo-label"
                                                    id="motivo"
                                                    value={motivo}
                                                    onChange={handleMotivoChange}
                                                >
                                                    <MenuItem value="Consulta">Consulta</MenuItem>
                                                    <MenuItem value="Tratamiento">Tratamiento</MenuItem>
                                                </Select>
                                            </FormControl>
                                            {ShowTreatmentSelect && (
                                                <FormControl sx={{ mt: 2, minWidth: 400, ml: 3 }}>
                                                    <Typography id="motivo-tratamiento-label">Motivo de Tratamiento</Typography>
                                                    <Select
                                                        labelId="motivo-tratamiento-label"
                                                        id="motivo-tratamiento"
                                                        onChange={handleTreatmentChange}
                                                    >
                                                        {medic.lstTreatment.map((treatment, index) => (
                                                            <MenuItem value={treatment.idTreatment}>{treatment.description}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )}
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                                <Button variant="contained" onClick={handleClose}>
                                                    Cerrar
                                                </Button>
                                                <Button variant="contained" sx={{ ml: 2 }} onClick={handleReserve}>
                                                    Reservar
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Modal>
                                </div>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Modal
                open={errorModalOpen}
                onClose={handleCloseErrorModal}
                aria-labelledby="error-modal-title"
                aria-describedby="error-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Error al obtener los turnos
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        No se pudieron obtener los turnos. Por favor, inténtalo de nuevo más tarde.
                    </Typography>
                    <Button variant="contained" onClick={handleCloseErrorModal} sx={{ mt: 2 }}>
                        Cerrar
                    </Button>
                </Box>
            </Modal>

            <Modal
                open={successModalOpen}
                onClose={() => setSuccessModalOpen(false)}
                aria-labelledby="success-modal-title"
                aria-describedby="success-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Reserva Exitosa
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Se ha reservado el turno con éxito.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setSuccessModalOpen(false);
                            window.location.reload();
                        }}
                        sx={{ mt: 2 }}
                    >
                        Cerrar
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={errorModalFetchOpen}
                onClose={handleCloseErrorModal}
                aria-labelledby="error-modal-title"
                aria-describedby="error-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Error al reservar el turno
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        No se pudo reservar el turno. Por favor, inténtalo de nuevo más tarde.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setErrorModalFetchOpen(false)}
                        sx={{ mt: 2 }}
                    >
                        Cerrar
                    </Button>
                </Box>
            </Modal>
        </Grid>
    );
}

export default TimeSlots;
