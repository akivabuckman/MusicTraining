import db from "../config/db.js";

export const register = (username, password) => {
    return db('signinusers')
    .insert({username,password})
    .returning(['id','username'])
}

export const login = (username) => {
    return db('signinusers')
    .select('id','username','password')
    .where({username})
}

export const users = () => {
    return db('signinusers')
    .select('id','username','password')
    .orderBy('id')
};

export const createSongNotes = async ({user_id, key, song, correct_count, song_length, song_degrees, user_notes, song_notes, score}) => {
    const answer = await db('song_notes_sessions')
    .insert({user_id, key, song, correct_count, song_length, song_degrees, user_notes, song_notes, score});
    return answer
};

export const createUserSong = async ({user_id, song_length, user_notes, song_name}) => {
    const answer = await db('user_songs')
    .insert({user_id, song_length, user_notes, song_name});
    return answer 
}