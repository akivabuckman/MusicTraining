import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "../../App";
import jwt_token from "jwt-decode";
import { Link } from 'react-router-dom';
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

/**
 * Component for displaying freestyle information and actions.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @param {function} props.setLowestNote - Function to set the lowest note.
 * @param {function} props.setInstrument - Function to set the instrument.
 * @param {string} props.instrument - The selected instrument.
 * @param {string} props.lowestNote - The lowest note.
 * @param {function} props.reset - Function to reset.
 * @param {Array} props.userNotes - Array of user notes.
 * @param {Array} props.userTimes - Array of timestamps of each played note.
 * @param {Array} props.notesWithOctaves - Array of notes with octaves.
 * @param {boolean} props.setNameBoxActive - Function to set name box active.
 * @returns {JSX.Element} - JSX elements representing song info.
 */
const FreestyleInfo = (props) => {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const { token } = useContext(AppContext);
    const allNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

    /**
     * If user changes the lowest note on the piano, the piano will adjust accordingly.
     * @function handleLowestNoteChange
     * @param {object} event - Event object when user changes lowest note.
     */
    const handleLowestNoteChange = (event) => {
        props.setLowestNote(event.target.value)
    };

    /**
     * If user changes instrument, the instrument prop is set.
     * @function handleInstrumentChange
     * @param {object} event - Event object when user changes instrument.
     */
    const handleInstrumentChange = (event) => {
        props.setInstrument(event.target.value.toLowerCase())
    };

    /**
     * This function gets the chosen song name, and adds it to the database if the user is logged in.
     * @async
     * @function saveSong
     * @param {number} userId - user ID#
     * @param {string} songNameInput - user defined song name
     * @param {Array} props.userNotes - Array of user notes
     * @param {Array} props.userTimes - Array of timestamps of each played note.
     * @param {Array} props.notesWithOctaves - Array of notes with octaves.
     */
    const saveSong = async () => {
        // check if song name is entered
        const songNameInput = document.querySelector("#songNameInput");
        if (songNameInput.value === "") {
            songNameInput.setAttribute("placeholder", "ENTER SONG NAME");
            songNameInput.setAttribute("style", "border: 5px solid red")
        } else {
            if (token) {
            // add to database
            try {
                const data = JSON.stringify({
                  user_id: userId,
                  song_length: props.userNotes.length,
                  user_notes: props.userNotes,
                  song_name: songNameInput.value,
                  user_times: props.userTimes,
                  notes_octaves: props.notesWithOctaves
                })
                const res = await fetch("/music/userSong", {
                  method: "POST",
                  headers: {"content-type": "application/json"},
                  body: data,
                });
                const parsedData = await res.json();

                // popup box
                document.querySelector("#popupContainerG").style.display = "block";
                document.querySelector("#dynamicText").innerHTML = `<p><strong>${songNameInput.value}</strong> sounds awesome and it has been saved. You can see it in your stats.</p>`
                document.querySelector("#closePopupButtonG").addEventListener("click", () => {
                document.querySelector("#popupContainerG").style.display = "none" })
              } catch (error) {
                console.log(error)
              }    
            } else {
                // if not logged in, just display popup box
                document.querySelector("#popupContainer").style.display = "block";
                document.querySelector("#closePopupButton").addEventListener("click", () => {
                document.querySelector("#popupContainer").style.display = "none"
                });
            };
        }
    }

    /**
     * Event listener - if name box (where user inputs song name) is active, deactivate the instrument when user types.
     * @function useEffectUponInitialMount
     * @fires setNameBoxActive
     */
    useEffect(()=>{
        const nameBox = document.querySelector("#songNameInput");
        const activateNameBox = () => {
            props.setNameBoxActive(true)
        };

        const deactivateNameBox = () => {
            props.setNameBoxActive(false)
        };

        // Add event listener when user navigates to Freestyle page
        nameBox.addEventListener("focus", activateNameBox);
        nameBox.addEventListener("blur", deactivateNameBox);

        // remove event listener when user navigates away from Freestyle page
        return () => {
            nameBox.removeEventListener("focus", activateNameBox);
            nameBox.removeEventListener("blur", deactivateNameBox);
        }
    }, [])

    /**
    * Authentication function upon page startup.
    * @function useEffectUponTokenMount
    * @param {string} token - secret generated token
    * @fires setUserId
    * @fires setUsername
    */
    useEffect(() => {
        if (token) {
            const payload = jwt_token(token);
            setUsername(payload.username);
            setUserId(payload.userid);
          }
    }, [token]);
    
    return (
        <>
        <div id="FreestyleInfoPaneDiv" className="info-pane">
            <div id="titleDiv">
                <h3 id="title">Freestyle</h3>
                <h4>Play around and have fun!</h4>
            </div>
            <div id="data">
                <p>Instrument: 
                    <select onChange={handleInstrumentChange}>
                        <option key="Piano" value="Piano">Piano</option>
                        <option key="Guitar" value="Guitar">Guitar</option>
                    </select>
                </p>
            {
                props.instrument === "piano" ? 
                <p>Lowest Note:
                    <select value={props.lowestNote} onChange={handleLowestNoteChange}>
                        {allNotes.map((i) => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </p>
                :
                null
            }
            
            <button onClick={props.reset}>Start Over</button>
            <input id="songNameInput" name="song_name" type="text" placeholder='Enter Song Name'></input>
            <button onClick={saveSong}>Save</button>
        </div>
            </div>
            
        <div id="popupContainer" className="popup-container">
              <div className="popup">
                  <p>You need to <Link to="../login">log in</Link> or <Link to="../register">register</Link> to save your songs</p>
                  <button id="closePopupButton">OK</button>
              </div>
        </div>
        <div id="popupContainerG" className="popup-containerG">
            <div className="popupG">
                <div id="dynamicText"></div>
                <button id="closePopupButtonG">OK</button>
            </div>
        </div>
        <div className="infoPopup">
            <div className="infoPopupContent">
                <h3>Welcome to the Freestyle page!</h3>
                <p>To play a note, type the letter shown in (parenthesis) on each piano key / guitar fret</p>
                <p>For example, press the "S" key to play a musical D note</p>
                <p>You can toggle between piano and guitar!</p>
                <strong>Have fun!</strong>
                <button id="closePopupButtonInfo" onClick={()=>{
                    document.querySelector(".infoPopup").style.display="none"
                }}>Let's Jam!</button>
            </div>
        </div>

        </>
        
    );
};

export default FreestyleInfo;
