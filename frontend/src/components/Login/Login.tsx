import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { SubmitHandler, useForm } from "react-hook-form";
import { BsExclamationTriangle } from "react-icons/bs";
import { SubmitButton } from "../atoms/Buttons";

type FormInput = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const loginURL = "http://localhost:3001/Login";
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const errorStyle =
    "flex flex-row justify-center items-center bg-red-500 text-white rounded-b-md py-1";
  const inputFieldStyle = "h-10 p-2 border-black border-2 focus:outline-none";

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await axios
      .post(loginURL, { username: data.username, password: data.password })
      .then((res) => {
        if (res.data === "Please enter username / password!") {
          setError(true);
          setErrorMessage(res.data);
          return;
        } else if (res.data === "User not found!") {
          setError(true);
          setErrorMessage(res.data);
          return;
        } else if (res.data === "Username / Password Incorrect!") {
          setError(true);
          setErrorMessage(res.data);
          return;
        } else {
          setError(false);
          setErrorMessage("");
          if (!localStorage.getItem("UserId"))
            localStorage.setItem("UserId", res.data.id);
          navigate("/Dashboard");
        }
      });
  };
  return (
    // Login Page Container
    <div className="w-80 min-h-10">
      {/* Login Text */}
      <h1 className="text-center font-mono text-black pb-20 font-bold text-3xl">
        Login <br />
        to your account...
      </h1>
      {/* Error Box */}
      <div>
        {error ? (
          <div className="flex flex-row justify-center items-center mx-auto bg-red-600 gap-5 text-white py-3 mb-5">
            <BsExclamationTriangle size={25} />
            {errorMessage}
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form Container */}
        <div className="flex flex-col gap-3 text-center">
          {/* Username Field and Error Message Container */}
          <div className="flex flex-col">
            {/* Username Field */}
            <input
              type="text"
              className={inputFieldStyle}
              placeholder="Username"
              {...register("username", { required: "This field is required!" })}
            />
            {/* Error Message */}
            {errors.username?.message ? (
              <span className={errorStyle}>
                <BsExclamationTriangle className="pt-1" size={20} />
                {errors.username.message}
              </span>
            ) : (
              <span></span>
            )}
          </div>
          {/* Password Field and Error Message Container */}
          <div className="flex flex-col">
            {/* Password Field */}
            <input
              type="password"
              className={inputFieldStyle}
              placeholder="Password"
              {...register("password", { required: "This field is required!" })}
            />
            {/* Error Message */}
            {errors.password?.message ? (
              <span className={errorStyle}>
                <BsExclamationTriangle className="pt-1" size={20} />
                {errors.password.message}
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <SubmitButton type="Login" />
        </div>
      </form>
    </div>
  );
}
