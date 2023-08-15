import { useState, useEffect, useContext } from "react";
import "./SongNotes.css"
import { AppContext } from "../../App";
import jwt_token from "jwt-decode";
import { Link } from 'react-router-dom';

/**
 * Represents the component for displaying and interacting with song notes.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.songKey - The key of the song (e.g., "C", "D#").
 * @param {number[]} props.melodyDegrees - The degrees of the melody in the song.
 * @param {string[]} props.colors - The colors associated with each note.
 * @param {boolean} props.colorsOn - Whether colors are enabled.
 * @param {string} props.note - The currently played note.
 * @param {string} props.correctNote - The correct note for the current degree.
 * @param {number} props.currentDegreeIndex - The index of the current melody degree.
 * @param {number} props.tryCount - The count of attempted plays for the current note.
 * @param {number} props.correctCount - The count of correct plays.
 * @param {string} props.userNotes - The notes played by the user.
 * @param {string} props.correctDegree - The correct degree for the current note.
 * @param {string} props.chosenSong - The chosen song for learning.
 * @param {string} props.instrument - The selected instrument for playing.
 * @param {number} props.lowestDegree - The lowest degree in the melody.
 * @param {boolean} props.pressedKey - Whether a key is pressed.
 * @param {string} token - The authentication token.
 * @returns {JSX.Element} The rendered SongNotes component.
 */
