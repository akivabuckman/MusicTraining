import "./Freestyle.css"
import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

const FreestyleNotes = (props) => {

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