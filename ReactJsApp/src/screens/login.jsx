import axios from "axios";
import React, { useState } from "react";
import { address } from "../routes";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginFun = (email, password) => {
    axios
      .post(`${address}/login`, {
        email,
        password,
      })
      .then(function (response) {
        console.log(response, "response login");
      })
      .catch(function (error) {
        console.log(error, "error login");
      });
  };

  return (
    <>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        placeholder="enter email"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="enter password"
      />
      <button
        onClick={() => {
          loginFun(email, password);
        }}
      >
        login
      </button>
    </>
  );
};

export default Login;
