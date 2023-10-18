import * as React from 'react';
import {
    Grid, Paper, TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, TablePagination, Button
    , IconButton, Menu, MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Navbar from '../NavBar/NavBar'
import { useEffect, useState } from 'react';
import dayjs from "dayjs";

export default function MedicShift() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [shifts, setShifts] = React.useState([]); const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
    return (
        <Grid>
            <Navbar />
            <Grid sx={{ p: 2 }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 840 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow >
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
                                                <TableCell align="left">{row.user.name}</TableCell>
                                                <TableCell align="left">{row.user.lastName}</TableCell>
                                                <TableCell align="left">38.465.215</TableCell>
                                                <TableCell align="left">{row.user.phone}</TableCell>
                                                <TableCell align="left">{row.treatmentDescription}</TableCell>
                                                <TableCell align="right"><div>
                                                    <IconButton
                                                        aria-label="more"
                                                        id="long-button"
                                                        aria-controls={open ? 'long-menu' : undefined}
                                                        aria-expanded={open ? 'true' : undefined}
                                                        aria-haspopup="true"
                                                        onClick={handleClick}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="long-menu"
                                                        MenuListProps={{
                                                            'aria-labelledby': 'long-button',
                                                        }}
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        PaperProps={{
                                                            style: {
                                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                                width: '20ch',
                                                            },
                                                        }}
                                                    >
                                                        {options.map((option) => (
                                                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </div></TableCell>
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
        </Grid>
    );
}