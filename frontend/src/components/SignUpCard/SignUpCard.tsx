import { useState } from "react";
import axios from "axios";

import InputField from "../../atoms/InputField";
import Button from "../../atoms/Button";

import "./SignUpCard.css";

export default function SignUpPage() {
  const signUpURL = "http://localhost:3001/SignUp";

  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleFormFields(e: any) {
    const { name, value } = e.target;
    setInputs((values: any) => ({ ...values, [name]: value }));
  }

  async function handleFormSubmit() {
    await axios.post(signUpURL, {
      firstname: inputs.firstname,
      lastname: inputs.lastname,
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
    });
  }
  return (
    <div className="SignUpPage-Container">
      <h1 className="SignUpTitle">Sign Up</h1>
      <div className="SignUpForm-Container">
        <form id="SignUpForm">
          <div className="NameInputFields-Container">
            <InputField
              type="text"
              id="firstname"
              name="firstname"
              className="nameinput"
              placeholder="First Name"
              disabled={false}
              value={inputs.firstname}
              onChange={handleFormFields}
            />
            <InputField
              type="text"
              id="lastname"
              name="lastname"
              className="nameinput"
              placeholder="Last Name"
              disabled={false}
              value={inputs.lastname}
              onChange={handleFormFields}
            />
          </div>
          <InputField
            type="text"
            id="username"
            name="username"
            className="input"
            placeholder="Username"
            disabled={false}
            value={inputs.username}
            onChange={handleFormFields}
          />
          <InputField
            type="email"
            id="email"
            name="email"
            className="input"
            placeholder="Email"
            disabled={false}
            value={inputs.email}
            onChange={handleFormFields}
          />
          <InputField
            type="password"
            id="password"
            name="password"
            className="input"
            placeholder="Password"
            disabled={false}
            value={inputs.password}
            onChange={handleFormFields}
          />
          <InputField
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="input"
            placeholder="Confirm Password"
            disabled={false}
            value={inputs.confirmPassword}
            onChange={handleFormFields}
          />
          <Button
            type="button"
            id="signUpSubmitBtn"
            className="signUpSubmitBtn"
            text="Sign Up"
            disabled={false}
            clickFunction={handleFormSubmit}
          />
        </form>
      </div>
    </div>
  );
}
