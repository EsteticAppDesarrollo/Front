import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import Navbar from '../NavBar/NavBar'
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MapsAutocomplete from '../Helpers/MapsAutocomplete'

export default function SignUpUser() {
    const [date, setDate] = useState('');
    const [treatment, setTreatment] = useState([]);
    const [treatmentApi, setTreatmentApi] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [paymentMethodApi, setPaymentMethodApi] = useState([]);

    const[name,setName] = useState('');
    const[lastName,selastName] = useState('');
    const[tuition,setTuition] = useState('');
    const[whatsapp,setWhatsapp] = useState('');
    const[instagram,setInstagram] = useState('');
    const[email,setEmail] = useState('');
    const[medicalOfficeDescription,setMedicalOfficeDescription] = useState('');
    const[DescriptionOfTheMedicalDirective,setDescriptionOfTheMedicalDirective] = useState('');
    const[MedicalOfficeName,setMedicalOfficeName] = useState('');


    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    useEffect(() => {
        var medic = JSON.parse(localStorage.getItem("medic"));
        console.log(medic)
        setName(medic.name);
        selastName(medic.lastName);
        setTuition(medic.tuition);
        setWhatsapp(medic.whatsapp);
        setInstagram(medic.instagram);
        setEmail(medic.emailAddress);
        setMedicalOfficeDescription(medic.officeDescription);
        setDescriptionOfTheMedicalDirective(medic.descriptionOfSpecialities);
        setMedicalOfficeName();
    }, [])

    useEffect(() => {
        fetch("https://localhost:44348/api/Treatments/GetTreatment")
            .then(response => response.json())
            .then(data => setTreatmentApi(data.treatment))
    }, [])

    useEffect(() => {
        fetch("https://localhost:44348/api/PaymentMethod/GetPaymentMethod")
            .then(response => response.json())
            .then(data => setPaymentMethodApi(data.paymentMethod))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var adress = document.getElementById('google-map-demo').value
    };

    return (
        <Grid>
            <Navbar />
            <Grid>
                <CssBaseline />
                <Grid sx={{
                    backgroundImage: "url(/FondoLargo.jpg)",
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '130vh'
                }}>
                    <Container component="main" maxWidth='s' sx={{ width: '110vh' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <AccountCircleIcon sx={{ m: 1, fontSize: '400%' }}>
                                <LockOutlinedIcon />
                            </AccountCircleIcon>
                            <Typography component="h1" variant="h5">
                                Mi perfil
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                                <Grid item container spacing={2} sm={12} sx={{
                                    border: 1,
                                    borderColor: 'grey.500',
                                    borderRadius: '16px',
                                    p: 2
                                }}>
                                    <Grid item xs={12} sm={12} sx={{ mt: -2 }}>
                                        <Typography component="h1" variant="h5">
                                            Información de perfil
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={4} >
                                        <TextField
                                            autoComplete="given-name"
                                            name="name"
                                            value={name}
                                            required
                                            id="name"
                                            label="Nombre"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            value={lastName}
                                            id="lastName"
                                            label="Apellido"
                                            name="lastName"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            value={tuition}
                                            id="tuition"
                                            label="Matricula"
                                            name="tuition"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <MapsAutocomplete />
                                    </Grid>

                                </Grid>

                                <Grid item container spacing={2} sm={12} sx={{
                                    border: 1,
                                    borderColor: 'grey.500',
                                    borderRadius: '16px',
                                    p: 2,
                                    mt: 4
                                }}>
                                    <Grid item xs={12} sm={12} sx={{ mt: -2 }}>
                                        <Typography component="h1" variant="h5">
                                            Información de contacto
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={whatsapp}
                                            id="whatsapp"
                                            label="Telefono"
                                            name="whatsapp"
                                            type="number"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={instagram}
                                            id="instagram"
                                            label="Instagram"
                                            name="instagram"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={email}
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item container spacing={2} sm={12} sx={{
                                    border: 1,
                                    borderColor: 'grey.500',
                                    borderRadius: '16px',
                                    p: 2,
                                    mt: 4
                                }}>
                                    <Grid item xs={12} sm={12} sx={{ mt: -2 }}>
                                        <Typography component="h1" variant="h5">
                                            Configuración de perfil
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={MedicalOfficeName}
                                            id="MedicalOfficeName"
                                            label="Nombre de consultorio"
                                            name="MedicalOfficeName"
                                            type="text"
                                            autoComplete="family-name"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            multiline
                                            rows={6}
                                            value={DescriptionOfTheMedicalDirective}
                                            id="DescriptionOfTheMedicalDirective"
                                            label="Descripción de la directiva medica"
                                            name="DescriptionOfTheMedicalDirective"
                                            type="text"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            multiline
                                            rows={6}
                                            value={medicalOfficeDescription}
                                            id="medicalOfficeDescription"
                                            label="Descripción del consultorio"
                                            name="medicalOfficeDescription"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '31vh' }}>
                                            <DatePicker
                                                dateFormat="dd/MM/yyyy"
                                                onChange={(date) => {
                                                    const d = new Date(date).toLocaleDateString('fr-FR');
                                                    setDate(d);
                                                    console.log(d)
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel control={<Switch defaultChecked />} label="¿Muestra precios?" />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Autocomplete
                                            multiple
                                            id="tratamientos"
                                            onChange={(event, values) => setTreatment(values)}
                                            options={treatmentApi}
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option.description}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.description}
                                                </li>
                                            )}
                                            style={{ width: 750 }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Tratamientos" placeholder="Tratamientos" />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Autocomplete
                                            multiple
                                            id="formasDePago"
                                            options={paymentMethodApi}
                                            onChange={(event, values) => setPaymentMethod(values)}
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option.description}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.description}
                                                </li>
                                            )}
                                            style={{ width: 750 }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Formas de pago" placeholder="" />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Guardar cambios
                                </Button>
                                <Alert severity="error" id='alertEmailDupicate' style={{ display: 'none' }}>El email ya se encuentra registrado</Alert>
                                <Alert severity="error" id='alert500' style={{ display: 'none' }}>No pudo procesarse la creación de usuario</Alert>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </Grid>
    )
}