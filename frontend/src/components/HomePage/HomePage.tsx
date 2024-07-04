import { useState } from "react";
import LoginPage from "../Login/Login";
import SignUpPage from "../SignUp/SignUp";
import { HomePageButton } from "../atoms/Buttons";

export default function HomePage() {
  let [displayLogin, setDisplayLogin] = useState(true);

  return (
    <div className="flex flex-row h-[100vh] flex-grow-0">
      <div className="flex flex-col bg-black mr-5 w-[60%] hover:w-[70%] hover:transition-all ease-in-out justify-around ">
        <div className="flex flex-row gap-10 justify-center items-center flex-wrap">
          <img src="/TodoApp.png" className="scale-90 ml-10" />
          <div className="text-white font-mono text-5xl font-bold pt-8 flex-grow-0">
            TODO App
          </div>
        </div>
        <div className="flex flex-row justify-center items-start gap-5">
          <HomePageButton type="Login" onClick={() => setDisplayLogin(true)} />
          <HomePageButton
            type="SignUp"
            onClick={() => setDisplayLogin(false)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center m-auto">
        <div className="justify-center mr-5">
          {displayLogin ? <LoginPage /> : <SignUpPage />}
        </div>
      </div>
    </div>
  );
}
