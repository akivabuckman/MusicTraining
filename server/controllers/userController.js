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
    res.status(404).json({ msg: "something went wrong!!" });
  }
}

export const _login = async (req, res) => {
  try {
    console.log(req.body)
    const row = await login(req.body.username.toLowerCase());
    console.log("row", row)
    if (row.length === 0)
      return res.status(404).json({ msg: "username not found" });

    const match = await bcrypt.compare(req.body.password + "", row[0].password);

    if (!match) return res.status(400).json({ msg: "wrong password" });

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
    res.status(404).json({ msg: "something went wrong in controller" });
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

