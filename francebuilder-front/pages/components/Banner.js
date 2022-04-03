import Image from 'next/image'
import { Component } from 'react'

class Banner extends Component {
  render(){
    return (
      <div className="banner">
        <Image src={this.props.path} width="1920px" height="500px" />


        <style jsx>{`
        `}
        </style>
      </div>
    )
  }
}

export default Banner