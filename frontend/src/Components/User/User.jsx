import { Typography } from "@mui/material";
import "./User.css";
import React from "react";
import { Link } from "react-router-dom";
const User = ({ userId, name, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <img src={avatar} alt={name} />
      <h3 className="Name">{name}</h3>
    </Link>
  );
};

export default User;
