import { Component } from "react";
import Head from 'next/head'
import { appName } from "../src/utils/utils";
import ComponentTitle from "./components/ComponentTitle";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default class Parrainages extends Component {

  createData = (nom, prenom, nbFilleuls, totalDons) => {
    return { nom, prenom, nbFilleuls, totalDons };
  }

  rows = [
    this.createData("Leroux", "Alexis", 34, "387.00€"),
    this.createData("Holley", "Thomas", 27, "196.00€"),
    this.createData("Fontaine", "Thomas", 12, "37.00€"),
    this.createData("Heron", "Jean-Christophe", 2, "13.00€"),
  ];

  render(){
    return (
      <div className="parrainages">

        <Head>
          <title>{appName()} - Parrainages</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ComponentTitle title="Parrainages" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Nom</TableCell>
                <TableCell align="right">Prenom</TableCell>
                <TableCell align="right">Nombre filleuls</TableCell>
                <TableCell align="right">Dons globaux</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell> */}
                  <TableCell align="right">{row.nom}</TableCell>
                  <TableCell align="right">{row.prenom}</TableCell>
                  <TableCell align="right">{row.nbFilleuls}</TableCell>
                  <TableCell align="right">{row.totalDons}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}