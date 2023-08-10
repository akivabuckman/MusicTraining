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

