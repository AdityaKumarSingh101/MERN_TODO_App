import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpPage() {
  const signUpURL = "http://localhost:3001/SignUp";
  const navigate = useNavigate();

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
    await axios
      .post(signUpURL, {
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
      })
      .then((res) => {
        if (res.data === "User Registration Successful!") {
          navigate("/");
        } else if (res.data === "Passwords dont match!") {
          alert("Passwords dont match!");
        } else {
          alert("Server Error!");
        }
      });
  }
  return (
    <div className="w-80 min-h-48">
      <h1 className="text-center font-sans text-[--text-color] pb-10 font-bold text-3xl">
        Sign Up <br /> to get started!
      </h1>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="w-[155px] h-10 p-1 border-[--border-color] border-solid border-2 rounded-md"
            placeholder="First Name"
            disabled={false}
            value={inputs.firstname}
            onChange={handleFormFields}
          />
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="w-[155px] h-10 p-1 border-[--border-color] border-solid border-2 rounded-md"
            placeholder="Last Name"
            disabled={false}
            value={inputs.lastname}
            onChange={handleFormFields}
          />
        </div>
        <input
          type="text"
          id="username"
          name="username"
          className="h-10 p-1 border-[--border-color] border-solid border-2 rounded-md"
          placeholder="Username"
          disabled={false}
          value={inputs.username}
          onChange={handleFormFields}
        />
        <input
          type="email"
          id="email"
          name="email"
          className="h-10 p-1 border-[--border-color] border-solid border-2 rounded-md"
          placeholder="Email"
          disabled={false}
          value={inputs.email}
          onChange={handleFormFields}
        />
        <input
          type="password"
          id="password"
          name="password"
          className="h-10 p-1 border-[--border-color] border-solid border-2 rounded-md"
          placeholder="Password"
          disabled={false}
          value={inputs.password}
          onChange={handleFormFields}
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="h-10 p-1 border-[--border-color] border-solid border-2 rounded-md"
          placeholder="Confirm Password"
          disabled={false}
          value={inputs.confirmPassword}
          onChange={handleFormFields}
        />
        <button
          type="button"
          id="signUpSubmitBtn"
          className="border-2 rounded-md border-[--border-color] text-[--text-color] font-serif font-normal text-lg h-12 hover:bg-[--border-color] hover:text-white"
          disabled={false}
          onClick={handleFormSubmit}
        >
          Sign Up!
        </button>
      </div>
    </div>
  );
}
