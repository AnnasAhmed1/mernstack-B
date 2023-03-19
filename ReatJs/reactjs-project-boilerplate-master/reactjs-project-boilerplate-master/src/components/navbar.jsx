import React from "react";
// import "./navbar.scss";

const NavButton = ({ title }) => {
  return <button>{title}</button>;
};

const NavBarComp = () => {
  return (
    <div>
      <NavButton title={"LATEST"} />
      <NavButton title={"LATEST"} />
      <NavButton title={"LATEST"} />
      <NavButton title={"LATEST"} />
      <NavButton title={"LATEST"} />
    </div>
  );
};

export default NavBarComp;
