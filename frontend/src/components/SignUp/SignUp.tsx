import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../atoms/Buttons";

type FormInputs = {
  firstname: "";
  lastname: "";
  username: "";
  email: "";
  password: "";
  confirmPassword: "";
};
export default function SignUpPage() {
  const signUpURL = "http://localhost:3001/SignUp";
  const navigate = useNavigate();

  const errorStyle = {
    color: "red",
    fontWeight: "bold",
  };

  const inputFieldStyle = "h-10 p-2 border-black border-2 focus:outline-none";

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const watchPasswords = watch(["password", "confirmPassword"]);

  const [inputs, setInputs] = useState<FormInputs>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleFormFields(e: any) {
    const { name, value } = e.target;
    setInputs((values: FormInputs) => ({ ...values, [name]: value }));
  }

  async function onSubmit() {
    await axios
      .post(signUpURL, {
        firstname: inputs.firstname,
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
      })
      .then((res) => {
        if (res.data === "User Registration Successful!") {
          navigate("/");
        } else {
          return;
        }
      });
  }
  return (
    // Sign Up Page Container
    <div className="flex flex-col">
      {/* Heading Text */}
      <h1 className="text-center font-mono text-black pb-10 font-bold text-3xl">
        Sign Up <br /> to get started!
      </h1>
      {/*Main Form*/}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/*First and Last Name*/}
        <div className="flex flex-row justify-center gap-2">
          {/* First Name */}
          <div className="flex flex-col">
            {/* First Name Input*/}
            <input
              type="text"
              className={inputFieldStyle}
              placeholder="First Name"
              {...register("firstname", {
                required: "This field is required!",
                min: 2,
                max: 10,
                validate: (value) => {
                  // Check if value length in range
                  return value.length <= 10 && value.length >= 2
                    ? false
                    : "Must be 2 to 10 characters!";
                },
              })}
              value={inputs.firstname}
              onChange={handleFormFields}
            />
            {/* First Name Error Message */}
            {errors.firstname?.message ? (
              <span style={errorStyle}>{errors.firstname?.message}</span>
            ) : (
              <span></span>
            )}
          </div>
          {/* Last Name */}
          <div className="flex flex-col">
            {/* Last Name Input */}
            <input
              type="text"
              className={inputFieldStyle}
              placeholder="Last Name"
              {...register("lastname", {
                required: false,
                min: 2,
                max: 10,
                validate: (value) => {
                  // Check if value length in range
                  return value !== "" && value.length >= 2 && value.length <= 10
                    ? false
                    : "Must be 2 to 10 characters!";
                },
              })}
              value={inputs.lastname}
              onChange={handleFormFields}
            />
            {/* Last Name Error Message */}
            {errors.lastname?.message ? (
              <span style={errorStyle}>{errors.lastname?.message}</span>
            ) : (
              <span></span>
            )}
          </div>
        </div>
        {/*Rest of the fields*/}
        <div className="flex flex-col gap-1">
          {/* Username */}
          <div className="flex flex-col">
            {/* Username Input */}
            <input
              type="text"
              className={inputFieldStyle}
              placeholder="Username"
              {...register("username", {
                required: "This field is required!",
                min: 5,
                max: 15,
                validate: (value) => {
                  // Check if value in range
                  return value.length > 15 || value.length < 5
                    ? "Can only be 5 to 15 characters!"
                    : false;
                },
              })}
              value={inputs.username}
              onChange={handleFormFields}
            />
            {/* Username Error Message */}
            {errors.username?.message ? (
              <span style={errorStyle}>{errors.username?.message}</span>
            ) : (
              <span></span>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col">
            {/* Email Input */}
            <input
              type="email"
              className={inputFieldStyle}
              placeholder="Email"
              {...register("email", {
                required: "This field is required!",
              })}
              value={inputs.email}
              onChange={handleFormFields}
            />
            {/* Email Error Message */}
            {errors.email?.message ? (
              <span style={errorStyle}>{errors.email?.message}</span>
            ) : (
              <span></span>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col">
            {/* Password Input */}
            <input
              type="password"
              className={inputFieldStyle}
              placeholder="Password"
              {...register("password", {
                required: "This field is required!",
                min: 8,
                max: 64,
                validate: (value) => {
                  // Check if password is of correct length
                  return value.length < 8 || value.length > 64
                    ? "Can only be 8 to 64 characters!"
                    : false;
                },
              })}
              value={inputs.password}
              onChange={handleFormFields}
            />
            {/* Password Error Message */}
            {errors.password?.message ? (
              <span style={errorStyle}>{errors.password?.message}</span>
            ) : (
              <span></span>
            )}
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col">
            {/* Confirm Password Input */}
            <input
              type="password"
              className={inputFieldStyle}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "This field is required!",
                validate: (value) => {
                  // Check if passwords match
                  return value === watchPasswords[0]
                    ? false
                    : "Passwords do not match!";
                },
              })}
              value={inputs.confirmPassword}
              onChange={handleFormFields}
            />
            {/* Confirm Password Error Message*/}
            {errors.confirmPassword?.message ? (
              <span style={errorStyle}>{errors.confirmPassword?.message}</span>
            ) : (
              <span></span>
            )}
          </div>
          {/* Submit Button */}
          <SubmitButton type="SignUp" />
        </div>
      </form>
    </div>
  );
}
