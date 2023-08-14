import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App"
import jwt_token from "jwt-decode";


const Navbar = (props) => {
//   const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const { token } = useContext(AppContext);
  const navigate = useNavigate();


  const logout = async () => {
    try {
      const res = await axios.delete("/users/logout");
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token) {
        const payload = jwt_token(token);
        setUsername(payload.username);
        setUserId(payload.userid);
      }
  }, [token]);

  return (
    <div id="navbar">
      <Stack spacing={2} direction={"row"}>
      <Button>
          Hey there, {username ? username : "Guest"}
        </Button>
        {/* <Button component={Link} to="/random-notes">
          Random Notes
        </Button> */}
        <Button component={Link} to="/songnotes">
          Song Notes
        </Button>
        <Button component={Link} to="/freestyle">
          Freestyle
        </Button>
        

        {
          token ?
          <>
          <Button component={Link} to="/stats">
            Your Stats
          </Button>
          <Button onClick={logout}>Log Out</Button>

          </>
          :
          <>
          <Button component={Link} to="/register">
          Register
          </Button>
          
          <Button component={Link} to="/login">
          Log In
          </Button>
          </>
        }
      </Stack>
    </div>
  );
};
export default Navbar;
