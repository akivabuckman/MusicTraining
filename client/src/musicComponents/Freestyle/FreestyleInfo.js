import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "../../App";
import jwt_token from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';


const FreestyleInfo = (props) => {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const { token } = useContext(AppContext);
    const allNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

    const handleLowestNoteChange = (event) => {
        props.setLowestNote(event.target.value)
    };

    const handleInstrumentChange = (event) => {
        props.setInstrument(event.target.value.toLowerCase())
    };

    const saveSong = async () => {
        // check if song name is entered
        const songNameInput = document.querySelector("#songNameInput");
        if (songNameInput.value === "") {
            songNameInput.setAttribute("placeholder", "ENTER SONG NAME");
            songNameInput.setAttribute("style", "border: 5px solid red")
        } else {
            if (token) {
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
                document.querySelector("#popupContainerG").style.display = "block";
                document.querySelector("#dynamicText").innerHTML = `<p><strong>${songNameInput.value}</strong> sounds awesome and it has been saved. You can see it in your stats.</p>`
                document.querySelector("#closePopupButtonG").addEventListener("click", () => {
                document.querySelector("#popupContainerG").style.display = "none" })
              } catch (error) {
                console.log(error)
              }    
            } else {
                document.querySelector("#popupContainer").style.display = "block";
                document.querySelector("#closePopupButton").addEventListener("click", () => {
                document.querySelector("#popupContainer").style.display = "none"
            })
            }
            
        } 
    }

    //event listener if name box is active
    useEffect(()=>{
        const nameBox = document.querySelector("#songNameInput");
        const activateNameBox = () => {
            props.setNameBoxActive(true)
        };

        const deactivateNameBox = () => {
            props.setNameBoxActive(false)
        };
        nameBox.addEventListener("focus", activateNameBox);
        nameBox.addEventListener("blur", deactivateNameBox);

        return () => {
            nameBox.removeEventListener("focus", activateNameBox);
            nameBox.removeEventListener("blur", deactivateNameBox);
        }
    })

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
        </>
        
    );
};

export default FreestyleInfo;
