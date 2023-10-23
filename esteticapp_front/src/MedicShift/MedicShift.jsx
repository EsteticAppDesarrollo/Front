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
    const openMenu = Boolean(anchorEl);
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedRowId, setSelectedRowId] = React.useState(null);

    const handleClick = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId); // Almacena el ID del elemento seleccionado
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null); // Restablece el ID al cerrar el menú
    };

    const handleOpenCancel = () => {
        setOpenModal(true);
        handleClose(); // Cierra el menú antes de abrir el modal
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRowId(null); // Restablece el ID al cerrar el modal
    };

    useEffect(() => {
        // Tu código para cargar los turnos (shifts)
    }, []);

    const columns = [
        { id: 'date', label: 'Fecha de turno', minWidth: 170 },
        { id: 'name', label: 'Nombre', minWidth: 170 },
        { id: 'lastName', label: 'Apellido', minWidth: 170 },
        { id: 'dni', label: 'DNI', minWidth: 170 },
        { id: 'phone', label: 'Telefono', minWidth: 170 },
        { id: 'motive', label: 'Motivo', minWidth: 170 },
        { id: 'action', label: '', minWidth: 170 }
    ];

    const options = [
        'Cancelar',
        'Postergar'
    ];

    const ITEM_HEIGHT = 48;

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
                                            <TableRow key={row.id}>
                                                <TableCell align="left">{dayjs(row.date).format("DD/MM/YYYY")}</TableCell>
                                                <TableCell align="left">{row.user.name}</TableCell>
                                                <TableCell align="left">{row.user.lastName}</TableCell>
                                                <TableCell align="left">38.465.215</TableCell>
                                                <TableCell align="left">{row.user.phone}</TableCell>
                                                <TableCell align="left">{row.treatmentDescription}</TableCell>
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
                                                                <MenuItem key={option} onClick={handleOpenCancel}>
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
                        // Resto del código de paginación
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
                        ¿Está seguro de que desea cancelar el turno del ID: {selectedRowId}?
                    </Typography>
                    <Button onClick={handleCloseModal}>Cancelar turno</Button>
                </Box>
            </Modal>
        </Grid>
    );
}
