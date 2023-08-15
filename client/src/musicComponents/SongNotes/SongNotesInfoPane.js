import React, { useState, useEffect } from 'react';
import "./SongNotes.css"

/**
 * A component that displays information and controls related to song notes
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.melodies - An object containing available melodies.
 * @param {string} props.chosenSong - The currently chosen song.
 * @param {number} props.correctCount - The count of correctly played notes.
 * @param {number} props.currentDegreeIndex - The total number of notes attempted.
 * @param {string} props.songKey - The selected musical key.
 * @param {Function} props.setSongKey - Function to update the selected musical key.
 * @param {string} props.instrument - The selected instrument (Piano or Guitar).
 * @param {Function} props.setInstrument - Function to update the selected instrument.
 * @param {string} props.chosenSong - The chosen song.
 * @param {Function} props.setChosenSong - Function to update the chosen song.
 * @param {Function} props.reset - Function to reset the user notes.
 * @returns {JSX.Element} The rendered component.
 */
const SongNotesInfoPane = (props) => {
    const allNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

    /**
     * changes songKey prop when user changes the key
     * @function handleKeyChange
     * @param {object} event - user changes key
     * @fires setSongKey
     */
    const handleKeyChange = (event) => {
        props.setSongKey(event.target.value)
    };

    /**
     * changes instrument prop when user changes the instrument
     * @function handleInstrumentChange
     * @param {object} event - user changes instrument
     * @fires setInstrument
     */
    const handleInstrumentChange = (event) => {
        props.setInstrument(event.target.value.toLowerCase())
    };
    
    /**
     * changes songKey prop when user changes the song
     * @function handleSongChange
     * @param {object} event - user changes song
     * @fires setChosenSong
     */
    const handleSongChange = (event) => {
        props.setChosenSong(event.target.value)
    }
    
    return (
        <div id="SongNotesInfoPaneDiv" className="info-pane">
            <div id="titleDiv">
                <h3 id="title">Song Notes</h3>
                <h4>Play the notes shown</h4>
            </div>
            <div id="data">
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
            <p>Perfect Notes: <strong>{props.correctCount}/{props.currentDegreeIndex}</strong></p>
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
        </div>
    );
};

export default SongNotesInfoPane;
