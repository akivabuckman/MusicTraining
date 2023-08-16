import { useState, useEffect, useContext } from "react";
import PianoKeys from "../musicComponents/instruments/PianoKeys";
import FreestyleInfo from "../musicComponents/Freestyle/FreestyleInfo";
import FreestyleNotes from "../musicComponents/Freestyle/FreestyleNotes"
import GuitarNeck from "../musicComponents/instruments/GuitarNeck";

const FreestyleApp = (props) => {
    const [userNotes, setUserNotes] = useState([]);
    const [instrument, setInstrument] = useState("piano");
    const [aKeyNote, setaKeyNote] = useState("");
    const [aKeyIndex, setaKeyIndex] = useState(0);
    const [colorsOn, setColorsOn] = useState(true);
    const [note, setNote] = useState("");
    const [lowestNote, setLowestNote] = useState("C");
    const [nameBoxActive, setNameBoxActive] = useState(false);
    const [pressedKey, setPressedKey] = useState("");
    const [userTimes, setUserTimes] = useState([]);
    const [notesWithOctaves, setNotesWithOctaves] = useState([]);

    
    const colors = colorsOn ? {
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
    } : {
      "C": "(255, 255, 255)",
      "C#": "(0, 0, 0)",
      "Db": "(0, 0, 0)",
      "D": "(255, 255, 255)",
      "D#": "(0, 0, 0)",
      "Eb": "(0, 0, 0)",
      "E": "(255, 255, 255)",
      "F": "(255, 255, 255)",
      "F#": "(0, 0, 0)",
      "Gb": "(0, 0, 0)",
      "G": "(255, 255, 255)",
      "G#": "(0, 0, 0)",
      "Ab": "(0, 0, 0)",
      "A": "(255, 255, 255)",
      "A#": "(0, 0, 0)",
      "Bb": "(0, 0, 0)",
      "B": "(255, 255, 255)"
    }

    const reset = () => {
      const noteDiv = document.querySelector("#freestyleUserNotesDiv");
      setUserNotes([]);
      setUserTimes([]);
      setNotesWithOctaves([]);
    }
    return (
        <div id="freestyleApp">
        <FreestyleInfo 
            reset={reset}
            instrument={instrument} 
            setInstrument={setInstrument} 
            colors={colors}
            lowestNote={lowestNote}
            setLowestNote={setLowestNote}
            userNotes={userNotes}
            setUserNotes={setUserNotes}
            userTimes ={userTimes}
            setUserTimes={setUserTimes}
            nameBoxActive={nameBoxActive}
            setNameBoxActive={setNameBoxActive}
            notesWithOctaves={notesWithOctaves}
            setNotesWithOctaves={setNotesWithOctaves}
         />
        <FreestyleNotes 
            note={note} 
            setNote={setNote} 
            instrument={instrument} 
            setInstrument={setInstrument} 
            colors={colors} 
            userNotes={userNotes} 
            colorsOn={colorsOn}
            setUserNotes={setUserNotes}
            userTimes ={userTimes}
            setUserTimes={setUserTimes}/>
        { instrument === "piano" ?
        <PianoKeys
            pressedKey={pressedKey}
            setPressedKey={setPressedKey}
            lowestNote={lowestNote}
            setLowestNote={setLowestNote}
            note={note}
            setNote={setNote}
            colorsOn={colorsOn}
            setColorsOn={setColorsOn}
            aKeyIndex={aKeyIndex}
            setaKeyIndex={setaKeyIndex}
            aKeyNote={aKeyNote}
            setaKeyNote={setaKeyNote}
            colors={colors}
            userNotes={userNotes}
            setUserNotes={setUserNotes}
            nameBoxActive={nameBoxActive}
            userTimes ={userTimes}
            setUserTimes={setUserTimes}
            notesWithOctaves={notesWithOctaves}
            setNotesWithOctaves={setNotesWithOctaves}
        />
        :
        <GuitarNeck
            pressedKey={pressedKey}
            setPressedKey={setPressedKey}
            lowestNote={lowestNote}
            setLowestNote={setLowestNote}
            note={note}
            setNote={setNote}
            colorsOn={colorsOn}
            setColorsOn={setColorsOn}
            aKeyIndex={aKeyIndex}
            setaKeyIndex={setaKeyIndex}
            aKeyNote={aKeyNote}
            setaKeyNote={setaKeyNote}
            colors={colors}
            userNotes={userNotes}
            setUserNotes={setUserNotes}
            nameBoxActive={nameBoxActive}
            userTimes ={userTimes}
            setUserTimes={setUserTimes}
            notesWithOctaves={notesWithOctaves}
            setNotesWithOctaves={setNotesWithOctaves}
        />
    }
      </div>
        
      
    );
  }
  
  export default FreestyleApp;
  