import db from "../config/db.js";

export const createSongNotes = async ({user_id, key, song, correct_count, song_length, song_degrees, user_notes, song_notes, score, instrument}) => {
    const answer = await db('song_notes_sessions')
    .insert({user_id, key, song, correct_count, song_length, song_degrees, user_notes, song_notes, score, instrument});
    return answer
};

export const createUserSong = async ({user_id, song_length, user_notes, song_name}) => {
    const answer = await db('user_songs')
    .insert({user_id, song_length, user_notes, song_name});
    return answer 
};

export const userSongs = async (user_id) => {
    const answer = await db("user_songs")
    .select("*")
    .orderBy("song_name")
    return answer
}

export const songNotes = async (user_id) => {
    const answer = await db("song_notes_sessions")
    .select("*")
    .orderBy("song")
    return answer
}

export const userSong = async (song_id, user_id) => {
    const answer = await db("user_songs")
    .select("*")
    .where("id", song_id)
    .where("user_id", user_id)
    return answer
};

export const deleteSong = async (song_id) => {
    const deletedRowsCount = await db("user_songs")
      .where("id", song_id)
      .del();
  
    return deletedRowsCount;
  };

export const allUserSongs = async (user_id) => {
    const answer = await db("user_songs")
    .select("*")
    .where("user_id", user_id)
    return answer
};

export const userSongNotes = async (user_id) => {
    const answer = await db("song_notes_sessions")
    .select("*")
    .where("user_id", user_id)
    return answer
};