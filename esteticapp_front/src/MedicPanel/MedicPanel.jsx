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
import dayjs from 'dayjs';

export default function SignUpUser() {
    const [date, setDate] = useState('');
    const [treatment, setTreatment] = useState([]);
    const [treatmentApi, setTreatmentApi] = useState([]);
    const [paymentMethodApi, setPaymentMethodApi] = useState([]);
    const [treatmentSelected, setTreatmentSelected] = useState([]);
    const [paymentMethodSelected, setPaymentMethodSelected] = useState([]);

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tuition, setTuition] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [instagram, setInstagram] = useState('');
    const [email, setEmail] = useState('');
    const [medicalOfficeDescription, setMedicalOfficeDescription] = useState('');
    const [DescriptionOfTheMedicalDirective, setDescriptionOfTheMedicalDirective] = useState('');
    const [MedicalOfficeName, setMedicalOfficeName] = useState('');
    const [adress, setAdress] = useState('');
    const [showPrices, setShowPrices] = useState(false);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    //Cargar datos del medico
    useEffect(() => {
        var medic = JSON.parse(localStorage.getItem("medic"));

        setName(medic.medic.name != null ? medic.medic.name : '');
        setLastName(medic.medic.lastName != null ? medic.medic.lastName : '');
        setTuition(medic.medic.tuition != null ? medic.medic.tuition : '');
        setWhatsapp(medic.medic.whatsapp != null ? medic.medic.whatsapp : '');
        setInstagram(medic.medic.instagram != null ? medic.medic.instagram : '');
        setEmail(medic.medic.emailAddress != null ? medic.medic.emailAddress : '');
        setMedicalOfficeDescription(medic.medic.officeDescription != null ? medic.medic.officeDescription : '');
        setDescriptionOfTheMedicalDirective(medic.medic.descriptionOfSpecialities != null ? medic.medic.descriptionOfSpecialities : '');
        setMedicalOfficeName(medic.medic.medicalOfficeName != null ? medic.medic.medicalOfficeName : '');
        setShowPrices(medic.medic.showPrice != null ? medic.medic.showPrice : false)
        setDate(new Date(medic.medic.startDate))
        setAdress(medic.medic.adress != null ? medic.medic.adress : '')
    }, [])
    //Cargar tratamientos
    useEffect(() => {
        fetch(window.conexion + "/Treatments/GetTreatment")
            .then(response => response.json())
            .then(data => setTreatmentApi(data.treatment))
    }, [])
    //Cargar Formas de pago
    useEffect(() => {
        fetch(window.conexion + "/PaymentMethod/GetPaymentMethod")
            .then(response => response.json())
            .then(data => setPaymentMethodApi(data.paymentMethod))
    }, [])
    //Tomar tratamientos seleccionados y cargarlos
    useEffect(() => {
        var medic = JSON.parse(localStorage.getItem("medic"));
        setTreatmentSelected(medic.lstTreatment)
        setPaymentMethodSelected(medic.lstPaymentMethod)
    }, [])
    //guardar modificaciones del medico
    const handleSubmit = (event) => {
        event.preventDefault();
        var medic = JSON.parse(localStorage.getItem("medic"));
        let Medic = {
            name: name,
            lastName: lastName,
            tuition: tuition,
            whatsapp: whatsapp,
            instagram: instagram,
            adress: document.getElementById('google-map-demo').value,
            emailAddress: email,
            startDate: new Date(date),
            OfficeDescription: medicalOfficeDescription,
            DescriptionOfSpecialities: DescriptionOfTheMedicalDirective,
            MedicalOfficeName: MedicalOfficeName,
            showPrice: showPrices,
            medicId: medic.medic.medicId != null ? medic.medic.medicId : '',
            password: medic.medic.password != null ? medic.medic.password : '',
        };
        let MedicDTO = {
            Medic: Medic,
            lstMedicTreatment: treatmentSelected,
            lstMedicPaymentMethod: paymentMethodSelected,
            lstTreatment: treatmentSelected,
            lstPaymentMethod: paymentMethodSelected,
        }
        console.log(MedicDTO)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(MedicDTO)
        };
        fetch(window.conexion + '/Medic/ModifyMedic', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(data);
                if (data?.status == 200) {
                    console.log(data);
                    localStorage.removeItem('medic')
                    localStorage.setItem('medic', JSON.stringify(data))
                    console.log("se actualizó mostro")
                }
                if (data?.status != 200) {

                }
            })
            .catch(function (error) {

            })
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
                    height: '100vh'
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
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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
                                            onChange={(e) => setLastName(e.target.value)}
                                            id="lastName"
                                            label="Apellido"
                                            name="lastName"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            value={tuition}
                                            onChange={(e) => setTuition(e.target.value)}
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
                                            onChange={(e) => setWhatsapp(e.target.value)}
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
                                            onChange={(e) => setInstagram(e.target.value)}
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
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            onChange={(e) => setMedicalOfficeName(e.target.value)}
                                            id="MedicalOfficeName"
                                            label="Nombre de consultorio"
                                            name="MedicalOfficeName"
                                            type="text"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            multiline
                                            rows={6}
                                            value={DescriptionOfTheMedicalDirective}
                                            onChange={(e) => setDescriptionOfTheMedicalDirective(e.target.value)}
                                            id="DescriptionOfTheMedicalDirective"
                                            label="Descripción de la directiva medica"
                                            name="DescriptionOfTheMedicalDirective"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            multiline
                                            rows={6}
                                            value={medicalOfficeDescription}
                                            onChange={(e) => setMedicalOfficeDescription(e.target.value)}
                                            id="medicalOfficeDescription"
                                            label="Descripción del consultorio"
                                            name="medicalOfficeDescription"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '31vh' }}>
                                            <DatePicker
                                                dateFormat="dd/MM/yyyy"
                                                value={date ? dayjs(date) : null}
                                                onChange={(date) => {
                                                    const d = new Date(date).toLocaleDateString('fr-FR');
                                                    setDate(d);
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel control={<Switch checked={showPrices} onChange={() => setShowPrices(!showPrices)} />} label="¿Muestra precios?" />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Autocomplete
                                            multiple
                                            id="tratamientos"
                                            onChange={(event, values) => {
                                                // Filtra los valores que ya existen en treatmentSelected
                                                const existingValues = values.filter((value) =>
                                                    treatmentSelected.some((selectedValue) => selectedValue.description === value.description)
                                                );
                                                // Filtra los valores que son nuevos (no están en treatmentSelected)
                                                const newValues = values.filter((value) =>
                                                    !treatmentSelected.some((selectedValue) => selectedValue.description === value.description)
                                                );
                                                // Agrega los nuevos valores a treatment
                                                setTreatment([...treatment, ...newValues]);
                                                // Actualiza treatmentSelected con todos los valores seleccionados
                                                setTreatmentSelected([...existingValues, ...newValues]);
                                            }}
                                            options={treatmentApi}
                                            disableCloseOnSelect
                                            value={treatmentSelected}
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
                                            onChange={(event, values) => {
                                                // Filtra los valores que ya existen en paymentMethodSelected
                                                const existingValues = values.filter((value) =>
                                                    paymentMethodSelected.some((selectedValue) => selectedValue.description === value.description)
                                                );

                                                // Filtra los valores que son nuevos (no están en paymentMethodSelected)
                                                const newValues = values.filter((value) =>
                                                    !paymentMethodSelected.some((selectedValue) => selectedValue.description === value.description)
                                                );

                                                // Actualiza paymentMethodSelected con todos los valores seleccionados
                                                setPaymentMethodSelected([...existingValues, ...newValues]);
                                            }}
                                            disableCloseOnSelect
                                            value={paymentMethodSelected}
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