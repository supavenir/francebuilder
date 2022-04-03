import { Component } from "react";
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { logout } from "../../src/utils/utils";

export default class Navbar extends Component {

  state = {
    user: null,
    parrainages: null
  }

  constructor(props) {
    super(props);
    if(this.props.user){
      this.state = {
        // user: this.props.user.user.nom + " " + this.props.user.user.prenom + "( " + this.props.user.user.codeParrain + " )",
        user: this.props.user.user,
        parrainages: this.props.user.parrainages
      }
    }
  }

  username = () => {
    if(this.state.user){
      return this.state.user.nom + " " + this.state.user.prenom + " (" + this.state.user.codeParrain + " )"
    }
  }

  navItems = () => {
    const result = [];
    result.push({ key: 1, label: "Accueil", href: "/accueil" });
    result.push({ key: 3, label: "Dons", href: "/don" });
    if (this.state.parrainages != undefined && this.state.parrainages.length > 0) {
      result.push({ key: 4, label: "Parrainages", href: "/parrainages" });
    }
    return result;
  }

  logout = (e) => {
    e.preventDefault()
    logout()
  };

  render(){
    return (
      <div className="navbar">
        <div className="left">
          <img src="/logo.jpg" />

          <TextField
            margin="none"
            id="searchbar"
            label="Rechercher un article ..."
            name="searchbar"
            size="small"
            style={{ width: 400, marginRight: 10 }}
          />
        </div>

        <div className="right">
          {this.navItems().map((item) => (
            <Link key={item.key} href={item.href}><a className="nav-item">{item.label}</a></Link>
          ))}
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p className="description">
            {this.state.user == null
              ? <Link href="/security/login"><a>Connexion</a></Link>
              : <Link href=""><a onClick={(e) => logout(e)}>{this.username()}</a></Link>
            }
          </p>
        </div>

        <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          padding: 5px;
          box-shadow: 0 14px 10px -10px gray;
        }

        .navbar .left {
          display: flex;
          flex-basis: 50%;
          justify-content: left;
        }

        .navbar .right {
          display: flex;
          justify-content: right;
        }

        .navbar .left, .navbar .right {
          align-items: center;
          padding-right: 10px;
        }

        .navbar .left img {
          width: 300px;
        }

        .navbar .nav-item {
          text-decoration: none;
          margin: 0 10px
        }
      `}</style>

      </div>
    )
  }
}