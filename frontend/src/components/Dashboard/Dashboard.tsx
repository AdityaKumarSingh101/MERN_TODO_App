import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Todos from "../Todos/Todos";
import { DashboardButton } from "../atoms/Buttons";

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
        <DashboardButton type="Logout" onClick={handleLogout} />
      </div>
      {/*Contains the rest of dashboard*/}
      <div className="flex flex-row">
        {/*Contains the Todo List*/}
        <div className="mx-auto my-10">
          <Todos userid={userId as string} />
        </div>
      </div>
    </div>
  );
}
