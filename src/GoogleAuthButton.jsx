import React, { useState } from "react";

import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const GoogleAuthButton = () => {
  const [token, setToken] = useState(null);

  if (token) console.log("Logged in with token: ", token);
  else console.log("Not logged in!");

  function logoutButtonHandler() {
    setTimeout(() => {
      googleLogout();
      setToken(null);
      console.log("Logged out!");
    }, 1000);
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setToken(tokenResponse.access_token);
      console.log(tokenResponse);
    },
  });

  return (
    <div>
      {token ? (
        <h2>
          <p>You have Logged in &#128515;</p>
          <button onClick={logoutButtonHandler} className="reg">
            Log out
          </button>
        </h2>
      ) : (
        <>
          <h2>
            Login with Google
            <span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                alt="google_image"
                height={"25px"}
                id="login"
              />
            </span>{" "}
          </h2>
          <button onClick={() => login()} className="log">
            Sign in
          </button>
        </>
      )}
    </div>
  );
};

export default GoogleAuthButton;
