import express from "express";
import { songNotesToDb, userSongToDb, getUserSongs, getSongNotes, getUserSong, deleteUserSong, getAllUserSongs, getUserSongNotes } from "../controllers/musicController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";


const mrouter = express.Router();
mrouter.post("/songNotes", songNotesToDb);
mrouter.post("/userSong", userSongToDb)
// mrouter.get("/userSongs", getUserSongs);
mrouter.get("/songNotes/:user_id", getUserSongNotes);
mrouter.get("/userSongs/:user_id/:song_id", getUserSong);
mrouter.get("/userSongs/:user_id", getAllUserSongs)
mrouter.delete("/userSongs/:song_id", deleteUserSong);

export default mrouter;