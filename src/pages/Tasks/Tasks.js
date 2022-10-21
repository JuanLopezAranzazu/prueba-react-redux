import React, { useState, useEffect } from "react";
import "./Tasks.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";
import Header from "./../../components/Header/Header";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (!user.isLogged) navigate("/login-user");
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/users/" + userId)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            const { tasks } = data;
            setTasks(tasks);
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
      <div className="container-tasks">
        {user && <h1>Tasks created by userId {userId}</h1>}
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <h1>{task.title}</h1>
            <p>{task.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tasks;
