import { useState, useEffect, useContext } from "react";
import "./GuitarNeck.css"

const GuitarNeck = (props) => {
    const handleKeyPress = (e) => {
        if (e.key) {
            props.setPressedKey(e.key.toLowerCase());

        }
    };

    const handleKeyRelease = (e) => {
        props.setPressedKey("")
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyRelease)
        // cleanup this component
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
          window.removeEventListener('keyup', handleKeyRelease)
        };
    }, []);

    useEffect(()=>{ //when any key is pressed
        if (props.pressedKey !== "" && !props.nameBoxActive) {
            handleKeyPressChange();
        } else if (props.pressedKey === "") {
            props.setNote("")
        }
    }, [props.pressedKey]);


    const handleKeyPressChange = async () => { // shows note played in UI, plays note, and adds it to usernotes
        let newNote;
        let octave;
        if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"].includes(props.pressedKey)) {
            return
        };
        const a = new Date();
        const noteTime = a.getTime();
        
        const allFrets = document.querySelectorAll(".fretText");
        for (let i of allFrets) {
            if (i.querySelector('p:nth-of-type(2)').textContent.charAt(1).toLowerCase() === props.pressedKey) {
                newNote = i.getElementsByTagName("p")[0].textContent;
                octave = i.getAttribute("octave");
                i.style.height = "100px";
                i.style.width = "70px"
                setTimeout(() => {
                    i.style.height = "60px";
                    i.style.width = "50px"
                }, 500);
            }
        }

        try {
            const sound = require(`./guitarSounds/${newNote}${parseInt(octave)}.mp3`);
            const audio = new Audio(sound);
            audio.play();
        } catch(error) {console.log(error)};
        // add note to user's played notes
        props.setUserNotes([ ...props.userNotes, newNote]);
        props.setNote(newNote);
        if (props.setUserTimes) {props.setUserTimes([...props.userTimes, noteTime])};
        if (props.setNotesWithOctaves) {props.setNotesWithOctaves([...props.notesWithOctaves, `${newNote}${octave}`])}
    }
    
    function toggle() {
        let toggle = document.querySelector('.toggle')
        props.setColorsOn(i=> !i);

        // colorsOff
        if (props.colorsOn) {
            toggle.classList.remove('active')
            const flatDivs = Array.from(document.querySelectorAll('.flat'));
            for (let i of flatDivs) {
                i.querySelectorAll("p")[0].setAttribute("style","color: white;")
                i.querySelectorAll("p")[1].setAttribute("style","color: white;")
                i.setAttribute("style", "border: 1px solid white")
            }
            const naturalDivs = Array.from(document.querySelectorAll('div.text:not(.flat)'))
            for (let i of naturalDivs) {
                i.setAttribute("style", "border: 1px solid black")
            }
        } else {
            // colors ON
            toggle.classList.add('active');
            const flatDivs = Array.from(document.querySelectorAll('.flat'));
            for (let i of flatDivs) {
                i.querySelectorAll("p")[0].setAttribute("style","color: black;")
                i.querySelectorAll("p")[1].setAttribute("style","color: black;")
                i.setAttribute("style", "border: 1px solid black");
            }
            const naturalDivs = Array.from(document.querySelectorAll('div.text:not(.flat)'))
            for (let i of naturalDivs) {
                i.setAttribute("style", "border: 1px solid black")
            }
        }        
    }

    return(

        <div id="guitarNeckDiv">
            <div className="container">
                <p className="text">Colors: </p>
                <div className="toggle active" onClick={toggle}>
                    <div className="circle"></div>
                </div>
            </div>
            <div id="neck">
            <div className="string">
                <div className="fret open">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["E"]}`}}>
                        <p>E</p>
                        <p>(1)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["F"]}`}}>
                        <p>F</p>
                        <p>(2)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="4" style={{backgroundColor: `rgb${props.colors["Gb"]}`}}>
                        <p>Gb</p>
                        <p>(33)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["G"]}`}}>
                        <p>G</p>
                        <p>(4)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="4" style={{backgroundColor: `rgb${props.colors["Ab"]}`}}>
                        <p>Ab</p>
                        <p>(5)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["A"]}`}}>
                        <p>A</p>
                        <p>(6)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="4" style={{backgroundColor: `rgb${props.colors["Bb"]}`}}>
                        <p>Bb</p>
                        <p>(7)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["B"]}`}}>
                        <p>B</p>
                        <p>(8)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="5" style={{backgroundColor: `rgb${props.colors["C"]}`}}>
                        <p>C</p>
                        <p>(9)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="5" style={{backgroundColor: `rgb${props.colors["Db"]}`}}>
                        <p>Db</p>
                        <p>(0)</p>    
                    </div>
                </div>

            </div>
            <div className="string">
                <div className="fret open">
                    <div className="fretText" octave="3" style={{backgroundColor: `rgb${props.colors["B"]}`}}>
                        <p>B</p>
                        <p>(Q)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["C"]}`}}>
                        <p>C</p>
                        <p>(W)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="4" style={{backgroundColor: `rgb${props.colors["Db"]}`}}>
                        <p>Db</p>
                        <p>(E)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["D"]}`}}>
                        <p>D</p>
                        <p>(R)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="4" style={{backgroundColor: `rgb${props.colors["Eb"]}`}}>
                        <p>Eb</p>
                        <p>(T)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["E"]}`}}>
                        <p>E</p>
                        <p>(Y)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["F"]}`}}>
                        <p>F</p>
                        <p>(U)</p>    
                    </div>
                </div>
                <div className="fret">
                <div className="circleDiv"></div>
                    <div className="fretText flat" octave="4" style={{backgroundColor: `rgb${props.colors["Gb"]}`}}>
                        <p>Gb</p>
                        <p>(I)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["G"]}`}}>
                        <p>G</p>
                        <p>(O)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="4" style={{backgroundColor: `rgb${props.colors["Ab"]}`}}>
                        <p>Ab</p>
                        <p>(P)</p>    
                    </div>
                </div>

            </div>
            <div className="string">
                <div className="fret open">
                    <div className="fretText" octave="3" style={{backgroundColor: `rgb${props.colors["G"]}`}}>
                        <p>G</p>
                        <p>(A)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="3" style={{backgroundColor: `rgb${props.colors["Ab"]}`}}>
                        <p>Ab</p>
                        <p>(S)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="3" style={{backgroundColor: `rgb${props.colors["A"]}`}}>
                        <p>A</p>
                        <p>(D)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="circleDiv"></div>
                    <div className="fretText flat" octave="3" style={{backgroundColor: `rgb${props.colors["Bb"]}`}}>
                        <p>Bb</p>
                        <p>(F)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="3" style={{backgroundColor: `rgb${props.colors["B"]}`}}>
                        <p>B</p>
                        <p>(G)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="circleDiv"></div>
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["C"]}`}}>
                        <p>C</p>
                        <p>(H)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="4" style={{backgroundColor: `rgb${props.colors["Db"]}`}}>
                        <p>Db</p>
                        <p>(J)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["D"]}`}}>
                        <p>D</p>
                        <p>(K)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="4" style={{backgroundColor: `rgb${props.colors["Eb"]}`}}>
                        <p>Eb</p>
                        <p>(L)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="4" style={{backgroundColor: `rgb${props.colors["E"]}`}}>
                        <p>E</p>
                        <p>(;)</p>    
                    </div>
                </div>
            </div>
           
            <div className="string">
                <div className="fret open">
                    <div className="fretText" octave="3" style={{backgroundColor: `rgb${props.colors["D"]}`}}>
                        <p>D</p>
                        <p>(Z)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="3" style={{backgroundColor: `rgb${props.colors["Eb"]}`}}>
                        <p>Eb</p>
                        <p>(X)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="3" style={{backgroundColor: `rgb${props.colors["E"]}`}}>
                        <p>E</p>
                        <p>(C)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="3" style={{backgroundColor: `rgb${props.colors["F"]}`}}>
                        <p>F</p>
                        <p>(V)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="3" style={{backgroundColor: `rgb${props.colors["Gb"]}`}}>
                        <p>Gb</p>
                        <p>(B)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="3" style={{backgroundColor: `rgb${props.colors["G"]}`}}>
                        <p>G</p>
                        <p>(N)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="3" style={{backgroundColor: `rgb${props.colors["Ab"]}`}}>
                        <p>Ab</p>
                        <p>(M)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="circleDiv"></div>
                    <div className="fretText" octave="3" style={{backgroundColor: `rgb${props.colors["A"]}`}}>
                        <p>A</p>
                        <p>(,)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText flat" octave="3" style={{backgroundColor: `rgb${props.colors["Bb"]}`}}>
                        <p>Bb</p>
                        <p>(.)</p>    
                    </div>
                </div>
                <div className="fret">
                    <div className="fretText" octave="3" style={{backgroundColor: `rgb${props.colors["B"]}`}}>
                        <p>B</p>
                        <p>(/)</p>    
                    </div>
                </div>
            </div>
            
            
            
        </div>
        <div id="fretNumDiv">
            <div className="fretNum open">0</div>
            <div className="fretNum">1</div>
            <div className="fretNum">2</div>
            <div className="fretNum">3</div>
            <div className="fretNum">4</div>
            <div className="fretNum">5</div>
            <div className="fretNum">6</div>
            <div className="fretNum">7</div>
            <div className="fretNum">8</div>
            <div className="fretNum">9</div>
        </div>
        </div>
    )
};

export default GuitarNeck