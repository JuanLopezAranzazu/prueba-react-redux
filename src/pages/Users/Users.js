import React, { useEffect, useState } from "react";
import "./Users.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";
import Button from "@mui/material/Button";
import Header from "./../../components/Header/Header";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (!user.isLogged) navigate("/login-user");
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/users")
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUsers(data);
            setError(null);
          });
        } else {
          setError("Respuesta de red OK pero respuesta HTTP no OK");
        }
      })
      .catch((error) => {
        setError("Hubo un problema con la petición Fetch:" + error.message);
      });
  }, []);

  if (error) return "Error! " + error;

  return (
    <>
      <Header />
      <div className="container-users">
        <h1>Users</h1>
        {users.map((user, index) => (
          <div className="user" key={index}>
            <h1>{user.name}</h1>
            <Button
              variant="contained"
              className="btn btn-primary btn-round"
              onClick={() => navigate("/tasks-user/" + user.id)}
            >
              Tasks
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
