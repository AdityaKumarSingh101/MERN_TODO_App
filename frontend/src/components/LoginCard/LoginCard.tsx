import { useState } from "react";
import axios from "axios";

import InputField from "../../atoms/InputField";
import Button from "../../atoms/Button";

import "./LoginCard.css";

export default function LoginPage() {
  const loginURL = "http://localhost:3001/Login";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    await axios.post(loginURL).then((res) => {
      res.data;
    });
  }
  return (
    <div className="LoginPage-Container">
      <h1 className="LoginTitle">Login</h1>
      <div className="LoginForm-Container">
        <form id="LoginForm">
          <InputField
            type="text"
            id="usernameInput"
            name="usernameInput"
            className="input"
            placeholder="Username"
            disabled={false}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <InputField
            type="password"
            id="passwordInput"
            name="passwordInput"
            className="input"
            placeholder="Password"
            disabled={false}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="button"
            id="LoginFormSubmitBtn"
            className="loginSubmitBtn"
            disabled={false}
            text="Login"
            clickFunction={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
