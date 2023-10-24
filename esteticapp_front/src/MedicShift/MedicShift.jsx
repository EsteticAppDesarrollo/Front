import * as React from 'react';
import {
    Grid, Paper, TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, TablePagination, Button
    , IconButton, Menu, MenuItem, Modal, Box, Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Navbar from '../NavBar/NavBar';
import { useEffect, useState } from 'react';
import dayjs from "dayjs";

export default function MedicShift() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [shifts, setShifts] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [idShift, setIdShift] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event, id) => {
        setIdShift(id);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => { setAnchorEl(null); };

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenCancel = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [openSuccessCancel, setOpenSuccessCancel] = React.useState(false);

    const [openModalPostpone, setOpenModalPostpone] = React.useState(false);
    const handleOpenPostpone = () => setOpenModalPostpone(true);
    const handleClosePostpone = () => setOpenModalPostpone(false);

    const [openSuccessPostpone, setOpenSuccessPostpone] = React.useState(false);

    const [openErrorModal, setOpenErrorModal] = React.useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    //Seteo de pagina del Table
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    //cerrar modal de turno cancelado y del modal de cancelacion de turno
    const handleSuccessCancel = () => {
        handleCloseModal();
        setOpenSuccessCancel(false);
    }
    //cerrar modal de turno cancelado y del modal de cancelacion de turno
    const handleSuccessPostpone = () => {
        setOpenSuccessPostpone(false);
        setOpenModalPostpone(false);
    }
    //Registros por pagina del Table
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //ruteo de apertura de modal, cancelacion/postergacion
    const handleCancelModal = (option) => {
        if (option === "Cancelar") {
            handleOpenCancel();
        }
        if (option === "Postergar") {
            handleOpenPostpone();
        }
    }
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
                if (data == 'false') {

                }
                else {
                    setOpenSuccessCancel(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("no anduvo catch")
            })
    }
    //fetch de postergacion de turno
    const handlePostponeShift = () => {
        const medicalShift = {
            id: idShift
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medicalShift)
        };
        fetch(window.conexion + '/Medic/PostponeShift', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (data == 'false') {

                }
                else {
                    setOpenSuccessPostpone(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("no anduvo catch")
            })
    }
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
                setShifts(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    //columnas del Table
    const columns = [
        { id: 'date', label: 'Fecha de turno', minWidth: 170 },
        { id: 'hour', label: 'Hora de turno', minWidth: 170 },
        { id: 'name', label: 'Nombre', minWidth: 170 },
        { id: 'lastName', label: 'Apellido', minWidth: 170 },
        { id: 'dni', label: 'DNI', minWidth: 170 },
        { id: 'phone', label: 'Telefono', minWidth: 170 },
        { id: 'motive', label: 'Motivo', minWidth: 170 },
        { id: 'status', label: 'Estado', minWidth: 170 },
        { id: 'action', label: '', minWidth: 170 }
    ];
    //opciones del menu que esta en el Table
    const options = [
        'Cancelar',
        'Postergar'
    ];

    const ITEM_HEIGHT = 48;

    return (
        <Grid>
            <Navbar />
            <Grid sx={{ p: 2 }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 840 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, backgroundColor: 'lightgrey' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {shifts
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow key={row.code}>
                                                <TableCell align="left">{dayjs(row.date).format("DD/MM/YYYY")}</TableCell>
                                                <TableCell align="left">{row.hour}</TableCell>
                                                <TableCell align="left">{row.user.name}</TableCell>
                                                <TableCell align="left">{row.user.lastName}</TableCell>
                                                <TableCell align="left">{row.id}</TableCell>
                                                <TableCell align="left">{row.user.phone}</TableCell>
                                                <TableCell align="left">{row.treatmentDescription}</TableCell>
                                                <TableCell align="left">{row.status}</TableCell>
                                                <TableCell align="right">
                                                    <div>
                                                        <IconButton
                                                            aria-label="more"
                                                            id="long-button"
                                                            aria-controls={openMenu ? 'long-menu' : undefined}
                                                            aria-expanded={openMenu ? 'true' : undefined}
                                                            aria-haspopup="true"
                                                            onClick={(event) => handleClick(event, row.id)}
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        <Menu
                                                            id="long-menu"
                                                            MenuListProps={{
                                                                'aria-labelledby': 'long-button',
                                                            }}
                                                            anchorEl={anchorEl}
                                                            open={openMenu}
                                                            onClose={handleClose}
                                                            PaperProps={{
                                                                style: {
                                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                                    width: '20ch',
                                                                },
                                                            }}
                                                        >
                                                            {options.map((option) => (
                                                                <MenuItem key={option} onClick={() => handleCancelModal(option)}>
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </Menu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={shifts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cancelación de turno
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ¿Está seguro que desea cancelar el turno?
                    </Typography>
                    <Button
                        sx={{
                            mt: 2,
                            bgcolor: 'red',
                            color: 'white',
                            float: 'right',
                            '&:hover': {
                                bgcolor: 'darkred',
                                color: 'white',
                            },
                        }}
                        onClick={handleCancelShift}
                    >
                        Cancelar turno
                    </Button>
                </Box>
            </Modal>

            <Modal
                open={openSuccessCancel}
                onClose={handleSuccessCancel}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        El turno fue cancelado con exito.
                    </Typography>
                    <Button onClick={handleSuccessCancel}>Cerrar</Button>
                </Box>
            </Modal>

            <Modal
                open={openModalPostpone}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Postergación de turno
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ¿Está seguro que desea postergar el turno?
                    </Typography>
                    <Button
                        sx={{
                            mt: 2,
                            bgcolor: 'red',
                            color: 'white',
                            float: 'right',
                            '&:hover': {
                                bgcolor: 'darkred',
                                color: 'white',
                            },
                        }}
                        onClick={handlePostponeShift}
                    >
                        Postergar turno
                    </Button>
                </Box>
            </Modal>

            <Modal
                open={openSuccessPostpone}
                onClose={handleSuccessPostpone}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        El turno fue postergado con exito.
                    </Typography>
                    <Button onClick={handleSuccessPostpone}>Cerrar</Button>
                </Box>
            </Modal>            
        </Grid>
    );
}
