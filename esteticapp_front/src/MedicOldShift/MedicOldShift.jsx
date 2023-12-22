import * as React from 'react';
import {
    Grid, Paper, TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, TablePagination,tableCellClasses
} from '@mui/material';
import 'moment/locale/es';
import { styled } from '@mui/material/styles';
import Navbar from '../NavBar/NavBar';
import { useEffect, useState } from 'react';

export default function MedicOldShift() {
    const [shift, setShift] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20); // Ajusta según tus necesidades

    var medic = JSON.parse(localStorage.getItem("medic"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(window.conexion + "/Medic/GetOldShiftByMedic?medicId=" + medic.medic.medicId);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del médico.');
                }
                const data = await response.json();
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

    return (
        <Grid>
            <Navbar />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Apellido</StyledTableCell>
                            <StyledTableCell align="center">Documento</StyledTableCell>
                            <StyledTableCell align="center">Fecha de turno</StyledTableCell>
                            <StyledTableCell align="center">hora de turno</StyledTableCell>
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
