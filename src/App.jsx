import './App.css'
import React, { Component } from 'react'
import stringSimilarity from 'string-similarity'

class App extends Component {


  constructor( props ) {
    super( props )

    this.state = {
      data: [],
      song: {},
      answer: '',
      time: 0,
      score: 0,
      history: [],
      endGame: false
    }

    this.reward = this.reward.bind( this )
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
      const songTitle = this.state.song.title.toLowerCase().replace( /(\((.*?)\))/, '' ).trim()
      const answer = this.state.answer.toLowerCase()
      const match = stringSimilarity.compareTwoStrings( songTitle, answer )
      if ( match >= .7 && songTitle.length === answer.length ) {
        this.state.history.push( songTitle )
        this.reward()
        console.log( this.state.history )
        if ( this.state.data === [] )
          this.setState( { endGame: false } )
        else this.randSong()
      }
    } )
  }

  reward() {
    this.setState( { score: this.state.score + 25 } )
    console.log( this.state.score )
  }

  getCurrentTime( e ) {
    const currentTime = Math.floor( e.currentTarget.currentTime )
    this.setState( { time: currentTime } )
  }

  renderContent( song ) {
    return (
      <>
        {
          song ?
            <>
              <h1>{song.title}</h1>
              <audio onEnded={this.randSong} onTimeUpdate={this.getCurrentTime} src={song.preview} controls autoPlay />
              <section>
                <input type="text" value={this.state.answer} autoFocus onChange={( e ) => this.getInputValue( e )} />
              </section>
            </>
            : <h1>End Game</h1>
        }
      </>
    )
  }

  render() {
    const { song } = this.state
    const content = this.renderContent( song )
    return (
      <>
        {content}
      </>
    )
  }
}

export default App
