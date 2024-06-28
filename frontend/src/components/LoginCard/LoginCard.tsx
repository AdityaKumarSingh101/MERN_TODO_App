import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import InputField from "../../atoms/InputField";
import Button from "../../atoms/Button";

import "./LoginCard.css";

export default function LoginPage() {
  const loginURL = "http://localhost:3001/Login";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    await axios.post(loginURL, { username, password }).then((res) => {
      if (res.data === "Please enter username / password!") {
        alert("Please enter username / password!");
      } else if (res.data === "User not found!") {
        alert("User not found! Please Sign Up before logging in.");
      } else if (res.data === "Username / Password Incorrect!") {
        alert("Username / Password Incorrect!");
      } else {
        localStorage.setItem("UserId", res.data.id);
        navigate("/Dashboard");
      }
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
