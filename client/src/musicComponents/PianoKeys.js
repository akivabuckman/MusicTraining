import { useState, useEffect } from "react";
import "./PianoKeys.css"


const PianoKeys = (props) => {
    const allNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    const degreeToFret = {1: 0, 2: 2, 3: 4, 4:5, 5:7, 6:9, 7:11, 8:12, 9: 14, 10: 16, 11:17, 12: 19, 13:21, 14: 23};
    // const [down, setDown] = useState(false)

    const [sharpTexts, setSharpTexts] = useState({
        "wKey": "",
        "eKey": "",
        "rKey": "",
        "tKey": "",
        "yKey": "",
        "uKey": "",
        "iKey": "",
        "oKey": "",
        "pKey": "",
        "[Key": "",
        "]Key": ""
    })
    const [flatTexts, setFlatTexts] = useState({
        "wKey": "",
        "eKey": "",
        "rKey": "",
        "tKey": "",
        "yKey": "",
        "uKey": "",
        "iKey": "",
        "oKey": "",
        "pKey": "",
        "[Key": "",
        "]Key": ""
    });
    const [naturalTexts, setNaturalTexts] = useState({
        "aKey": "",
        "sKey": "",
        "dKey": "",
        "fKey": "",
        "gKey": "",
        "hKey": "",
        "jKey": "",
        "kKey": "",
        "lKey": "",
        ";Key": "",
        "'Key": "",
    });

    const topKeys = {
        octave1: ["wKey", "eKey", "rKey", "tKey", "yKey", "uKey", "iKey"],
        octave2: ["oKey", "pKey", "[Key", "]Key"]};
    const bottomKeys = {
        octave1: ["aKey", "sKey", "dKey", "fKey", "gKey", "hKey", "jKey"],
        octave2: ["kKey", "lKey", ";Key", "'Key"] }
    const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"]
    const sharpNotes = ["C#", "D#", "", "F#", "G#", "A#", ""]
    const flatNotes = ["Db", "Eb", "", "Gb", "Ab", "Bb", ""]
    const notesSharp = {0:"C", 1: "C#", 2: "D", 3: "D#", 4: "E", 5: "F", 6: "F#", 7: "G", 8: "G#", 9: "A", 10: "A#", 11: "B"}

    useEffect(()=>{
        if (props.songKey) {
            props.setLowestNote(allNotes[(degreeToFret[props.lowestDegree] + allNotes.indexOf(props.songKey)) % 12]);
        }
    }, [props.songKey]);

    useEffect(()=>{
        displayNotes()
    }, [props.lowestNote]);

    const displayNotes = () => {
        const firstNaturalNote = naturalNotes.includes(props.lowestNote) ? props.lowestNote : allNotes[(allNotes.indexOf(props.lowestNote) - 1) % 12];
        const firstNaturalIndex = naturalNotes.indexOf(firstNaturalNote);
        setNaturalTexts(
            {
                "aKey": naturalNotes[(firstNaturalIndex + 0) % naturalNotes.length],
                "sKey": naturalNotes[(firstNaturalIndex + 1) % naturalNotes.length],
                "dKey": naturalNotes[(firstNaturalIndex + 2) % naturalNotes.length],
                "fKey": naturalNotes[(firstNaturalIndex + 3) % naturalNotes.length],
                "gKey": naturalNotes[(firstNaturalIndex + 4) % naturalNotes.length],
                "hKey": naturalNotes[(firstNaturalIndex + 5) % naturalNotes.length],
                "jKey": naturalNotes[(firstNaturalIndex + 6) % naturalNotes.length],
                "kKey": naturalNotes[(firstNaturalIndex + 7) % naturalNotes.length],
                "lKey": naturalNotes[(firstNaturalIndex + 8) % naturalNotes.length],
                ";Key": naturalNotes[(firstNaturalIndex + 9) % naturalNotes.length],
                "'Key": naturalNotes[(firstNaturalIndex + 10) % naturalNotes.length],
            }
        )
    }

    useEffect(()=>{
        if (naturalTexts["'Key"] !== "") {
            const firstNaturalNote = naturalNotes.includes(props.lowestNote) ? props.lowestNote : allNotes[(allNotes.indexOf(props.lowestNote) - 1) % 12];
            const firstNaturalIndex = naturalNotes.indexOf(firstNaturalNote);
            const firstSharpNote = sharpNotes[(firstNaturalIndex - 1) % 6];
            const firstFlatNote = flatNotes[(firstNaturalIndex - 1) % 6];
            const firstSharpNoteIndex = sharpNotes.indexOf(firstSharpNote);
            const firstFlatNoteIndex = flatNotes.indexOf(firstFlatNote);

            setSharpTexts(
                {
                    "wKey": sharpNotes[(firstSharpNoteIndex + 1) % sharpNotes.length],
                    "eKey": sharpNotes[(firstSharpNoteIndex + 2) % sharpNotes.length],
                    "rKey": sharpNotes[(firstSharpNoteIndex + 3) % sharpNotes.length],
                    "tKey": sharpNotes[(firstSharpNoteIndex + 4) % sharpNotes.length],
                    "yKey": sharpNotes[(firstSharpNoteIndex + 5) % sharpNotes.length],
                    "uKey": sharpNotes[(firstSharpNoteIndex + 6) % sharpNotes.length],
                    "iKey": sharpNotes[(firstSharpNoteIndex + 7) % sharpNotes.length],
                    "oKey": sharpNotes[(firstSharpNoteIndex + 8) % sharpNotes.length],
                    "pKey": sharpNotes[(firstSharpNoteIndex + 9) % sharpNotes.length],
                    "[Key": sharpNotes[(firstSharpNoteIndex + 10) % sharpNotes.length],
                    "]Key": sharpNotes[(firstSharpNoteIndex + 11) % sharpNotes.length],
                }
            )
        }
      
    }, [naturalTexts]);

    useEffect(()=>{
        const firstNaturalNote = naturalNotes.includes(props.lowestNote) ? props.lowestNote : allNotes[(allNotes.indexOf(props.lowestNote) - 1) % 12];
        const firstNaturalIndex = naturalNotes.indexOf(firstNaturalNote);
        const firstSharpNote = sharpNotes[(firstNaturalIndex - 1) % 6];
        const firstFlatNote = flatNotes[(firstNaturalIndex - 1) % 6];
        const firstSharpNoteIndex = sharpNotes.indexOf(firstSharpNote);
        const firstFlatNoteIndex = flatNotes.indexOf(firstFlatNote);

        setFlatTexts(
            {
                "wKey": flatNotes[(firstFlatNoteIndex + 1) % flatNotes.length],
                "eKey": flatNotes[(firstFlatNoteIndex + 2) % flatNotes.length],
                "rKey": flatNotes[(firstFlatNoteIndex + 3) % flatNotes.length],
                "tKey": flatNotes[(firstFlatNoteIndex + 4) % flatNotes.length],
                "yKey": flatNotes[(firstFlatNoteIndex + 5) % flatNotes.length],
                "uKey": flatNotes[(firstFlatNoteIndex + 6) % flatNotes.length],
                "iKey": flatNotes[(firstFlatNoteIndex + 7) % flatNotes.length],
                "oKey": flatNotes[(firstFlatNoteIndex + 8) % flatNotes.length],
                "pKey": flatNotes[(firstFlatNoteIndex + 9) % flatNotes.length],
                "[Key": flatNotes[(firstFlatNoteIndex + 10) %flatNotes.length],
                "]Key": flatNotes[(firstFlatNoteIndex + 11) %flatNotes.length],
            }
        )
    }, [sharpTexts]);

    useEffect(()=>{
         // make topkeys that are inactive's text disappear
        const topKeyDivs = Array.from(document.querySelectorAll('.topKey'))
                      .filter(element => element.tagName === 'DIV');
        if (!topKeyDivs.every(i=>i.getAttribute("note") === "")) {
            for (let i of topKeyDivs) {
                if (i.getAttribute("note") === "") {
                    // console.log(i.get)
                    i.setAttribute("style", "border:none; background-color:darkgrey")
                    i.querySelector(".sharpText").setAttribute("style","color: transparent;")
                    i.querySelector(".flatText").setAttribute("style","color: transparent;")
                    i.querySelector(".keyText").setAttribute("style","color: transparent")
                } else {
                    i.setAttribute("style", `border: 1px solid black; background-color: rgb${props.colors[i.getAttribute("note")]}`)
                    i.querySelector(".sharpText").setAttribute("style","color: black")
                    i.querySelector(".flatText").setAttribute("style","color: black;")
                    i.querySelector(".keyText").setAttribute("style","color: black")
                }
            }  
        }
    }, [flatTexts])

    // loads listener when component loads, unloads listener when component unloads
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyRelease)
        // cleanup this component
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
          window.removeEventListener('keyup', handleKeyRelease)
        };
    }, []);
    
    // event listener for key presses
    const handleKeyPress = (e) => {
        let key = e.key;
        props.setPressedKey(e.key.toLowerCase());
    };

    const handleKeyRelease = (e) => {
        props.setPressedKey("")
    };

    useEffect(()=>{ //when any key is pressed
        if (props.pressedKey !== "" && !props.nameBoxActive) {
            handleKeyPressChange();
        } else if (props.pressedKey === "") {
            props.setNote("")
        }
    }, [props.pressedKey]);

    const handleKeyPressChange = async () => { // shows note played in UI, plays note, and adds it to usernotes
        let newNote;
        if (["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"].includes(props.pressedKey)){
            newNote = (naturalTexts[`${props.pressedKey}Key`]); // A B C
        } else if (["w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"].includes(props.pressedKey)) {
            newNote = (flatTexts[`${props.pressedKey}Key`]); // Ab Bb Db etc.
        }
        
        if (newNote === "") {return}; // if user presses a key thats not an active piano key, like inactive black key
        // show played note on screen
        const allKeys = document.getElementsByClassName("pianoKey");

        for (let i of allKeys) {
            const keyP = i.getElementsByClassName("keyText")[0];

            if (keyP && keyP.textContent.charAt(1) === props.pressedKey.toUpperCase()) {
                i.style.height = "230px";
                i.style.width = "60px"
                setTimeout(() => {
                    i.style.height = "200px";
                    i.style.width = "50px"
                }, 500);
            }
        }

        // timing
        let octave;
        const a = new Date();
        const noteTime = a.getTime();
        if (["a", "s", "d", "f", "g", "h", "j"].includes(props.pressedKey)) {
            // console.log(props.pressedKey)
            const AKeyNaturalIndex = naturalNotes.includes(props.lowestNote) ? naturalNotes.indexOf(props.lowestNote) : naturalNotes.indexOf(allNotes[((allNotes.indexOf(props.lowestNote) + 11) % 12)]) ;
            const noteIndex = naturalNotes.indexOf(newNote);
            octave = noteIndex >= AKeyNaturalIndex ? 3 : 4;
            try {
                const sound = require(`./sounds/${newNote}${parseInt(octave)}.mp3`);
                const audio = new Audio(sound);
                audio.play();
            } catch(error) {console.log(error)};
            // add note to user's played notes
            props.setUserNotes([ ...props.userNotes, naturalTexts[`${props.pressedKey}Key`]]);
        }
        else if(["k", "l", ";", "'"].includes(props.pressedKey)) {
            const AKeyNaturalIndex = naturalNotes.indexOf(props.lowestNote);
            const noteIndex = naturalNotes.indexOf(newNote);
            octave = noteIndex >= AKeyNaturalIndex ? 4 : 5;
            try {
                const sound = require(`./sounds/${newNote}${parseInt(octave)}.mp3`);
                const audio = new Audio(sound);
                audio.play();
            } catch(error) {console.log(error)};
            // add note to user's played notes
            props.setUserNotes([ ...props.userNotes, naturalTexts[`${props.pressedKey}Key`]])
        }
        else if (["w", "e", "r", "t", "y", "u", "i"].includes(props.pressedKey)) {
            const noteIndex = allNotes.indexOf(newNote);
            octave = noteIndex >= allNotes.indexOf(props.lowestNote) ? 3 : 4;
            try {
                const sound = require(`./sounds/${newNote}${parseInt(octave)}.mp3`);
                const audio = new Audio(sound);
                audio.play();
            } catch(error) {};
            // add note to user's played notes
            props.setUserNotes([...props.userNotes, flatTexts[`${props.pressedKey}Key`]])
        }
        else if (["o", "p", "[", "]"].includes(props.pressedKey)) {
            const noteIndex = allNotes.indexOf(newNote);
            octave = noteIndex >= allNotes.indexOf(props.lowestNote) ? 4 : 5;
            try {
                const sound = require(`./sounds/${newNote}${parseInt(octave)}.mp3`);
                const audio = new Audio(sound);
                audio.play();
            } catch(error) {};
            // add note to user's played notes
            props.setUserNotes([...props.userNotes, flatTexts[`${props.pressedKey}Key`]])
        }
        
        props.setNote(newNote);
        if (props.setUserTimes) {props.setUserTimes([...props.userTimes, noteTime])};
        if (props.setNotesWithOctaves) {props.setNotesWithOctaves([...props.notesWithOctaves, `${newNote}${octave}`])}
    }

    useEffect(()=>{ // display notes upon first mount
        props.setaKeyNote(notesSharp[props.aKeyIndex]);
        displayNotes();
    }, []);

    
