import "./Freestyle.css"
import { useEffect } from "react";

/**
 * Component responsible for displaying the user's freestyle notes.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} - JSX elements representing the freestyle notes.
 */
const FreestyleNotes = (props) => {

  /**
   * Change colors of notes when colors are toggled on/off
   * @function useEffectUponColorToggle
   * @param {boolean} props.colorsOn - colors on or off
   */
  useEffect(()=>{
    const noteDivs = Array.from(document.querySelectorAll(".note"));
    for (let i of noteDivs) {
      if (props.colorsOn) {
        i.style.color = "black"
      } else {
        i.style.color = i.textContent.charAt(i.textContent.length - 1) === "b" ? "white" : "black" // flat notes are white with black with white font
      }
    }
  }, [props.colorsOn]);

  return(
      <>
          <div id="freestyleUserNotesDiv">
              {
                  props.userNotes.map((degree, index) => (
                <div key={index} className="note" style={{backgroundColor: `rgb${props.colors[degree]}`}}>{degree}</div>
              ))
            }
          </div>
      </>
  )
}

export default FreestyleNotes