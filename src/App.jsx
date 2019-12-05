import './App.css'
import React, { Component } from 'react'

class App extends Component {


  constructor( props ) {
    super( props )

    this.state = {
      data: ''
    }
  }


  componentDidMount() {
    fetch( 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/908622995' )
      .then( ( response ) => response.json() )
      .then( ( response ) => {
        const a = response.tracks.data[1].preview
        this.setState( {
          data: a
        } )
        console.log( a )
      } )
  }


  render() {
    const { data } = this.state
    return (
      <audio ref="audio_tag" src={data} controls autoPlay/>
          )
        }
      }
      
      export default App
