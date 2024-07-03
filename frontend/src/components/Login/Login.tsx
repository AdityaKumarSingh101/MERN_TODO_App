import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  password: string;
}

export default function LoginPage() {
  const loginURL = "http://localhost:3001/Login";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const errorStyle = {
    backgroundColor: "red",
    color: "white",
    border: "2px",
    borderRadius: "0px 0px 5px 5px",
    padding: "1px 2px",
  };

  const inputFieldStyle = "h-10 p-2 border-black border-2 focus:outline-none";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit() {
    await axios.post(loginURL, { username, password }).then((res) => {
      if (res.data === "Please enter username / password!") {
        alert(res.data);
        return;
      } else if (res.data === "Please enter username / password!") {
        alert(res.data);
        return;
      } else if (res.data === "User not found!") {
        alert(res.data);
        return;
      } else if (res.data === "Username / Password Incorrect!") {
        alert(res.data);
        return;
      } else {
        if (!localStorage.getItem("UserId"))
          localStorage.setItem("UserId", res.data.id);
        navigate("/Dashboard");
      }
    });
  }
  return (
    <div className="w-80 min-h-10">
      <h1 className="text-center font-mono text-black pb-20 font-bold text-3xl">
        Login <br />
        to your account...
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 text-center">
          <div className="flex flex-col">
            <input
              type="text"
              className={inputFieldStyle}
              placeholder="Username"
              {...register("username", { required: "This field is required!" })}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {errors.username?.message ? (
              <span style={errorStyle}>{errors.username.message}</span>
            ) : (
              <span></span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              className={inputFieldStyle}
              placeholder="Password"
              {...register("password", { required: "This field is required!" })}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errors.password?.message ? (
              <span style={errorStyle}>{errors.password.message}</span>
            ) : (
              <span></span>
            )}
          </div>
          <button
            type="submit"
            className="border-black border-2 text-black font-mono font-normal text-lg h-12 hover:bg-black hover:text-white mt-5"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
