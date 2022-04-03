import { Component } from "react"
import Head from 'next/head'
import ComponentTitle from "./components/ComponentTitle"
import { appName, redirectTo, request } from "../src/utils/utils";
import { Alert, Box, Button, TextField } from "@mui/material";
import HistoryIcon from '@material-ui/icons/History';

export default class Don extends Component {

  state = {
    passed: false,
    error: false
  }

  constructor(props){
    super(props);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      montant: parseInt(data.get('montant')),
      commentaire: data.get('commentaire'),
      date: new Date()
    }
    request("don/new", "POST", payload).then(() => {
      this.setState({passed: true, error: false})
    }).catch((err) => { console.error(err); this.setState({ passed: false, error: true }) })
  };

  goToHistoriqueDons = (e) => {
    e.preventDefault();
    redirectTo("/historique-dons")
  }

  render(){
    return (
      <div className="don">

        <Head>
          <title>{appName()} - Faire un don</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span><ComponentTitle title="Soutenez-nous" /></span>
          <Button variant="outlined" onClick={(e) => this.goToHistoriqueDons(e)}>
            <HistoryIcon style={{marginRight: 10}} />
            Votre historique
          </Button>
        </div>

        <p>En effectuant un don, vous nous permettez de concquérir ce monde et de faire adopter l'appellation "Chocolatine" à tout les Français ! (Surtout ceux du nord)</p>
        <p>Vous pouvez faire un don en ligne ou par chèque à l'adresse suivante :</p>
        <p>Chocolatine - Association de la Chocolatine<br />
            1 rue de la Chocolatine<br />
            75000 Paris, France</p>
        <p>Vous pouvez également nous faire un don en ligne en utilisant le formulaire ci-dessous :</p>

        {this.state.passed && (<Alert severity="success">Merci pour elles (les chocolatines). Votre don est déductible des impôts, vous pouvez générer une preuve de celui-ci depuis votre historique de dons.</Alert>)}
        {!this.state.passed && this.state.error && (<Alert severity="warning">Une erreur est survenue, merci de réessayer ultérieurement.</Alert>)}

        <Box component="form" onSubmit={(e) => this.handleSubmit(e)} sx={{ mt: 1 }}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <TextField
              margin="normal"
              type="number"
              required
              InputProps={{ inputProps: { min: "1", max: "1000" } }}
              id="montant"
              label="Montant"
              name="montant"
              style={{paddingRight: 10}}
            />
            <span>€</span>
          </div>
          <TextField
            margin="normal"
            fullWidth
            name="commentaire"
            label="Commentaire (facultatif)"
            type="text"
            id="commentaire"
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
            Légaliser la chocolatine
          </Button>
        </Box>


        <style jsx>{`

        `}</style>
      </div>
    )
  }
}