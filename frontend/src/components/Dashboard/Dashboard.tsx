import axios from "axios";
import { useEffect, useState } from "react";
import FetchAllTodos from "../Todos/FetchTodos/FetchTodos";

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

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        Name: {`${userData.name.first} ${userData.name.last}`}
        Email: {userData.email}
        Username: {userData.username}
        <FetchAllTodos userid={userId as string} />
      </div>
    </div>
  );
}