// color toggle button
    function toggle() {
        let toggle = document.querySelector('.toggle')
        props.setColorsOn(i=> !i);

        // colorsOff
        if (props.colorsOn) {
            toggle.classList.remove('active')
            const topKeyDivs = Array.from(document.querySelectorAll('.topKey'))
                .filter(element => element.tagName === 'DIV');
            for (let i of topKeyDivs) {
                if (i.getAttribute("note") !== "") {
                    i.querySelector(".keyText").setAttribute("style","color: white;")
                    i.querySelector(".sharpText").setAttribute("style","color: white;")
                    i.querySelector(".flatText").setAttribute("style","color: white;")
                    i.setAttribute("style", "border: 1px solid white")
                }
                
            }
            const bottomKeyDivs = Array.from(document.querySelectorAll('.bottomKey'))
                .filter(element => element.tagName === 'DIV');
            for (let i of bottomKeyDivs) {
                i.setAttribute("style", "border: 1px solid black")
            }
        } else {
            // colors ON
            toggle.classList.add('active');
            const topKeyDivs = Array.from(document.querySelectorAll('.topKey'))
                .filter(element => element.tagName === 'DIV');
            for (let i of topKeyDivs) {
                i.querySelector(".sharpText").setAttribute("style","color: black;")
                i.querySelector(".flatText").setAttribute("style","color: black;")
                i.querySelector(".keyText").setAttribute("style",`color: ${i.getAttribute("note") === "" ? "transparent" : "black"}`)
                i.setAttribute("style", `border: ${i.getAttribute("note") === "" ? "none" : "1px solid black"}`);
            }
            const bottomKeyDivs = Array.from(document.querySelectorAll('.bottomKey'))
                .filter(element => element.tagName === 'DIV');
            for (let i of bottomKeyDivs) {
                i.setAttribute("style", "border: 1px solid black")
            }
        }        
    }


    return(
        <>
        <div id="pianoKeysDiv">
            <div className="container">
                <p className="text">Colors</p>
                <div className="toggle active" onClick={toggle}>
                    <div className="circle"></div>
                </div> 
            </div>
            <div className="pianoRow" id="topRow">
                <div id="topbuffer" className="pianoKey"></div>
                {
                    topKeys.octave1.map((topKey, index)=>{
                        return(
                            <div key={index} note={flatTexts[topKey]}  className={`topKey pianoKey ${sharpTexts[topKey]}`} typedkey={topKey} set={1}style={{backgroundColor: `rgb${props.colors[flatTexts[topKey]]}`}}>
                                <p note={flatTexts[topKey]}  set={1} className="sharpText topKey">{sharpTexts[topKey]}</p>
                                <br note={flatTexts[topKey]}  set={1} className="topKey" />
                                <p note={flatTexts[topKey]}  set={1} className="flatText topKey">{flatTexts[topKey]}</p>
                                <br note={flatTexts[topKey]}  set={1} className="topKey" />
                                <p note ={flatTexts[topKey]}  set={1} className="topKey keyText">({topKey.slice(0,1).toUpperCase()})</p>
                            </div>
                        )
                    })
                }
                {
                    topKeys.octave2.map((topKey, index)=>{
                        return(
                            <div key={index} note={flatTexts[topKey]}  className={`topKey pianoKey ${sharpTexts[topKey]}`} typedkey={topKey} set={2} style={{backgroundColor: `rgb${props.colors[flatTexts[topKey]]}`}}>
                                <p note={flatTexts[topKey]}  set={2} className="sharpText topKey">{sharpTexts[topKey]}</p>
                                <br note={flatTexts[topKey]}  set={2}  className="topKey" />
                                <p note={flatTexts[topKey]}  set={2}  className="flatText topKey">{flatTexts[topKey]}</p>
                                <br note={flatTexts[topKey]}  set={2}  className="topKey" />
                                <p note ={flatTexts[topKey]}  set={2}  className="topKey keyText">({topKey.slice(0,1).toUpperCase()})</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="pianoRow" id="bottomRow">
                <div id="buffer"></div>
                {
                    bottomKeys.octave1.map((bottomKey, index)=>{
                        return(
                            <div key={index} note={naturalTexts[bottomKey]}  set={1} className={`bottomKey pianoKey ${naturalTexts[bottomKey]}`} typedkey={bottomKey} style={{backgroundColor: `rgb${props.colors[naturalTexts[bottomKey]]}`}}>
                                <p note={naturalTexts[bottomKey]}  set={1} className="bottomKey sharpText">{naturalTexts[bottomKey]}</p>
                                <br note={naturalTexts[bottomKey]}   set={1} className="bottomKey"/>
                                <p note ={naturalTexts[bottomKey]}  set={1} className="bottomKey keyText">({bottomKey.slice(0,1).toUpperCase()})</p>
                            </div>
                        )
                    })
                }
                {
                    bottomKeys.octave2.map((bottomKey, index)=>{
                        return(
                            <div key={index} note={naturalTexts[bottomKey]}  set={2} className={`bottomKey pianoKey ${naturalTexts[bottomKey]}`} typedkey={bottomKey} style={{backgroundColor: `rgb${props.colors[naturalTexts[bottomKey]]}`}}>
                                <p note={naturalTexts[bottomKey]}  set={2} className="bottomKey sharpText">{naturalTexts[bottomKey]}</p>
                                <br note={naturalTexts[bottomKey]}  set={2} className="bottomKey" />
                                <p note ={naturalTexts[bottomKey]}  set={2} className="bottomKey keyText">({bottomKey.slice(0,1).toUpperCase()})</p>
                            </div>
                        )
                    })
                }
            </div>            
        </div>
        </>
    )
};

export default PianoKeys