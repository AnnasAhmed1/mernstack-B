import React from "react";

const Button = ({ value, event }) => {
  return <button onClick={event}>{value}</button>;
};

export default Button;
