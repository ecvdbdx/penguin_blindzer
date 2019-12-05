import './App.css'
import React, { Component } from 'react'

class App extends Component {


  constructor( props ) {
    super( props )

    this.state = {
      data: [],
      song: {},
      answer: ''
    }

    this.randSong = this.randSong.bind( this )
    this.getInputValue = this.getInputValue.bind( this )
  }


  componentDidMount() {
    fetch( 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/908622995' )
      .then( ( response ) => response.json() )
      .then( ( response ) => {
        const result = response.tracks.data
        this.setState( {
          data: result
        } )
        this.randSong( this.state.data )
      } )
  }

  randSong( playlist ) {
    this.setState( { answer: '' } )
    const song = playlist[Math.floor( Math.random() * playlist.length )]
    this.setState( { song: song } )
  }

  getInputValue( e ) {
    this.setState( { answer: e.target.value }, () => {
      if ( this.state.song.title.toLowerCase() === this.state.answer.toLowerCase() )
        this.randSong( this.state.data )
    } )

  }

  render() {
    const { song } = this.state
    return (
      <>
        <h1>{song.title}</h1>
        <audio ref="audio_tag" src={song.preview} controls autoPlay />
        <section>
          <input type="text" value={this.state.answer} autoFocus onChange={( e ) => this.getInputValue( e )} />
        </section>
      </>
    )
  }
}

export default App
