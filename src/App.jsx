import './App.css'
import React, { Component } from 'react'

class App extends Component {


  constructor( props ) {
    super( props )

    this.state = {
      data: [],
      song: {}
    }

    this.randSong= this.randSong.bind(this)
  }


  componentDidMount() {
    fetch( 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/908622995' )
      .then( ( response ) => response.json() )
      .then( ( response ) => {
        const result = response.tracks.data
        this.setState( {
          data: result
        } )
        console.log( result )
        this.randSong(this.state.data)
        console.log(this.state.song)
      } )

      
  }

  randSong(playlist) {
    const song = playlist[Math.floor(Math.random() * playlist.length)]
    this.setState({song: song})
  }

  render() {
    const { song } = this.state
    return (
      <>
            <h1>{song.title}</h1>
            <audio ref="audio_tag" src={song.preview} controls autoPlay/>
      </>
    )
  }
}

      export default App
