import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <button onClick={() => navigate("/home")}>
        <i className="fa-solid fa-house-user"></i>
      </button>

      <button onClick={() => navigate("/matches")}>
        <i className="fa-regular fa-heart "></i>
      </button>

      <button onClick={() => navigate("/home")}>
        <i className="fa-solid fa-gear "></i>
      </button>
    </div>
  );
};

export default Navbar;
