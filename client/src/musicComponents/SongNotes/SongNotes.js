import { useState, useEffect, useContext } from "react";
import "./SongNotes.css"
import { AppContext } from "../../App";
import jwt_token from "jwt-decode";
import { Link } from 'react-router-dom';


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

    // piano keys updates uesrnotes, then notes
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
            const res = await fetch("http://localhost:5000/music/songNotes", {
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

    useEffect(()=>{
      analyzePressedKey();
    }, [props.pressedKey]);

    useEffect(()=>{
      saveToDb();
    }, [props.currentDegreeIndex]);

    useEffect(()=>{
      if (props.currentDegreeIndex !== 0) {
          props.setCorrectDegree(props.melodyDegrees[props.currentDegreeIndex]); // 5
      } else {
        props.setCorrectDegree(props.melodyDegrees[props.currentDegreeIndex]); // 5
      }
  }, [props.currentDegreeIndex])
      
  useEffect(()=>{
      if (props.currentDegreeIndex !== 0) {
          props.setCorrectNote(allNotes[(degreeToFret[props.correctDegree] + allNotes.indexOf(props.songKey)) % 12]) // G
      } else {
        props.setCorrectNote(allNotes[(degreeToFret[props.correctDegree] + allNotes.indexOf(props.songKey)) % 12]) // G
      }
  }, [props.correctDegree])
  

  useEffect(()=>{
    props.reset();
  }, [props.songKey, props.chosenSong, props.instrument]);


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

    useEffect(()=>{
      if (props.currentDegreeIndex !== 0 && props.currentDegreeIndex < props.melodyDegrees.length) {
        document.querySelector(`#songNotes :nth-child(${props.currentDegreeIndex})`).classList.remove("currentNote")
        document.querySelector(`#songNotes :nth-child(${props.currentDegreeIndex + 1})`).classList.add("currentNote")  
      } else if (props.currentDegreeIndex < props.melodyDegrees.length) {
        document.querySelector(`#songNotes :nth-child(${props.currentDegreeIndex + 1})`).classList.add("currentNote")  

      }
    }, [props.currentDegreeIndex]);

    useEffect(() => {
      if (token) {
          const payload = jwt_token(token);
          setUsername(payload.username);
          setUserId(payload.userid);
        }
    }, []);
    
    const log = () =>{
        console.log("XXXXXXXXXXXXXXXXXXXXX")
        console.log("correct note", props.correctNote);
        console.log("currentdegreeindex:", props.currentDegreeIndex);
        console.log("correctdegree", props.correctDegree)
        console.log("correct count:", props.correctCount);
        console.log("trycount", props.tryCount);
        console.log('usernotes', props.userNotes);
        console.log(props.correctCount/props.melodyDegrees.length);
        console.log("lowest degree", props.lowestDegree);
        console.log("played note", props.note)
    }
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
      </>
        
      );
}

export default SongNotes