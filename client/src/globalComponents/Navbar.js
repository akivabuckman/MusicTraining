import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_token from "jwt-decode";
import { AppContext } from "../App";

/**
 * Navbar component displays navigation links and user-related actions.
 *
 * @component
 */
const Navbar = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  /**
   * Logout function that clears the token and navigates to the login page.
   * @async
   * @function Logout
   * @fires setToken
   */
  const logout = async () => {
    try {
      const res = await axios.delete("/users/logout");
      if (res.status === 200) {
        setToken(null);
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Updates username and userId when token changes.
   * @function
   * @param {string} token - The user's authentication token.
   * @fires setUsername
   * @fires setUserId
   */
  useEffect(() => {
    if (token) {
      const payload = jwt_token(token);
      setUsername(payload.username);
      setUserId(payload.userid);
    } else {
      setUsername(null);
      setUserId(null);
    }
  }, [token]);

  return (
    <div id="navbar">
      <Stack spacing={2} direction={"row"}>
        <Button>
          Hey there, {username ? username : "Guest"}
        </Button>
        <Button component={Link} to="/songnotes">
          Song Notes
        </Button>
        <Button component={Link} to="/freestyle">
          Freestyle
        </Button>
        {token ? (
          <>
            <Button component={Link} to="/stats">
              Your Stats
            </Button>
            <Button onClick={logout}>Log Out</Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/register">
              Register
            </Button>
            <Button component={Link} to="/login">
              Log In
            </Button>
          </>
        )}
      </Stack>
    </div>
  );
};

export default Navbar;
