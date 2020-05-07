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
    this.renderContent = this.renderContent.bind( this )
    this.cleanString = this.cleanString.bind( this )
    this.history = this.history.bind( this )
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
    this.history()
    const playlist = this.state.data
    const song = playlist[Math.floor( Math.random() * playlist.length )]
    this.setState( {
      answer: '',
      song: song,
      data: playlist.filter( el => el.id !== song.id )
    } )
  }

  cleanString( string ) {
    return string.toLowerCase().replace( /(\((.*?)\))/, '' ).trim().normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" )
  }

  getInputValue( e ) {
    this.setState( { answer: e.target.value }, () => {
      const songTitle = this.cleanString( this.state.song.title )
      const answer = this.cleanString( this.state.answer )
      const match = stringSimilarity.compareTwoStrings( songTitle, answer )
      if ( match >= .7 && songTitle.length === answer.length ) {
        this.state.history.push( {"title":songTitle, "success":true })
        this.reward()
        if ( this.state.data === [] )
          this.setState( { endGame: false } )
        else this.randSong()
      }
    } )
  }

  history() {
    if(this.state.answer === ''){
      this.state.history.push({"title":this.state.song.title, "success":false})
    }
  }

  reward() {
    const score = 25 + (30 - this.state.time)
    this.setState( { score: this.state.score + score } )
  }

  getCurrentTime( e ) {
    const currentTime = Math.floor( e.currentTarget.currentTime )
    this.setState( { time: currentTime } )
  }

  renderContent( song ) {
    return song ?
      <>
        <h1>{song.title}</h1>
        <audio onEnded={this.randSong} onTimeUpdate={this.getCurrentTime} src={song.preview} controls autoPlay />
        <section>
          <input type="text" value={this.state.answer} autoFocus onChange={( e ) => this.getInputValue( e )} />
        </section>
      </>
      : <h1>End Game</h1>
  }

  render() {
    const { song, history } = this.state
    const content = this.renderContent( song )
    const score = this.state.score
    return (
      <>
        {score}
        {content}
        {history.length > 0 && (
          history.map(i => <p style={!i.success ? {color:"red"} : {color:"green"}}key={i.title}>{i.title}</p>)
        )}
      </>
    )
  }
}

export default App
