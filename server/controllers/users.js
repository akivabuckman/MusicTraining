import { register, login, users } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {createSongNotes, createUserSong} from "../models/users.js"
dotenv.config();

export const _users = async (req, res) => {
  try{
    const rows = await users();
    res.json(rows)
  }
  catch(err){
    console.log(err);
    res.status(404).json({ msg: "something went wrong!!" });
  }
}

export const _login = async (req, res) => {
  try {
    const row = await login(req.body.username.toLowerCase());

    if (row.length === 0)
      return res.status(404).json({ msg: "username not found" });

    const match = await bcrypt.compare(req.body.password + "", row[0].password);
    if (!match) return res.status(400).json({ msg: "wrong password" });

    // successful login
    const userid = row[0].id;
    const username = row[0].username;

    const secret = process.env.ACCESS_TOKEN_SECRET;
    // console.log('secret=>',secret);

    const accessToken = jwt.sign({ userid, username }, secret, {
      expiresIn: "60s",
    });

    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 60 * 1000,
    });

    res.json({ token: accessToken });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "something went wrong!!" });
  }
};

export const _register = async (req, res) => {
  const { username, password } = req.body;

  const lower_username = username.toLowerCase();

  //   const salt = bcrypt.genSaltSync(10);
  const salt = await bcrypt.genSalt(10);
  //   const hash = bcrypt.hashSync(password + "", salt);
  const hash = await bcrypt.hash(password + "", salt);

  //   register(lower_username, hash)
  //     .then((row) => {
  //       res.json(row);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       res.status(404).json({ msg: "user allready exist!" });
  //     });
  try {
    const row = await register(lower_username, hash);
    res.json(row);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "user allready exist!" });
  }
};

export const _logout = (req, res) => {
  // const accessToken = req.cookies.token;
  // if (!accessToken) return res.sendStatus(204);
  req.headers['x-access-token'] = null;
  res.clearCookie("token");
  return res.sendStatus(200);
};

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
}