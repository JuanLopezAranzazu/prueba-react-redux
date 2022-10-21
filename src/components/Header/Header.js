import React from "react";
import "./Header.css";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./../../features/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login-user");
  };

  return (
    <div className="container-header">
      <div className="header">
        <h1>React redux</h1>
        <div className="header-options">
          <Button variant="contained" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="contained" onClick={() => logoutHandler()}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
