import Head from "next/head";
import { Component } from "react";
import ComponentTitle from "./components/ComponentTitle";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { appName, jwtToken, request } from "../src/utils/utils";

export default class HistoriqueDons extends Component {

  state = {
    dons: null
  }

  componentWillMount () {
    if (jwtToken()) {
      request("don/historique", "GET").then(dons => {
        this.setState({dons})
      });
    }
  }

  constructor(props){
    super(props);
    this.state = {
      dons: []
    }
  }

  render(){
    return (
      <div className="historique-dons">

        <Head>
          <title>{appName()} - Historique des dons</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ComponentTitle title="Historique des dons" />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="right">Montant</TableCell>
                <TableCell align="right">Commentaire</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.dons.map((don) => (
                <TableRow
                  key={don.date}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{don.date}</TableCell>
                  <TableCell align="right">{don.montant}</TableCell>
                  <TableCell align="right">{don.commentaire == "" ? "Aucun" : don.commentaire}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    )
  }

}