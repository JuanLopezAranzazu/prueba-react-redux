import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, selectUser } from "./../../features/userSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (user.isLogged) navigate("/");
  }, []);

  const handleLogin = () => {
    const credentials = {
      username,
      password,
    };

    fetch("http://localhost:3001/api/v1/auth/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            dispatch(login(data));
            setError(null);
            navigate("/");
          });
        } else {
          setError("Respuesta de red OK pero respuesta HTTP no OK");
        }
      })
      .catch((error) => {
        setError("Hubo un problema con la petición Fetch:" + error.message);
      });
  };

  if (error) return "Error! " + error;

  return (
    <div className="container-login">
      <div className="login">
        <h1>Login user</h1>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleLogin()}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
