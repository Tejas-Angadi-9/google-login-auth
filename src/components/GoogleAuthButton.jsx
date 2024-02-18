import React, { useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

import Dashboard from "../pages/Dashboard";

const GoogleAuthButton = () => {
  const [token, setToken] = useState(localStorage.getItem("googleAuthToken"));

  console.log("Token: ", token);
  const handleLoginSuccess = (tokenResponse) => {
    setToken(tokenResponse.access_token);
    localStorage.setItem("googleAuthToken", tokenResponse.access_token);
    console.log("Logged in with token: ", tokenResponse);
  };

  const handleLogout = () => {
    googleLogout();
    setToken(null);
    localStorage.removeItem("googleAuthToken");
    console.log("Logged out!");
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
  });

  useEffect(() => {
    // Check localStorage for token on component mount
    const token = localStorage.getItem("googleAuthToken");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div>
      {token ? (
        <>
          <Dashboard />
          <h2>
            {/* <p>You have Logged in &#128515;</p> */}
            <button onClick={handleLogout} className="reg">
              Log out
            </button>
          </h2>
        </>
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
          <button onClick={login} className="log">
            Sign in
          </button>
        </>
      )}
    </div>
  );
};

export default GoogleAuthButton;
