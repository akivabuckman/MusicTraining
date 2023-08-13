import React, { useState, useEffect } from 'react';
import "./SongNotes.css"

const SongNotesInfoPane = (props) => {
    const allNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    const handleKeyChange = (event) => {
        props.setSongKey(event.target.value)
    };

    const handleInstrumentChange = (event) => {
        props.setInstrument(event.target.value.toLowerCase())
    };
    
    const handleSongChange = (event) => {
        props.setChosenSong(event.target.value)
    }
    return (
        <div id="SongNotesInfoPaneDiv" className="info-pane">
            <p>Song:  
                <select value={props.chosenSong} onChange={handleSongChange}>
                        {
                            Object.keys(props.melodies).map((melody, index)=> {
                                return(
                                    <option key={index} value={melody}>{melody}</option>
                                )
                            })
                        }
                </select>
            </p>
            <p>Perfect Notes: {props.correctCount}/{props.currentDegreeIndex}</p>
            <p>Song Length: {props.melodyDegrees.length} Notes</p>
            <p>Instrument:  
                <select onChange={handleInstrumentChange}>
                    <option key="Piano" value="Piano">Piano</option>
                    <option key="Guitar" value="Guitar">Guitar</option>
                </select>
            </p>
            <p>Key:
                <select value={props.songKey} onChange={handleKeyChange}>
                    {allNotes.map((i) => (
                        <option key={i} value={i}>
                            {i}
                        </option>
                    ))}
                </select>
            </p>
            <button onClick={props.reset}>Start Over</button>
        </div>
    );
};

export default SongNotesInfoPane;
