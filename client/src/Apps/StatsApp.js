import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import jwt_token from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';


/**
 * Represents a component that displays statistics and learning progress for a user's songs.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @param {Array<Object>} props.setLowestNote - Function to set the lowest note.
 * @param {Array<Object>} props.setInstrument - Function to set the instrument.
 * @param {string} props.instrument - The selected instrument.
 * @param {string} props.lowestNote - The lowest note.
 * @param {Array<Object>} props.reset - Function to reset.
 * @param {Array<Object>} props.userNotes - Array of user notes.
 * @param {Array<Object>} props.userTimes - Array of timestamps of each played note.
 * @param {Array<Object>} props.notesWithOctaves - Array of notes with octaves.
 * @param {Array<Object>} props.setNameBoxActive - Function to set name box active.
 * @returns {JSX.Element} - JSX elements representing song info.
 */
const StatsApp = (props) => {
    const [userSongs, setUserSongs] = useState([]);
    const [songNotesData, setSongNotesData] = useState([]);
    const [guitarData, setGuitarData] = useState([])
    const [pianoData, setPianoData] = useState([])
    const [overallScore, setOverallScore] = useState(0);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const { token } = useContext(AppContext);
    const [guitarOverallScore, setGuitarOverallScore] = useState(0);
    const [guitarMaxSongState, setGuitarMaxSongState] =useState({});
    const [guitarAvgKeyState, setGuitarAvgKeyState] = useState({})
    const [guitarSortedKeys, setGuitarSortedKeys] = useState([]);
    const [guitarMaxScores, setGuitarMaxScores] = useState({});
    const [pianoOverallScore, setPianoOverallScore] = useState(0);
    const [pianoMaxSongState, setPianoMaxSongState] =useState({});
    const [pianoAvgKeyState, setPianoAvgKeyState] = useState({})
    const [pianoSortedKeys, setPianoSortedKeys] = useState([]);
    const [pianoMaxScores, setPianoMaxScores] = useState({});
    const navigate = useNavigate();

    /**
     * Fetches song data from the server of current user.
     *
     * @async
     * @function fetchUserSongs
     * @fires setUserSongs
     */
    const fetchUserSongs = async () => {
        try {
            const response = await fetch(`/music/userSongs/${userId}`);
            const data = await response.json();
            setUserSongs(data);
        } catch (error) {
            console.log(error);
        }
    }

     /**
     * Fetches song notes data from the server.
     *
     * @async
     * @function fetchSongNotes
     * @fires setSongNotesData
     */
    const fetchSongNotes = async () => {
        try {
            const response = await fetch(`/music/songNotes/${userId}`);
            const data = await response.json();
            setSongNotesData(data)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Performs calculations for statistics of user's guitar song notes sessions
     *
     * @function guitarMath
     * @param {object} songNotesData - data of user's song notes sessions
     * @fires setOverallScore
     * @param {object} guitarData - data of user's guitar song notes sessions
     * @fires setGuitarOverallScore
     * @fires setGuitarAvgKeyState
     * @fires setGuitarMaxSongState
     */
    const guitarMath = () => {
      // overall score
        const scores = songNotesData.map(item => item.score === null ? 0 : parseFloat(item.score));
        const sum = scores.reduce((total, score) => total + score, 0);
        const average = sum / songNotesData.length;
        setOverallScore(average*100);

        // guitar scores
        const guitarScores = guitarData.map(item => item.score === null ? 0 : parseInt(item.score, 10));
        const guitarSum = guitarScores.reduce((total, score) => total + score, 0);
        const guitarAverage = guitarSum / guitarData.length;
        setGuitarOverallScore(guitarAverage*100);
        
        // Create an object to store scores and counts for each key
        const guitarKeyScores = {};
        
        guitarData.forEach(item => {
            const key = item.key;
            const score = item.score;

            if (key !== null) {
                if (!guitarKeyScores[key]) {
                    guitarKeyScores[key] = { totalScore: 0, totalCount: 0 };
                }
            
                if (score !== null) {
                    guitarKeyScores[key].totalScore += parseFloat(score);
                    guitarKeyScores[key].totalCount += 1;
                }
            }
        });

        // Calculate the average score for each key
        const guitarAverageKeyScores = {};
        Object.keys(guitarKeyScores).forEach(key => {
            const { totalScore, totalCount } = guitarKeyScores[key];
            guitarAverageKeyScores[key] = totalCount > 0 ? Math.round(100*(totalScore / totalCount)) : 0;
        });
        setGuitarAvgKeyState(guitarAverageKeyScores)

        // for each song
        const guitarSongMaxScores = {};

        guitarData.forEach(item => {
            const song = item.song;
            const score = item.score;

            if (song !== null && score !== null) {
                if (!guitarSongMaxScores[song] || score * 100 > guitarSongMaxScores[song]) {
                    guitarSongMaxScores[song] = Math.round(parseFloat(score) * 100);
                }
            }
        });
        setGuitarMaxSongState(guitarSongMaxScores)
    }    
    
        /**
     * Performs calculations for statistics of user's guitar song notes sessions
     *
     * @function pianoMath
     * @param {object} songNotesData - data of user's song notes sessions
     * @fires setOverallScore
     * @param {object} pianoData - data of user's piano song notes sessions
     * @fires setPianoOverallScore
     * @fires setPianoAvgKeyState
     * @fires setPianoMaxSongState
     */
    const pianoMath = () => {
        const pianoData = songNotesData.filter(item => item.instrument === "piano");
        const pianoScores = pianoData.map(item => item.score === null ? 0 : parseInt(item.score, 10));
        const pianoSum = pianoScores.reduce((total, score) => total + score, 0);
        const pianoAverage = pianoSum / guitarData.length;
        setGuitarOverallScore(pianoAverage*100);
        
        // Create an object to store scores and counts for each key
        const pianoKeyScores = {};
        
        pianoData.forEach(item => {
            const key = item.key;
            const score = item.score;

            if (key !== null) {
                if (!pianoKeyScores[key]) {
                    pianoKeyScores[key] = { totalScore: 0, totalCount: 0 };
                }
            
                if (score !== null) {
                    pianoKeyScores[key].totalScore += parseFloat(score);
                    pianoKeyScores[key].totalCount += 1;
                }
            }
        });

        // Calculate the average score for each key
        const pianoAverageKeyScores = {};
        Object.keys(pianoKeyScores).forEach(key => {
            const { totalScore, totalCount } = pianoKeyScores[key];
            pianoAverageKeyScores[key] = totalCount > 0 ? Math.round(100*(totalScore / totalCount)) : 0;
        });
        setPianoAvgKeyState(pianoAverageKeyScores)

        // for each song
        const pianoSongMaxScores = {};

        pianoData.forEach(item => {
            const song = item.song;
            const score = item.score;

            if (song !== null && score !== null) {
                if (!pianoSongMaxScores[song] || score * 100 > pianoSongMaxScores[song]) {
                    pianoSongMaxScores[song] = Math.round(parseFloat(score) * 100);
                }
            }
        });
        setPianoMaxSongState(pianoSongMaxScores)
    }
  
    /**
     * sorts keys by score, for piano song notes sessions
     * @function useEffectUponPianoAvgUpdate
     * @fires setPianoSortedKeys
     * @param {object} pianoAvgKeyState - array of each key's average score of current user
     */
    useEffect(()=>{
        setPianoSortedKeys(Object.keys(pianoAvgKeyState).sort((a, b) => pianoAvgKeyState[b] - pianoAvgKeyState[a]))
    }, [pianoAvgKeyState]);

    /**
     * sorts keys by score, for guitar song notes sessions
     * @function useEffectUponGuitarAvgUpdate
     * @fires setGuitarSortedKeys
     * @param {object} guitarAvgKeyState - array of each key's average score of current user
     */
    useEffect(()=>{
        setGuitarSortedKeys(Object.keys(guitarAvgKeyState).sort((a, b) => guitarAvgKeyState[b] - guitarAvgKeyState[a]))
    }, [guitarAvgKeyState]);

    /**
     * calls guitarMath function upon guitarData update
     * @function useEffectUponGuitarDataUpdate
     * @fires guitarMath
     * @param {object} guitarData - data of user's guitar song notes sessions
     */
    useEffect(()=>{
        guitarMath();
    }, [guitarData]);

    /**
     * calls pianoMath function upon pianoData update
     * @function useEffectUponPianoDataUpdate
     * @fires pianoMath
     * @param {object} pianoData - data of user's piano song notes sessions
     */
    useEffect(()=>{
        pianoMath();
    }, [pianoData]);

    /**
     * sets guitar and piano data from songNotesData
     * @function useEffectUponSongNotesDataUpdate
     * @fires setGuitarData
     * @fires setPianoData
     * @param {object} songNotesData - data of all of user's song notes sessions
     */
    useEffect(()=>{
        setGuitarData(songNotesData.filter(item => item.instrument === "guitar"));
        setPianoData(songNotesData.filter(item => item.instrument === "piano"));
    }, [songNotesData])

    /**
     * sets username and userId upon token update
     * @function useEffectUponTokenUpdate
     * @param {string} token - secret generated token
     * @fires setUsername
     * @fires setUserId
     */
    useEffect(() => {
        if (token) {
            const payload = jwt_token(token);
            setUsername(payload.username);
            setUserId(payload.userid);
          } else {
            navigate("../login");
          }
    }, [token]);
    
    /**
     * sets triggers fetches of user songs and songnotes upon userId update
     * @function useEffectUponUserIdUpdate
     * @param {number} userId - user ID#
     * @fires fetchUserSongs
     * @fires fetchSongNotes
     */
    useEffect(()=>{
        if (userId !== "") {
            fetchUserSongs();
            fetchSongNotes();
        }
    }, [userId])

    return (
        <>
          <h2 className="statsTitle">{username}'s Stats</h2>
          <div id="songsAndLearningdiv">
          <div id="songsDiv" className="mainDiv">
          <h3>Your Songs:</h3>
          {userSongs.length === 0 ?
            <>
              <p>You haven't created any songs yet!</p>
              <p><Link to="../freestyle" className="createLink">Click here</Link> to create</p>
            </>
            :
            <div id="songListDiv">
            <ol className="songList">
              {
                userSongs.map(i => (
                  <li key={i.id}>
                    <Link to={`../userSongs/${username}/${i.id}`} className="songLink">{i.song_name}</Link>
                  </li>
                ))
              }
            </ol>
            </div>
          }
          </div>

          <div className="mainDiv" id="learningDiv">
            
          <h3>Your Learning:</h3>
      
          {songNotesData.length === 0 ?
            <>
              <p>You haven't tried yet!</p>
              <p><Link to="../songnotes" className="practiceLink">Click here</Link> to practice </p>
            </>
            :
            <>
            <p>Overall Score: <strong className="score">{Math.round(overallScore)}%</strong></p>
      
      <div id="guitarInfo" className="instrumentInfo">
        <h3>Guitar:</h3>
        <p>You've played <strong>{guitarData.length}</strong> song notes sessions on guitar.</p>
        <p className='infoHeader'>Your best scores for each song:</p>
        {Object.keys(guitarMaxSongState).map(key => (
          <p key={key}>{key}: <strong className="score">{guitarMaxSongState[key]}%</strong></p>
        ))}
        <p className='infoHeader'>Your average score by key:</p>
        {
          guitarSortedKeys.map(i => (
            <p key={i}>{i}: <strong className="score">{guitarAvgKeyState[i]}%</strong></p>
          ))
        }
      </div>

      <div id="pianoInfo" className="instrumentInfo">
        <h3>Piano:</h3>
        <p>You've played <strong>{pianoData.length}</strong> song notes sessions on piano.</p>
        <p className='infoHeader'>Your best scores for each song:</p>
        {Object.keys(pianoMaxSongState).map(key => (
          <p key={key}>{key}: <strong className="score">{pianoMaxSongState[key]}%</strong></p>
        ))}
        <p className='infoHeader'>Your average score by key:</p>
        {
          pianoSortedKeys.map(i => (
            <p key={i}>{i}: <strong className="score">{pianoAvgKeyState[i]}%</strong></p>
          ))
        }
      </div> 
            </>
              
          }
          
        </div>
        </div>
        </>
      );
      
    
}

export default StatsApp;
