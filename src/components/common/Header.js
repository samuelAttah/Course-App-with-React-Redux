import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : null)}
        exact
      >
        Home
      </NavLink>
      {" | "}
      <NavLink
        to="/courses"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Courses
      </NavLink>
      {" | "}
      <NavLink
        to="/about"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        About
      </NavLink>
    </nav>
  );
};

export default Header;
