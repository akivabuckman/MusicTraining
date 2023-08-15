import { useState, useEffect, useContext } from 'react';
import { AppContext } from './App';
import jwt_token from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';



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


    const fetchUserSongs = async () => {
        try {
            const response = await fetch(`/music/userSongs/${userId}`);
            const data = await response.json();
            setUserSongs(data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSongNotes = async () => {
        try {
            const response = await fetch(`/music/songNotes/${userId}`);
            const data = await response.json();
            setSongNotesData(data)
        } catch (error) {
            console.log(error)
        }
    }

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
  
    useEffect(()=>{
        setPianoSortedKeys(Object.keys(pianoAvgKeyState).sort((a, b) => pianoAvgKeyState[b] - pianoAvgKeyState[a]))
    }, [pianoAvgKeyState]);

    useEffect(()=>{
        setGuitarSortedKeys(Object.keys(guitarAvgKeyState).sort((a, b) => guitarAvgKeyState[b] - guitarAvgKeyState[a]))
    }, [guitarAvgKeyState]);

    useEffect(()=>{
        guitarMath();
    }, [guitarData]);

    useEffect(()=>{
        pianoMath();
    }, [pianoData]);

    useEffect(()=>{
        setGuitarData(songNotesData.filter(item => item.instrument === "guitar"));
        setPianoData(songNotesData.filter(item => item.instrument === "piano"));
    }, [songNotesData])

    useEffect(() => {
        if (token) {
            const payload = jwt_token(token);
            setUsername(payload.username);
            setUserId(payload.userid);
          } else {
            navigate("../login");
          }
    }, []);

    useEffect(()=>{
        if (userId !== "") {
            fetchUserSongs();
            fetchSongNotes();
        }
    }, [userId])
    
    const log = () => {
        console.log(pianoAvgKeyState)
    }

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
