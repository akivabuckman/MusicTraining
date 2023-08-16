import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../App"
import jwt_token from "jwt-decode";
import "./SongDetail.css"

/**
 * Represents a component that displays detailed information about a song.
 * Controls functionality of the page
 *
 * @component
 * @param {Object} props - The props object that contains any additional properties passed to the component.
 * @returns {JSX.Element} JSX element representing the SongDetail component.
 *
 */
const SongDetail = (props) => {
    const navigate = useNavigate();
    const colors = {
        "C": "(255, 0, 0)",
        "C#": "(255, 150, 150)",
        "Db": "(255, 150, 150)",
        "D": "(255, 165, 0)",
        "D#": "(255, 210, 150)",
        "Eb": "(255, 210, 150)",
        "E": "(255, 255, 0)",
        "F": "(0, 255, 0)",
        "F#": "(150, 255, 150)",
        "Gb": "(150, 255, 150)",
        "G": "(0, 255, 255)",
        "G#": "(150, 255, 255)",
        "Ab": "(150, 255, 255)",
        "A": "(0, 0, 255)",
        "A#": "(150, 150, 255)",
        "Bb": "(150, 150, 255)",
        "B": "(75, 0, 130)"
    }
    const [songData, setSongData] = useState({})
    const [userNotes, setUserNotes] = useState("");
    const [noteArray, setNoteArray] = useState([]);
    const [songName, setSongName] = useState("");
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [instrument, setInstrument] = useState("guitar")
    const { token } = useContext(AppContext);
    const { song_id } = useParams();
    
    /**
     * fetches song details (notes, timestamps, etc.)
     * @function useEffectUponSongOrUserChange
     * @param {number} userId - user ID#
     * @param {number} song_id = song ID#
     * @fires setSongData
     * @fires fetchSongDetails
     */
    useEffect(() => {
        /**
         * @function fetchSongDetails
         * @async
         * @param {number} userId - user ID#
         * 
         */
        const fetchSongDetails = async () => {
            if (userId === jwt_token(token).userid) {
                try {
                    const response = await fetch(`/music/userSongs/${userId}/${song_id}`);
                    const data = await response.json();
                    setSongData(data[0])
                } catch (error) {
                    console.error("Error fetching song details:", error);
                }
            }
        };
        fetchSongDetails();
    }, [song_id, userId]);

    /**
     * Sets notes and songname of currently viewed song after fetch
     * @function useEffectUponSongDataUpdate
     * @fires setNoteArray
     * @fires setSongName
     * @param {object} songData - object of user's song data
     */
    useEffect(()=>{
        if (songData.user_notes) {
            const modifiedString = "[" + songData.user_notes.replace("{", '').replace("}", '') + "]";
            const arrayData = JSON.parse(modifiedString);
            setNoteArray(arrayData)
            setSongName(songData.song_name)
        };
    }, [songData])

    /**
     * Deletes currently viewed song and controls popup box that informs of the deletion
     * 
     * @async
     * @function deleteSong
     * @param {number} song_id - song ID#
     */
    const deleteSong = async () => {
        try {
            await fetch(`/music/userSongs/${song_id}`, {
                method: 'DELETE'
            });
            document.querySelector("#popupContainer").style.display = "block";
            document.querySelector("#closePopupButton").addEventListener("click", () => {
            navigate("/stats")

            })
            /**
             *  Redirect the user to the stats page
             */
            
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * plays the song audially
     * @function playSong
     * @param {object} songData - song data including notes and timestamps
     */
    const playSong = () => {
        const firstTime = songData.user_times[0];
        
        for (let i in songData.notes_octaves) {
            setTimeout(() => {
                let sound
                if (instrument === "piano") {
                    sound = require(`../musicComponents/sounds/piano/${songData.notes_octaves[i]}.mp3`);
                } else {
                    sound = require(`../musicComponents/sounds/guitar/${songData.notes_octaves[i]}.mp3`);
                }
                const audio = new Audio(sound)
                audio.play();
            }, songData.user_times[i] - firstTime);
        }
    }

    /**
     * Updates username and user id upon token mount
     * @function useEffectUponTokenMount
     * @param {string} token - secret generated token
     * @fires setUsername
     * @fires setUserId
     */
    useEffect(() => {
        if (token) {
            const payload = jwt_token(token);
            setUsername(payload.username);
            setUserId(payload.userid);
          }
    }, [token]);

    /**
     * If user changes instrument, the instrument prop is set.
     * @function handleInstrumentChange
     * @param {object} event - Event object when user changes instrument.
     */
    const handleInstrumentChange = (event) => {
        setInstrument(event.target.value.toLowerCase())
    };
    return (
        <>
        <div>
            <h2>Song Name: {songName}</h2>
            <div id="notesDiv">
            {
                noteArray.map((degree, index) => (
                <div key={index} className="note" style={{backgroundColor: `rgb${colors[degree]}`}}>{degree}</div>
                ))
            }
            </div>
            <div id="actions">
                <p>Instrument: 
                    <select onChange={handleInstrumentChange}>
                        <option key="Guitar" value="Guitar">Guitar</option>
                        <option key="Piano" value="Piano">Piano</option>
                    </select>
                </p>
                <button onClick={playSong}>Play Song</button>
                <button onClick={deleteSong}>Delete Song</button>
            </div>
        </div>
        <div id="popupContainer" className="popup-container">
            <div className="popup">
                <p>{songName} has been deleted</p>
                <button id="closePopupButton">OK</button>
            </div>
        </div>
        </>
       
    );
}

export default SongDetail;
