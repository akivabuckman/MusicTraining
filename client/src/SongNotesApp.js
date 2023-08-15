import "./musicComponents/SongNotes/SongNotes.css"
import GuitarNeck from './musicComponents/instruments/GuitarNeck';
import SongNotes from './musicComponents/SongNotes/SongNotes';
import { useState, useEffect, useContext } from "react";
import melodies from "./melodies";
import SongNotesInfoPane from './musicComponents/SongNotes/SongNotesInfoPane';
import PianoKeys from './musicComponents/instruments/PianoKeys';
import "./StatsApp.css"



function SongNotesApp(props) {
  const allNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  const degreeToFret = {1: 0, 2: 2, 3: 4, 4:5, 5:7, 6:9, 7:11, 8:12, 9: 14, 10: 16, 11:17, 12: 19, 13:21, 14: 23};
  const [songKey, setSongKey] = useState("C");
  const [userNotes, setUserNotes] = useState([]);
  const [chosenSong, setChosenSong] = useState("Happy Birthday");
  const [currentDegreeIndex, setCurrentDegreeIndex] = useState(0);
  const [correctDegree, setCorrectDegree] = useState(melodies[chosenSong][currentDegreeIndex]);
  const [correctNote, setCorrectNote] = useState(allNotes[(degreeToFret[correctDegree] + allNotes.indexOf(songKey)) % 12]);
  const [correctCount, setCorrectCount] = useState(0);
  const [instrument, setInstrument] = useState("piano");
  const [generatedNotes, setGeneratedNotes] = useState([]);
  const [aKeyNote, setaKeyNote] = useState("");
  const [aKeyIndex, setaKeyIndex] = useState(0);
  const [colorsOn, setColorsOn] = useState(true);
  const [note, setNote] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const [lowestDegree, setLowestDegree] = useState(Math.min(...melodies[chosenSong]));
  const [lowestNote, setLowestNote] = useState(allNotes[(degreeToFret[lowestDegree] + allNotes.indexOf(props.songKey)) % 12]);
  const [pressedKey, setPressedKey] = useState("");



  useEffect(()=>{
    setCurrentDegreeIndex(0)
    setLowestDegree(Math.min(...melodies[chosenSong]))
  }, [chosenSong]);

  const reset = () => {
    const noteDivs = document.querySelectorAll(".note");
    noteDivs.forEach(i=>i.classList.remove("currentNote"));
    noteDivs.forEach(i=>i.classList.remove("correct"));
    noteDivs.forEach(i=>i.classList.remove("incorrect"));
    document.querySelector(".note").classList.add("currentNote")
    setCurrentDegreeIndex(0);
    setCorrectCount(0);
    setTryCount(0);
    setUserNotes([]);
    setCorrectDegree(melodies[chosenSong][0])
    setCorrectNote(allNotes[(degreeToFret[correctDegree] + allNotes.indexOf(songKey)) % 12])
  }
  
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

  const log = () => {
    console.log(instrument)
  }

  return (
    <div className="songNotesApp">
      <SongNotesInfoPane 
        chosenSong={chosenSong}
        setChosenSong={setChosenSong}
        melodies={melodies}
        reset={reset} 
        instrument={instrument}
         setInstrument={setInstrument} 
         songKey={songKey} 
         setSongKey={setSongKey} 
         colors={colors} 
         currentDegreeIndex={currentDegreeIndex} 
         setCorrectCount={setCorrectCount} 
         correctCount={correctCount} 
         melodyDegrees={melodies[chosenSong]}
        />
      <SongNotes
        pressedKey={pressedKey}
        setPressedKey={setPressedKey}
        reset={reset} 
        chosenSong={chosenSong} 
        tryCount={tryCount} 
        setTryCount={setTryCount} 
        setCorrectCount={setCorrectCount} 
        correctCount={correctCount} 
        correctDegree={correctDegree} 
        setCorrectDegree={setCorrectDegree} 
        setCurrentDegreeIndex={setCurrentDegreeIndex} 
        correctNote={correctNote} 
        setCorrectNote={setCorrectNote} 
        note={note} 
        setNote={setNote} 
        currentDegreeIndex={currentDegreeIndex} 
        instrument={instrument} 
        setInstrument={setInstrument} 
        songKey={songKey} 
        colors={colors} 
        melodyDegrees={melodies[chosenSong]} 
        userNotes={userNotes} setUserNotes={setUserNotes}
        colorsOn={colorsOn}
      />
      { instrument === "piano" ? 
      <PianoKeys 
        pressedKey={pressedKey}
        setPressedKey={setPressedKey}
        lowestDegree={lowestDegree} 
        setLowestDegree={setLowestDegree} 
        lowestNote={lowestNote} 
        setLowestNote={setLowestNote} 
        correctNote={correctNote} 
        setCorrectNote={setCorrectNote} 
        note={note} 
        setNote={setNote} 
        colorsOn={colorsOn} 
        setColorsOn={setColorsOn} 
        aKeyIndex={aKeyIndex} 
        setaKeyIndex={setaKeyIndex} 
        aKeyNote={aKeyNote} 
        setaKeyNote={setaKeyNote} 
        setCorrectCount={setCorrectCount} 
        correctCount={correctCount} 
        colors={colors}
        userNotes={userNotes} 
        setUserNotes={setUserNotes} 
        melodyDegrees={melodies[chosenSong]} 
        songKey={songKey}
      />
      :
            <GuitarNeck 
        pressedKey={pressedKey}
        setPressedKey={setPressedKey}
        lowestDegree={lowestDegree} 
        setLowestDegree={setLowestDegree} 
        lowestNote={lowestNote} 
        setLowestNote={setLowestNote} 
        correctNote={correctNote} 
        setCorrectNote={setCorrectNote} 
        note={note} 
        setNote={setNote} 
        colorsOn={colorsOn} 
        setColorsOn={setColorsOn} 
        aKeyIndex={aKeyIndex} 
        setaKeyIndex={setaKeyIndex} 
        aKeyNote={aKeyNote} 
        setaKeyNote={setaKeyNote} 
        setCorrectCount={setCorrectCount} 
        correctCount={correctCount} 
        colors={colors}
        userNotes={userNotes} 
        setUserNotes={setUserNotes} 
        melodyDegrees={melodies[chosenSong]} 
        songKey={songKey}
      />
      }

    </div>
  );
}

export default SongNotesApp;
