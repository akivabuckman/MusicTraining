import express from "express";
import { _register, _login, _logout, _users } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";


const urouter = express.Router();
urouter.post("/register", _register);
urouter.post("/login", _login);
urouter.delete("/logout", _logout);
urouter.get("/verify", verifyToken, (req, res) => {
    
  res.sendStatus(200);
});
urouter.get("/users",verifyToken, _users);


export default urouter;
