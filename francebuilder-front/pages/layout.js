import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { getAuthenticatedUser, isEmpty, jwtToken } from "../src/utils/utils";
import Banner from "./components/Banner";
import ComponentTitle from "./components/ComponentTitle";
import ConversationItem from "./components/ConversationItem";
import Navbar from "./components/Navbar";

export default function Layout({ children }) {

  const [user, setUser] = useState({})

  const initUser = () => {
    if (isEmpty(user) && jwtToken()) {
      getAuthenticatedUser().then(response => {
        setUser(response)
      })
    }
  }

  const messages = () => {
    return [
      { key: 1, message: "coucou", avatar: "/user.png", fullname: "Manu' Macron", date: "12/12/2020" },
      { key: 2, message: "coucou2", avatar: "/user.png", fullname: "Marine Lestylo", date: "12/12/2022" },
    ]
  }

  const navItems = () => {
    return [
      { key: 1, label: "Accueil", href: "/accueil" },
      { key: 2, label: "Parrainages", href: "/parrainages" },
      { key: 3, label: "Articles", href: "/articles" },
    ]
  }

  initUser();


  return (
    <div className="app">
      <Navbar user={user} items={navItems()} />

      <Banner path="/background-login.jpg" />

      <main>
        <div className="container">
          <div className="left">
            <Box
              sx={{
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.4)',
                width: '100%'
              }}
            >
              {children}
            </Box>
          </div>
          <div className="right">
            <Box
              sx={{
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.4)',
                width: '100%'
              }}
            >
              <ComponentTitle title="Messagerie" />
              {messages().map((item) => (
                <ConversationItem key={item.key} avatar={item.avatar} fullname={item.fullname} date={item.date} />
              ))}
            </Box>
          </div>
        </div>
      </main>

      <style jsx global>{`
        body {
          margin: 0 !important;
          padding: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      <style jsx>{`

        .app {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        .container {
          display: flex;
          margin: 20px;
          align-items: flex-start;
        }

        .container .left {
          flex: 2;
          padding: 10px;
        }

        .container .right {
          flex: 1;
          padding: 10px;
        }
      `}</style>
    </div>
  )
}