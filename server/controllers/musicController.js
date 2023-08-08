import {createSongNotes, createUserSong, userSongs, songNotes, userSong, deleteSong } from "../models/userModels.js"



export const songNotesToDb = async (req, res) => {
    const {user_id, key, song, correct_count, song_length, song_degrees, user_notes, song_notes, score} = req.body;
    console.log("req.body", req.body);
    try {
      const newSongNotes = await createSongNotes(req.body);
      console.log(newSongNotes);
      res.status(200).json({message: "song added to db"});
    } catch(error) {
      console.log(error);
      res.status(500).json({error: "server error yay"})
    }
  };
  
  export const userSongToDb = async (req, res) => {
    const {user_id, song_length, user_notes} = req.body;
    try {
      const newUserSong = await createUserSong(req.body);
      console.log(newUserSong);
      console.log(req.body)
      res.status(200).json({message: "song added to db"});
    } catch(error) {
      console.log(error);
      res.status(500).json({error: "server error yay"})
    }
  };
  
  export const getUserSongs = async (req, res) => {
    try {
      const songs = await userSongs()
      // res.status(200).json({msg: "got songs"})
      res.json(songs)
    } catch (error) {
      console.log(error)
    }
  }
  
  export const getSongNotes = async (req, res) => {
    try {
      const songNoteResults = await songNotes();
      res.json(songNoteResults)
    } catch (error) {
      console.log(error)
    }
  }
  
  export const getUserSong = async (req, res) => {
    const song_id = req.params.song_id;
    try {
      const song = await userSong(song_id);
      res.json(song)
    } catch(error) {
      console.log(error)
    }
  };
  
  export const deleteUserSong = async (req, res) => {
    const song_id = req.params.song_id;
    
    try {
      const deletedRowsCount = await deleteSong(song_id);
      
      if (deletedRowsCount > 0) {
        res.json({ message: "Song deleted successfully." });
      } else {
        res.status(404).json({ error: "Song not found." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while deleting the song." });
    }
  };
  