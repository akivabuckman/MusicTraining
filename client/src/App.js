import { Routes, Link, Route, Router, Switch } from "react-router-dom";
import Navbar from "./globalComponents/Navbar";
// import Auth from "./auth/Auth";
import { createContext, useState } from "react";
import SongNotesApp from "./Apps/SongNotesApp";
import FreestyleApp from "./Apps/FreestyleApp";
import StatsApp from "./Apps/StatsApp";
import SongDetail from "./Apps/SongDetail";
import Footer from "./globalComponents/Footer";
import LoginRegister from "./userComponents/LoginRegister";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css"


export const AppContext = createContext(null);


function App() {
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <div id="everything">
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        <ErrorBoundary>
          <Routes>
            <Route path="/songnotes" element={<SongNotesApp />} />
            <Route path="/freestyle" element={<FreestyleApp />} />
            <Route path="/" element={<FreestyleApp />} />
            <Route path="/stats" element={<StatsApp />} />
            <Route path="/userSongs/:username/:song_id" element={<SongDetail />} />
            <Route path="/register" element={<LoginRegister title="Register" />} />
            <Route path="/login" element={<LoginRegister title="Login" />} />
          </Routes>
        </ErrorBoundary>
        
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
