import './App.css'
import React, { Component } from 'react'
import stringSimilarity from 'string-similarity'
import History from "./component/history";
import AudioInput from './component/audioInput';

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
    this.cleanString = this.cleanString.bind( this )
    this.answerNotFound = this.answerNotFound.bind( this )
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
    if(this.state.song.artist) this.answerNotFound()
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
    const { song } = this.state
    const artistName = song ? song.artist.name : null

    this.setState( { answer: e.target.value }, () => {
      const songTitle = this.cleanString( song.title )
      const answer = this.cleanString( this.state.answer )
      const match = stringSimilarity.compareTwoStrings( songTitle, answer )
      if ( match >= .7 && songTitle.length === answer.length ) {
        this.state.history.push({
          "title": song.title,
          "artist": artistName,
          "success": true
        })
        this.reward()
        if ( this.state.data === [] )
          this.setState( { endGame: false } )
        else this.randSong()
      }
    } )
  }

  answerNotFound() {
    const { song } = this.state
    const artistName = song ? song.artist.name : null
    if(this.state.answer === ''){
      this.state.history.push({
        "title": song.title,
        "artist": artistName,
        "success": false
      })
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

  render() {
    const { song, history, answer } = this.state
    const score = this.state.score

    return (
      <>
        {score}
        <div className="main-container">
          <History history={ history }/>
          <AudioInput
            song = { song }
            onEnded = { this.randSong }
            onTimeUpdate = { this.getCurrentTime }
            value = { answer }
            onChange = { (e) => this.getInputValue(e) }
          />
        </div>
      </>
    )
  }
}

export default App
