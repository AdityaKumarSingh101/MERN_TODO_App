import { useState } from "react";

import Button from "../../atoms/Button";
import LoginPage from "../LoginCard/LoginCard";
import SignUpPage from "../SignUpCard/SignUpCard";

import "./HomePage.css";

export default function HomePage() {
  let [displayLogin, setDisplayLogin] = useState(true);

  return (
    <div className="HomePage-Container">
      <div className="HeroImage-Container">
        <div className="Button-Container">
          <Button
            id="showLoginButton"
            className="button"
            disabled={false}
            type="button"
            text={"Login"}
            clickFunction={() => setDisplayLogin(true)}
          />
          <Button
            id="showSignUpButton"
            className="button"
            disabled={false}
            type="button"
            text={"SignUp"}
            clickFunction={() => setDisplayLogin(false)}
          />
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
