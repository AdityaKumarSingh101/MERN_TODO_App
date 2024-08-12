import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Todos from "../Todos/Todos";
import { DashboardButton } from "../atoms/Buttons";
import Loading from "../atoms/Loading";

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

  const fetchDataURL = `http://localhost:3002/users/${userId}`;

  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: {
      first: "",
      last: "",
    },
    username: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // Fetch data from backend and set it to state
  async function fetchUserData() {
    setIsLoading(true);

    await axios
      .get(fetchDataURL)
      .then((res) => {
        const user = res.data;
        setData(user);
        setIsLoading(false);
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
        <h1 className="mt-1 ml-3 font-mono font-bold text-lg">
          {!isLoading ? (
            <span>Hello, {userData.name.first}</span>
          ) : (
            <Loading text={"Loading Data..."} />
          )}
        </h1>
        <DashboardButton type="Logout" onClick={handleLogout} />
      </div>
      {/*Contains the rest of dashboard*/}
      <div className="flex flex-row">
        {/*Contains the Todo List*/}
        <div className="  flex flex-col mx-auto my-10">
          <div className="mt-10">
            <Todos userid={userId as string} />
          </div>
        </div>
      </div>
    </div>
  );
}
