import { Component } from "react";
import Image from 'next/image'
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode';

export class ArticleItem extends Component {
  render(){
    return (
      <div className="article-item">
        <div className="image">
          <Image src={this.props.image} width="100px" height="100px" />
        </div>
        <div className="content">
          <Typography component="h4" variant="h5">
            {this.props.title}
          </Typography>
          <div className="date">{this.props.date}</div>
          <Button variant="contained" startIcon={<ChromeReaderMode />}>
            En savoir plus ...
          </Button>
        </div>

        <style jsx>{`
          .article-item {
            display: flex;
            border: 2px solid #efefef;
            margin-bottom: 10px;
          }

          .article-item .image {
            box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.4);
          }

          .article-item .content {
            margin-left: 15px;
          }
      `}</style>

      </div>
    );
  }
}