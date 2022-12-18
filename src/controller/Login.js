import React from "react";
import { Button } from "@mui/material";

import "../view/Login.css";
import { auth, provider } from "../model/firebase";
import { actionTypes } from "./Reducer";
import useStateValue from "./StateProvider";
import Animatedpage from "./Animatedpage";

function Login() {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Animatedpage>
      <div className="login">
        <div className="login_body">
          <a
            href="https://www.linkedin.com/in/mohammed-abrar-ahasan-chowdhury-826247223"
            target="blank"
          >
            <div className="logo">
              <img
                src="https://media.licdn.com/dms/image/D5603AQFtqVjQJyvqHA/profile-displayphoto-shrink_800_800/0/1670698430892?e=1676505600&v=beta&t=0Z7KLglPqVNGIODJlxPG4hEVZ8QSvqfsBfU_7TKwwuY"
                alt=""
              />
            </div>
          </a>
          <div className="login_text">
            <h1>Sign in to your account</h1>
          </div>
          <Button onClick={signIn}>
            google sign-in
            <img
              className="google"
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
              height={20}
              width={20}
              alt=""
            />
          </Button>
        </div>
      </div>
    </Animatedpage>
  );
}

export default Login;
