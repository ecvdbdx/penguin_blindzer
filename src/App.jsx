import './App.css'
import React, { Component } from 'react'

class App extends Component {


  constructor( props ) {
    super( props )

    this.state = {
      data: [],
      song: {},
      answer: '',
      time: 0,
      history: []
    }
    this.getCurrentTime = this.getCurrentTime.bind( this )
    this.randSong = this.randSong.bind( this )
    this.getInputValue = this.getInputValue.bind( this )
  }


  componentDidMount() {
    fetch( 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/908622995' )
      .then( ( response ) => response.json() )
      .then( ( response ) => {
        const result = response.tracks.data
        this.setState( {
          data: result.filter( el => el.readable )
        }, this.randSong )
      } )
  }

  randSong() {
    const playlist = this.state.data
    const song = playlist[Math.floor( Math.random() * playlist.length )]
    this.setState( {
      answer: '',
      song: song,
      data: playlist.filter( el => el.id !== song.id )
    } )
  }

  getInputValue( e ) {
    this.setState( { answer: e.target.value }, () => {
      const currentSong = this.state.song.title.toLowerCase()
      if ( currentSong === this.state.answer.toLowerCase() ) {
        this.state.history.push( currentSong )
        console.log( this.state.history )
        this.randSong()
      }
    } )

  }

  getCurrentTime( e ) {
    const currentTime = Math.floor( e.currentTarget.currentTime )
    this.setState( { time: currentTime } )
  }

  render() {
    const { song } = this.state
    return (
      <>
        <h1>{song.title}</h1>
        <audio onEnded={this.randSong} onTimeUpdate={this.getCurrentTime} src={song.preview} controls autoPlay />
        <section>
          <input type="text" value={this.state.answer} autoFocus onChange={( e ) => this.getInputValue( e )} />
        </section>
      </>
    )
  }
}

export default App
