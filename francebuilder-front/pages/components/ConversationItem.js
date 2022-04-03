import { Box } from "@mui/material"
import Image from 'next/image'
import { Component } from "react"

export class ConversationItem extends Component {
  render(){
    return (
      <div className="conversation-item">
        <Box
          className="item"
          sx={{
            padding: 1,
            marginBottom: 1,
            backgroundColor: 'white',
            display: 'flex',
            borderRadius: '5px',
            border: '2px solid #efefef'
          }}
        >
          <Image src={this.props.avatar} width="50" height="50" />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
            <span className="name">{this.props.fullname}</span>
            <span className="date">{this.props.date}</span>
          </div>
        </Box>

        <style jsx>{`
        .conversation-item:hover > .conversation-item .item {
          cursor: pointer;
          border: 2px solid #333;
        }
      `}</style>

      </div>
    )
  }
}

export default ConversationItem