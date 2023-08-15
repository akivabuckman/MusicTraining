import { Routes, Link, Route, Router, Switch } from "react-router-dom";
import Navbar from "./globalComponents/Navbar";
// import Auth from "./auth/Auth";
import { createContext, useState } from "react";
import SongNotesApp from "./SongNotesApp";
import FreestyleApp from "./FreestyleApp";
import StatsApp from "./StatsApp";
import SongDetail from "./SongDetail";
import Footer from "./globalComponents/Footer";
import "./App.css"
import LoginRegister from "./userComponents/LoginRegister";

export const AppContext = createContext(null);


function App() {
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <div id="everything">
        <Navbar />

        <Routes>
          <Route path="/songnotes" element={<SongNotesApp />} />
          <Route path="/freestyle" element={<FreestyleApp />} />
          <Route path="/" element={<FreestyleApp />} />
          <Route path="/stats" element={<StatsApp />} />
          <Route path="/userSongs/:username/:song_id" element={<SongDetail />} />
          <Route path="/register" element={<LoginRegister title="Register" />} />
          <Route path="/login" element={<LoginRegister title="Login" />} />
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