const SongNotes = (props) => {
    const degreeToFret = {1: 0, 2: 2, 3: 4, 4:5, 5:7, 6:9, 7:11, 8:12, 9: 14, 10: 16, 11:17, 12: 19, 13:21, 14: 23};
    const songKey = props.songKey;
    const melodyDegrees = props.melodyDegrees;
    const allNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    const rootIndex = allNotes.indexOf(songKey); // 0
    const degreeToIndex = {1: 0, 2: 2, 3: 4, 4:5, 5:7, 6:9, 7:11, 8:12, 9: 14, 10: 16, 11:17, 12: 19, 13:21, 14: 23};
    const melodyIndexes = melodyDegrees.map((degree) => degreeToIndex[degree]);
    const melodyNotes = melodyIndexes.map((fret) => allNotes[(fret + rootIndex) % 12]);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const { token } = useContext(AppContext);

    /**
   * Analyzes the pressed key and updates the user's progress.
   * @function analyzePressedKey
   * @param {string} props.note - The currently played note.
   * @param {string} props.correctNote - The correct note for the current degree.
   * @param {number} props.tryCount - The count of attempted plays for the current note.
   * @fires setCurrentDegreeIndex
   * @fires setCorrectCount
   * @fires setTryCount
   */
    const analyzePressedKey = () => {
      if (props.note !== "") {
        // compare played note to correct note
        if (props.correctNote === props.note) { // if correct
          props.setCurrentDegreeIndex(i=>i+1);
          if (props.tryCount === 0) {
              props.setCorrectCount(i=>i+1);
              document.querySelector(`#songNotes :nth-child(${props.currentDegreeIndex + 1})`).classList.add("correct")
          } else {
            document.querySelector(`#songNotes :nth-child(${props.currentDegreeIndex + 1})`).classList.add("incorrect")
          }
          props.setTryCount(0);

          } else { // if incorrect
            if (props.note !== "") {
              props.setTryCount(i=>i+1);
            }
          }
      }
    };

    /**
   * Saves the user's progress to the database when the melody is completed.
   * @async
   * @function saveToDb
   * @param {number} props.currentDegreeIndex - The index of the current melody degree.
   * @param {number[]} props.melodyDegrees - The degrees of the melody in the song.
   * @param {number} userId - user ID#
   * @param {string} props.songKey - The key of the song (e.g., "C", "D#").
   * @param {string} props.chosenSong - The chosen song for learning.
   * @param {number} props.correctCount - The count of correct plays.
   * @param {string[]} melodyNotes - Array of the notes of the melody
   * @param {string} props.userNotes - The notes played by the user.
   * @param {string} props.instrument - The selected instrument for playing.
   */
    const saveToDb = async () => {
      if (props.currentDegreeIndex === props.melodyDegrees.length) {
        if (userId !== "") {
          try {
            const data = JSON.stringify({
              user_id: userId,
              key: props.songKey,
              song: props.chosenSong,
              correct_count: props.correctCount,
              song_length: props.melodyDegrees.length,
              song_degrees: props.melodyDegrees,
              song_notes: melodyNotes,
              user_notes: props.userNotes,
              score: props.correctCount/props.melodyDegrees.length,
              instrument: props.instrument
            })
            const res = await fetch("/music/songNotes", {
              method: "POST",
              headers: {"content-type": "application/json"},
              body: data,
            });
            const parsedData = await res.json();
          } catch (error) {
            console.log(error)
          }
        }
        document.querySelector("#popupContainer").style.display = "block";
        document.querySelector("#closePopupButton").addEventListener("click", () => {
        document.querySelector("#popupContainer").style.display = "none"
        })
        
      }
    }

    /**
     * call analyze function upon pressedKey change
     *  */ 
    useEffect(()=>{
      analyzePressedKey();
    }, [props.pressedKey]);

    /**
     * call saveToDb when correct note is played which causes degree index to increase by 1
     * saveToDb will only save if song is complete
     */

    useEffect(()=>{
      saveToDb();
    }, [props.currentDegreeIndex]);

    /**
     * set correct current degree when user moves on to next note
     */
    useEffect(()=>{
      if (props.currentDegreeIndex !== 0) {
          props.setCorrectDegree(props.melodyDegrees[props.currentDegreeIndex]); // 5
      } else {
        props.setCorrectDegree(props.melodyDegrees[props.currentDegreeIndex]); // 5
      }
  }, [props.currentDegreeIndex])
      
  /**
   * converts correct degree (int) to correct note (string)
   */
  useEffect(()=>{
      if (props.currentDegreeIndex !== 0) {
          props.setCorrectNote(allNotes[(degreeToFret[props.correctDegree] + allNotes.indexOf(props.songKey)) % 12]) // G
      } else {
        props.setCorrectNote(allNotes[(degreeToFret[props.correctDegree] + allNotes.indexOf(props.songKey)) % 12]) // G
      }
  }, [props.correctDegree])
  
  /**
   * resets when user changes the key, song, or instrument
   */
  useEffect(()=>{
    props.reset();
  }, [props.songKey, props.chosenSong, props.instrument]);


  /**
   * changes colors when user toggles colors on/off 
   */
  useEffect(()=>{
    const noteDivs = Array.from(document.querySelectorAll(".note"));
    for (let i of noteDivs) {
      if (props.colorsOn) {
        i.style.color = "black"
      } else {
        i.style.color = i.textContent.charAt(i.textContent.length - 1) === "b" ? "white" : "black"
      }
    }
  }, [props.colorsOn])

  /**
   * highlights the current note for user to play
   */
  useEffect(()=>{
    if (props.currentDegreeIndex !== 0 && props.currentDegreeIndex < props.melodyDegrees.length) {
      document.querySelector(`#songNotes :nth-child(${props.currentDegreeIndex})`).classList.remove("currentNote")
      document.querySelector(`#songNotes :nth-child(${props.currentDegreeIndex + 1})`).classList.add("currentNote")  
    } else if (props.currentDegreeIndex < props.melodyDegrees.length) {
      document.querySelector(`#songNotes :nth-child(${props.currentDegreeIndex + 1})`).classList.add("currentNote")  

    }
  }, [props.currentDegreeIndex]);

  /**
   * upon initial mount, sets username and userId
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
                {/* <button onClick={log}>log songnotes</button> */}
        <div id="songNotes">

          {
            melodyNotes.map((degree, index) => (
              <div key={index} className="note" style={{backgroundColor: `rgb${props.colors[degree]}`}}>{degree}</div>
            ))
          }
        </div>
        <div id="popupContainer" className="popup-container">
            <div className="popup">
                <p>Great Job {username}!</p>
                <p>You nailed {props.correctCount} out of {props.melodyDegrees.length} notes.</p>
                <p>For a score of {Math.round(props.correctCount/props.melodyDegrees.length*100)}%</p>
                {
                  userId === "" ? <p>If you <Link to="../login">log in</Link> or <Link to="../register">register</Link> you can save your progress</p> : (<p>Your progess has been saved</p>)
                }
                
                <button id="closePopupButton">OK</button>
            </div>
        </div>
        <div className="infoPopup">
            <div className="infoPopupContent">
                <h3>Welcome to the Song Notes page!</h3>
                <p>You pick the song you want to learn. We will show you the notes to play</p>
                <p>You pick the key you'd like to play in. By default it'll be C</p>
                <p>The current note you should play will be <span style={{border: "1px solid black", outline: "1px solid yellow", borderRadius: "5px", padding: "2px"}}>highlighted black and yellow</span></p>
                <p>To play a note, type the letter shown in (parenthesis) on each piano key / guitar fret</p>
                <p>You can toggle between piano and guitar!</p>
                <strong>Have fun!</strong>
                <button id="closePopupButtonInfo" onClick={()=>{
                    document.querySelector(".infoPopup").style.display="none"
                }}>Let's Learn!</button>
            </div>
        </div>        
      </>
        
      );
}

export default SongNotes