import * as React from 'react';
import {
    Grid, Paper, TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, TablePagination, tableCellClasses, TextField, Button
} from '@mui/material';
import 'moment/locale/es';
import { styled } from '@mui/material/styles';
import Navbar from '../NavBar/NavBar';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

export default function MedicOldShift() {
    const [originalShift, setOriginalShift] = useState([]);
    const [shift, setShift] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterName, setFilterName] = useState('');
    const [filterDate, setFilterDate] = useState(null);

    var medic = JSON.parse(localStorage.getItem("medic"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(window.conexion + "/Medic/GetOldShiftByMedic?medicId=" + medic.medic.medicId);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del médico.');
                }
                const data = await response.json();
                setOriginalShift(data);
                setShift(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilter = () => {
        const filteredShift = originalShift.filter(row => {
            const formattedDate = dayjs(row.date).format("DD/MM/YYYY");
            return (
                row.user.name.toLowerCase().includes(filterName.toLowerCase()) &&
                (!filterDate || formattedDate === dayjs(filterDate).format("DD/MM/YYYY"))
            );
        });

        setShift(filteredShift);
    };

    return (
        <Grid>
            <Navbar />
            <Grid container sx={{ padding: 1 }}>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Filtrar por Nombre"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                        sx={{ width: '350px' }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                            label="Seleccionar Fecha"
                            value={filterDate}
                            onChange={(newValue) => setFilterDate(newValue)}
                            textField={(params) => <TextField {...params} />}
                            dateFormat="DD/MM/yyyy"
                            sx={{ width: '350px' }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button onClick={handleFilter} variant="contained" color="primary" sx={{ mt: 1 }}>
                        Filtrar
                    </Button>
                </Grid>



                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Nombre</StyledTableCell>
                                <StyledTableCell align="center">Apellido</StyledTableCell>
                                <StyledTableCell align="center">Documento</StyledTableCell>
                                <StyledTableCell align="center">Fecha de turno</StyledTableCell>
                                <StyledTableCell align="center">Hora de turno</StyledTableCell>
                                <StyledTableCell align="center">Tratamiento</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shift
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    const dateObject = new Date(row.date);
                                    const day = dateObject.getDate();
                                    const month = dateObject.getMonth() + 1;
                                    const year = dateObject.getFullYear();
                                    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

                                    return (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="center">{row.user.name}</StyledTableCell>
                                            <StyledTableCell align="center">{row.user.lastName}</StyledTableCell>
                                            <StyledTableCell align="center">{38465215}</StyledTableCell>
                                            <StyledTableCell align="center">{formattedDate}</StyledTableCell>
                                            <StyledTableCell align="center">{row.hour}</StyledTableCell>
                                            <StyledTableCell align="center">{row.treatmentDescription}</StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        labelRowsPerPage="Resultados por página"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={shift.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>
        </Grid>
    );
}

// Estilos
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));