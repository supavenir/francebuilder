import * as React from 'react';
import Head from 'next/head'
import Image from 'next/image'
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

import { login, appName} from '../../src/utils/utils';

function Copyright (props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        FranceBuilder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn () {

  const [user, setUser] = React.useState({})


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get('username'), data.get('password')).then(() => {
      document.location.href = "/"
    })
  };

  return (
    <ThemeProvider theme={theme}>

      <Head>
        <title>{appName()} - Connexion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div class="login-card">
        <Container component="main" maxWidth="xs" sx={{paddingTop: 8}}>
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
              Connectez vous
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Identifiant"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Connexion
              </Button>
              <Grid container>
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                <Grid item>
                  <Link href="/security/signup" variant="body2">
                    {"Pas encore inscrit(e) ? Rejoignez nous !"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Copyright sx={{ marginTop: 5 }} />
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

        .login-card {
          height: 100vh;
          background-image: url("/background-login.jpg");
          background-size: cover;
          background-position: bottom;
          background-repeat: no-repeat;
        }

        .login-card {
          margin: 0 !important;
        }
      `}</style>

    </ThemeProvider>
  );
}