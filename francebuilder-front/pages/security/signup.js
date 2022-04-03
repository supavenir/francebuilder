import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { saveJwtToken, request, getFormValue, appName } from '../../src/utils/utils';
import Alert from '@mui/material/Alert';

function Copyright (props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp () {

  const [registered, setRegistered] = React.useState(0);
  const [error, setError] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      firstname: getFormValue(data, 'firstname'),
      lastname: getFormValue(data, 'lastname'),
      username: getFormValue(data, 'username'),
      email: getFormValue(data, 'email'),
      password: getFormValue(data, 'password'),
      codeParrain: getFormValue(data, 'codeParrain')
    }
    request("signup", "POST", payload)
    .then(response => {
      setRegistered(1);
      console.log(registered, error)
      saveJwtToken(response.token)
      setTimeout(() => {
        document.location.href = "/"
      }, 5000)
    })
    .catch(err => {
      setRegistered(2);
      setError("Une erreur est survenu, merci de réessayer plus tard.")
      console.log(err)
    });
  };

  return (
    <ThemeProvider theme={theme}>

      <Head>
        <title>{appName()} - Inscription</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="register-card">
        <Container component="main" maxWidth="xs" sx={{ paddingTop: 4 }}>
          <CssBaseline />
          <Box
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '5px',
              boxShadow: '0px 30px 30px rgba(0, 0, 0, 0.4)'
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Image src="/logo.jpg" width="250" height="50" />
            <Typography component="h1" variant="h5" sx={{mt: 2}}>
              S'enregister
            </Typography>
            {registered == 1 && (<Alert severity="success">Vous êtes maintenant enregistré(e) ! Vous allez être redirigé à l'accueil dans 5 secondes.</Alert>)}
            {registered == 2 && error != undefined && (<Alert severity="warning">{error}</Alert>)}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="Prénom"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Nom"
                    name="lastname"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="username"
                    label="Nom d'utilisateur"
                    type="text"
                    id="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="codeParrain"
                    label="Code de parrainage (optionnel)"
                    type="text"
                    id="codeParrain"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Je veux m'inscrire à la newsletter hebdomadaire par mail"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                S'enregistrer
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="login" variant="body2">
                    Vous avez déjà un compte ? Connectez vous !
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Copyright sx={{ mt: 1 }} />
          </Box>
        </Container>
      </div>
      
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .register-card {
          margin: 0 !important;
          height: 100vh;
          background-image: url("/background-login.jpg");
          background-size: cover;
          background-position: bottom;
          background-repeat: no-repeat;
        }
      `}</style>

    </ThemeProvider>
  );
}