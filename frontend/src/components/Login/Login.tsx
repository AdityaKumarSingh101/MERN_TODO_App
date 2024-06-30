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

  const {
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSubmit() {
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
      <h1 className="text-center font-sans text-[--text-color] pb-20 font-bold text-3xl">
        Login <br />
        to your account...
      </h1>
      <form>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            id="username"
            className="h-10 p-1 border-[--border-color] border-solid border-2 rounded-md"
            placeholder="Username"
            {...register("username", { required: "This field is required!" })}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <p>{errors.username?.message}</p>
          <input
            type="password"
            id="password"
            className="h-10 p-1 border-[--border-color] border-solid border-2 rounded-md"
            placeholder="Password"
            {...register("password", { required: "This field is required!" })}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p>{errors.password?.message}</p>
          <button
            type="button"
            className="border-2 rounded-md border-[--border-color] text-[--text-color] font-serif font-normal text-lg h-12 hover:bg-[--border-color] hover:text-white"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
