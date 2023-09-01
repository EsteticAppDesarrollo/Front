import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let User = {
      emailAddress: data.get('email'),
      password: data.get('password'),
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(User)
    };
    fetch('https://localhost:44348/api/Login/Login', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        console.log(data)
        if (data?.status == 200) {
          
          if(data.message == "Medic"){
            localStorage.setItem('medic', JSON.stringify(data.medic))
            window.location.href = `/MedicPanel`
          }
          if(data.message == "User"){
            localStorage.setItem('user', JSON.stringify(data.user))
            window.location.href = `/UserPanel`
          }
        }
        if (data.status == 500) {
          var alert500 = document.getElementById('alert500')
          alert500.style.display = '';
        }
        if (data.status == 401) {
          var alert = document.getElementById('alert')
          alert.style.display = '';
        }
      })
      .catch(function (error) {
        var alert500 = document.getElementById('alert500')
        alert500.style.display = '';
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', width: '215vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/ImagenLogin.jpg)",
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} maxWidth='xs' square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#59BAA9' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              </Grid>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              <Alert severity="error" id='alert' style={{ display: 'none' }}>Usuario y/o Contraseña incorrectos</Alert>
              <Alert severity="error" id='alert500' style={{ display: 'none' }}>Hubo un error en el servidor</Alert>
              <Grid container>
                <Grid item xs>                  
                  <Link href="/NewUser" variant="body2">
                    Recuperar contraseña
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/NewUser" variant="body2">
                    No tiene una cuenta? Registrese"
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}