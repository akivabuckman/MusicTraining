import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import { AppContext } from "../App";
import "./LoginRegister.css"

const LoginRegister = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { setToken } = useContext(AppContext);
  const { token } = useContext(AppContext);


  const navigate = useNavigate();

  const handleClick = async () => {
    if (props.title === "Register") {
      try {
        const res = await axios.post("/users/register", { username, password });
        if (res.status === 200) {
          console.log(res.data);
          setMsg("");
          navigate("/login");
        }
      } catch (err) {
        console.log(err.message);
        setMsg(err.response.data.msg);
      }
    } else {
      try {
        const res = await axios.post("/users/login", { username, password });
        if (res.status === 200) {
          setToken(res.data.token);
          setMsg("");
          navigate("../stats");
        }
      } catch (err) {
        console.log(err);
        setMsg(err.response.data.msg);
      }
    }
  };

  const log = () => {
    console.log(token)
  }

  return (
    <div id="loginDiv">
      <h2>{props.title}</h2>
      <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete="off">
        <TextField
          sx={{ m: 1 }}
          id="username"
          type="username"
          label="Enter Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id="password"
          type="password"
          label="Enter password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={handleClick}>
        {props.title}
      </Button>
      <div>{msg}</div>
    </div>
  );
};
export default LoginRegister;
