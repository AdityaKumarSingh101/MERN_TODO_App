import { useState } from "react";

import Button from "../../atoms/Button";
import LoginPage from "../LoginPage/LoginPage";
import SignUpPage from "../SignUpPage/SignUpPage";

import "./HomePage.css";

export default function HomePage() {
  let [displayLogin, setDisplayLogin] = useState(false);
  return (
    <div className="HomePage-Container">
      <h1>Home Page</h1>
      <div className="Button-Container">
        <Button text={"Login"} clickFunction={() => setDisplayLogin(true)} />
        <Button text={"SignUp"} clickFunction={() => setDisplayLogin(false)} />
      </div>
      <div className="LoginSignUp-Container">
        {displayLogin && <LoginPage />}
        {!displayLogin && <SignUpPage />}
      </div>
    </div>
  );
}
