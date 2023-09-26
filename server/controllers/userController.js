import { register, login, users } from "../models/userModels.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const _users = async (req, res) => {
  try{
    const rows = await users();
    res.json(rows)
  }
  catch(err){
    console.log(err);
    res.status(404).json({ msg: "Oh no Something went wrong!" });
  }
}

export const _login = async (req, res) => {
  try {
    const row = await login(req.body.username.toLowerCase());
    if (row.length === 0)
      return res.status(404).json({ msg: "Username not found" });

    const match = await bcrypt.compare(req.body.password + "", row[0].password);

    if (!match) return res.status(400).json({ msg: "Password is incorrect" });

    // successful login
    const userid = row[0].id;
    const username = row[0].username;

    const secret = process.env.REACT_APP_ACCES_TOKEN_SECRET;

    const accessToken = jwt.sign({ userid, username }, secret, {
      expiresIn: "1d",
    });

    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 60 * 1000,
    });

    res.json({ token: accessToken });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Something went wrong :(" });
  }
};

export const _register = async (req, res) => {
  const { username, password } = req.body;

  const lower_username = username.toLowerCase();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password + "", salt);

  try {
    const row = await register(lower_username, hash);
    res.json(row);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "That username already exists. If it's you, log in" });
  }
};

export const _logout = (req, res) => {
  req.headers['x-access-token'] = null;
  res.clearCookie("token");
  return res.sendStatus(200);
};
