import Head from 'next/head'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useState } from 'react'
import { appName, getAuthenticatedUser, isEmpty, jwtToken, redirectTo } from '../src/utils/utils'

export default function Accueil ({ Component, id }) {

  const [user, setUser] = useState({})

  if (jwtToken() && isEmpty(user)) {
    getAuthenticatedUser().then(response => {
      setUser(response)
    })
  }else{
    redirectTo("/")
  }

  const username = () => {
    return <a href="/security/login">{isEmpty(user)
      ? "Identifiez vous ici"
      : "Bienvenue " + user.nom + " " + user.prenom + " (" + user.codeParrain + ")"}</a>
  }

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />

      <Head>
        <title>{appName()} - Accueil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="left">
          <img src="/logo.jpg" />

          <TextField
            margin="none"
            id="searchbar"
            label="Rechercher un article ..."
            name="searchbar"
            size="small"
            style={{ width: 400 }}
          />
        </div>

        <div className="right">
          <NotificationsIcon color="secondary"/>
          <p className="description">
            {username()}
          </p>
        </div>
      </header>

      <main>

      </main>

      <style jsx>{`
        .container {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        header {
          display: flex;
          justify-content: space-between;
        }

        .left {
          display: flex;
          justify-content: left;
        }

        .right {
          display: flex;
          justify-content: right;
        }

        .left, .right {
          align-items: center;
        }

        header .left img {
          width: 300px;
        }
      `}</style>
    </div>
  )
}
