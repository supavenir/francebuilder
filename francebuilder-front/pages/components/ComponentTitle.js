import { Typography } from "@mui/material";
import { Component } from "react";

export default class ComponentTitle extends Component {

  render(){
    return (
      <>
        <Typography component="h4" variant="h5">
          {this.props.title}
        </Typography>
        <hr className='hr-separator' />

        <style jsx>{`
        .hr-separator {
          width: 100px;
          margin: 0;
          margin-top: 5px;
          margin-bottom: 10px;
          height: 3px;
          background-color: black;
          display: flex;
          justify-content: start;
          border-radius: 5px;
        }
      `}</style>
      </>
    )
  }

}