import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsExclamationTriangle } from "react-icons/bs";
import { SubmitButton } from "../atoms/Buttons";

type FormInputs = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const signUpURL = "http://localhost:3001/SignUp";
  const navigate = useNavigate();

  const errorStyle =
    "flex flex-row gap-2 bg-red-500 border-red-500 border-2 rounded-b-md text-white justify-center items-center py-0.5 mb-2";

  const inputFieldStyle = "h-10 p-2 border-black border-2 focus:outline-none";

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    mode: "onChange",
  });

  return (
    // Sign Up Page Container
    <div className="flex flex-col">
      {/* Heading Text */}
      <h1 className="text-center font-mono text-black pb-10 font-bold text-3xl">
        Sign Up <br /> to get started!
      </h1>
      {/*Main Form*/}
      <form
        onSubmit={handleSubmit(async (data) => {
          await axios
            .post(signUpURL, {
              firstname: data.firstname,
              lastname: data.lastname,
              username: data.username,
              email: data.email,
              password: data.password,
              confirmPassword: data.confirmPassword,
            })
            .then((res) => {
              if (res.data === "User Registration Successful!") {
                navigate("/");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })}
        className="flex flex-col gap-2"
      >
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
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 15, message: "Maximum 15 characters" },
              })}
            />
            {/* First Name Error Message */}
            {errors.firstname?.message ? (
              <span className={errorStyle}>
                <BsExclamationTriangle className="pt-1" size={20} />
                {errors.firstname?.message}
              </span>
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
                minLength: { value: 0, message: "" },
                maxLength: { value: 15, message: "Maximum 15 characters" },
              })}
            />
            {/* Last Name Error Message */}
            {errors.lastname?.message ? (
              <span className={errorStyle}>
                <BsExclamationTriangle className="pt-1" size={20} />
                {errors.lastname?.message}
              </span>
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
                minLength: { value: 5, message: "Minimum 5 characters!" },
                maxLength: { value: 15, message: "Maximum 15 characters!" },
              })}
            />
            {/* Username Error Message */}
            {errors.username?.message ? (
              <span className={errorStyle}>
                <BsExclamationTriangle className="pt-1" size={20} />
                {errors.username?.message}
              </span>
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
            />
            {/* Email Error Message */}
            {errors.email?.message ? (
              <span className={errorStyle}>
                <BsExclamationTriangle className="pt-1" size={20} />
                {errors.email?.message}
              </span>
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
                minLength: { value: 8, message: "Minimum 8 characters!" },
              })}
            />
            {/* Password Error Message */}
            {errors.password?.message ? (
              <span className={errorStyle}>
                <BsExclamationTriangle className="pt-1" size={20} />
                {errors.password?.message}
              </span>
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
                  return value === getValues().password
                    ? false
                    : "Passwords do not match!";
                },
              })}
            />
            {/* Confirm Password Error Message*/}
            {errors.confirmPassword?.message ? (
              <span className={errorStyle}>
                <BsExclamationTriangle className="pt-1" size={20} />
                {errors.confirmPassword?.message}
              </span>
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
