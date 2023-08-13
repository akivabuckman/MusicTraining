import React, { useState, useEffect } from 'react';

const RandomNotes = (props) => {
    const [firstNote, setFirstNote] = useState("")
    let noteCount = 3
    const handleKeyChange = (event) => {
        props.setSongKey(event.target.value)
    };

    const handleNoteCountChange = (event) => {
        noteCount = parseInt(event.target.value);
    };


    const playNotes = () => {
        const allNotesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
        // const allNotesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const degreeToFret = {1: 0, 2: 2, 3: 4, 4:5, 5:7, 6:9, 7:11, 8:12, 9: 14, 10: 16, 11:17, 12: 19, 13:21, 14: 23};
        // const sharpOrFlat = {
        //     "C":"sharp",
        //     "Db":"flat",
        //     "D":"sharp",
        //     "Eb":"flat",
        //     "E":"sharp",
        //     "F":"flat",
        //     "Gb":"flat",
        //     "G":"sharp",
        //     "Ab":"flat",
        //     "A":"sharp",
        //     "Bb":"flat",
        //     "B":"sharp"
        // }
        // get notes in current key
        // if (sharpOrFlat[props.songKey] === "sharp") {
        //     const rootIndex = allNotesSharp.indexOf(props.songKey);
        //     currentKeyNotes = [
        //         allNotesSharp[(rootIndex + 0) % 12],
        //         allNotesSharp[(rootIndex + 2) % 12],
        //         allNotesSharp[(rootIndex + 4) % 12],
        //         allNotesSharp[(rootIndex + 5) % 12],
        //         allNotesSharp[(rootIndex + 7) % 12],
        //         allNotesSharp[(rootIndex + 9) % 12],
        //         allNotesSharp[(rootIndex + 11) % 12],
        //     ]
        //     console.log(currentKeyNotes)
        // } else if (sharpOrFlat[props.songKey] === "flat") {
        const rootIndex = allNotesFlat.indexOf(props.songKey);
        const currentKeyNotes = [
            allNotesFlat[(rootIndex + 0) % 12],
            allNotesFlat[(rootIndex + 2) % 12],
            allNotesFlat[(rootIndex + 4) % 12],
            allNotesFlat[(rootIndex + 5) % 12],
            allNotesFlat[(rootIndex + 7) % 12],
            allNotesFlat[(rootIndex + 9) % 12],
            allNotesFlat[(rootIndex + 11) % 12],
        ]
        
        // for (let i = 0; i <= noteCount; i++) {
        //     const octave = Math.floor(Math.random()*3) + 3 // 3 4 or 5
        //     const note = currentKeyNotes[Math.floor(Math.random()*7)]
        //     const sound = require(`./sounds/${note}${parseInt(octave)}.mp3`);
        //     const audio = new Audio(sound);
        //     audio.play();
        //     console.log(`${note}${octave}`)
        //     setTimeout(()=>{}, 1000);
        // }
        function playNotesWithDelay(notesRemaining, currentKeyNotes) {
            if (notesRemaining === 0) {
              return;
            }

            const octave = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
            const note = currentKeyNotes[Math.floor(Math.random() * 7)];
            const sound = require(`./sounds/${note}${octave}.mp3`);
            const audio = new Audio(sound);
            audio.play();
            props.setGeneratedNotes([`${note}${octave}`])
            console.log(props.GeneratedNotes);

            // show user first note
            if (notesRemaining === noteCount) {
                setFirstNote(`${note}`);
            }

            setTimeout(() => {
              playNotesWithDelay(notesRemaining - 1, currentKeyNotes);
            }, 1000);
        }
        playNotesWithDelay(noteCount, currentKeyNotes);
    }

    return (
        <div id="randomNotesDiv">
            <p>Note Count:
                <select id="noteCountSelect" value={3} onChange={handleNoteCountChange}>
                    <option key="2" value="2">2</option>
                    <option key="3" value="3">3</option>
                    <option key="4" value="4">4</option>
                    <option key="5" value="5">5</option>
                </select>
            </p>
            <button onClick={playNotes}>Play Notes</button>
            <p>First Note: {firstNote}</p>
        </div>
    );
};

export default RandomNotes;
