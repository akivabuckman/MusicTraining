import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SongDetail.css"
import { AppContext } from "./App"
import jwt_token from "jwt-decode";

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
    const { token } = useContext(AppContext);



    const { song_id } = useParams();
    
    useEffect(() => {
        const fetchSongDetails = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:5000/music/userSongs/${userId}/${song_id}`);
                    const data = await response.json();
                    setSongData(data[0])
                } catch (error) {
                    console.error("Error fetching song details:", error);
                }
            }
        };
        fetchSongDetails();
    }, [song_id, userId]);

    useEffect(()=>{
        if (songData.user_notes) {
            const modifiedString = "[" + songData.user_notes.replace("{", '').replace("}", '') + "]";
            const arrayData = JSON.parse(modifiedString);
            setNoteArray(arrayData)
            setSongName(songData.song_name)
        };
    }, [songData])

    const deleteSong = async () => {
        try {
            await fetch(`http://localhost:5000/music/userSongs/${song_id}`, {
                method: 'DELETE'
            });
            document.querySelector("#popupContainer").style.display = "block";
            document.querySelector("#closePopupButton").addEventListener("click", () => {
            navigate("/stats")

            })
            // Redirect the user to the stats page
            
        } catch (error) {
            console.log(error);
        }
    };

    const playSong = () => {
        const firstTime = songData.user_times[0];
        
        for (let i in songData.notes_octaves) {
            setTimeout(() => {
                const sound = require(`./musicComponents/sounds/${songData.notes_octaves[i]}.mp3`);
                const audio = new Audio(sound)
                audio.play();
            }, songData.user_times[i] - firstTime);
        }
    }

    useEffect(() => {
        if (token) {
            const payload = jwt_token(token);
            setUsername(payload.username);
            setUserId(payload.userid);
          }
    }, [token]);

    const log = () => {
        console.log(token)
    }

    return (
        <>
        <div>
            <button onClick={log}>logsondetail</button>
            <button onClick={playSong}>play</button>
            <h2>Song Name: {songName}</h2>
            <div id="notesDiv">
            {
                noteArray.map((degree, index) => (
                <div key={index} className="note" style={{backgroundColor: `rgb${colors[degree]}`}}>{degree}</div>
                ))
            }
            </div>
            <button onClick={deleteSong}>Delete Song</button>
        </div>
        <div id="popupContainer" class="popup-container">
            <div class="popup">
                <p>{songName} has been deleted</p>
                <button id="closePopupButton">OK</button>
            </div>
        </div>
        </>
       
    );
}

export default SongDetail;
