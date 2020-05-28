import React from  'react'
import '../assets/audioInput.css'

const AudioInput = ({ song, onEnded, onTimeUpdate, value, onChange}) => {
    return song ?
      <div className="audio-input-container">
        <h1>{song.title}</h1>
        <audio onEnded={onEnded} onTimeUpdate={onTimeUpdate} src={song.preview} controls autoPlay />
        <section>
          <input type="text" value={value} autoFocus onChange={onChange} />
        </section>
      </div>
      : <h1>End Game</h1>
}

export default  AudioInput