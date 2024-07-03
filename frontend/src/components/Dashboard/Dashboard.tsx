import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Todos from "../Todos/Todos";

type UserData = {
  id: string;
  name: {
    first: string;
    last: string;
  };
  username: string;
  email: string;
};

export default function Dashboard() {
  const userId = localStorage.getItem("UserId");

  const fetchDataURL = `http://localhost:3001/users/${userId}`;

  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: {
      first: "",
      last: "",
    },
    username: "",
    email: "",
  });

  function setData(user: any) {
    setUserData({
      id: user._id,
      name: {
        first: user.name.first,
        last: user.name.last,
      },
      username: user.username,
      email: user.email,
    });
  }
  async function fetchUserData() {
    await axios
      .get(fetchDataURL)
      .then((res) => {
        const user = res.data;
        setData(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("UserId");
    navigate("/");
  }

  return (
    // Contains the whole dashboard
    <div className="flex flex-col">
      {/*Contains the Dashboard NavBar */}
      <div className="flex flex-row justify-between p-1 bg-black text-white">
        <h1 className="mt-1 ml-3 font-sans text-lg">
          Hello, {userData.username}
        </h1>
        <button
          id="logoutBtn"
          className="w-20 h-10 border-white border-2 text-white font-serif font-normal text-md mr-10 hover:bg-white hover:text-black"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {/*Contains the rest of dashboard*/}
      <div className="flex flex-row">
        {/*Contains the Todo List*/}
        <div className="mx-auto my-40">
          <div className="min-w-[65vw] min-h-8 border-black border-2 flex flex-row justify-start flex-grow gap-0">
            <div className="min-w-[31vw] my-auto px-3 font-mono ">
              <b>Task</b>
            </div>
            <div className="flex justify-start my-auto font-mono px-2 min-w-[150px]">
              <b>Created On</b>
            </div>
            <div className="min-w-[10vw] flex justify-center pr-8">
              <b>Tag</b>
            </div>
            <div className="flex flex-row flex-grow gap-5 justify-center min-w-[18vw]">
              <b>Actions</b>
            </div>
          </div>
          <Todos userid={userId as string} />
        </div>
      </div>
    </div>
  );
}
