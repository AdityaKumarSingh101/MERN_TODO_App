import { useState } from "react";
import LoginPage from "../Login/Login";
import SignUpPage from "../SignUp/SignUp";
import { HomePageButton } from "../atoms/Buttons";

export default function HomePage() {
  // Boolean to switch between signup and login
  const [displayLogin, setDisplayLogin] = useState(true);

  return (
    // Home Page Container
    <div className="flex flex-row min-h-[100vh] flex-grow-1">
      {/* Login Signup Hero Element */}
      <div className="flex flex-col bg-black w-[60%] justify-center gap-y-80 p-5">
        {/* App Logo and Title */}
        <div className="flex flex-row justify-center flex-wrap gap-x-15 mx-auto pr-20">
          <img src="/TodoApp.png" className="scale-[60%] ml-10" />
          <span className="text-white font-mono text-5xl font-bold pt-8 flex-grow-0 pl-5">
            DO-It!
          </span>
          <div className="text-white font-mono mt-2 text-center text-lg">
            The app to help you get your things done...
          </div>
        </div>
        {/* Login and Signup Switch */}
        <div className="flex flex-row justify-center items-start gap-5">
          <HomePageButton type="Login" onClick={() => setDisplayLogin(true)} />
          <HomePageButton
            type="SignUp"
            onClick={() => setDisplayLogin(false)}
          />
        </div>
      </div>
      {/* Login / Signup Page */}
      <div className="flex flex-col items-center m-auto">
        <div className="justify-center mx-2">
          {displayLogin ? <LoginPage /> : <SignUpPage />}
        </div>
      </div>
    </div>
  );
}
