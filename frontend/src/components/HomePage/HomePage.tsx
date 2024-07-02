import { useState } from "react";
import LoginPage from "../Login/Login";
import SignUpPage from "../SignUp/SignUp";

import "./HomePage.css";

export default function HomePage() {
  let [displayLogin, setDisplayLogin] = useState(true);

  return (
    <div className="HomePage-Container">
      <div className="HeroImage-Container">
        <div className="Button-Container">
          <button
            id="showLoginButton"
            className="button"
            disabled={false}
            type="button"
            onClick={() => setDisplayLogin(true)}
          >
            Login
          </button>
          <button
            id="showSignUpButton"
            className="button"
            disabled={false}
            type="button"
            onClick={() => setDisplayLogin(false)}
          >
            SignUp
          </button>
        </div>
      </div>
      <div className="Button-Page-Container">
        <div className="LoginSignUp-Container">
          {displayLogin && <LoginPage />}
          {!displayLogin && <SignUpPage />}
        </div>
      </div>
    </div>
  );
}
