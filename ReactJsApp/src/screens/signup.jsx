import axios from "axios";
import React, { useState } from "react";
import { address } from "../routes";

const Signup = () => {
  const [contactNumber, setContactNumber] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signupFun = (firstName, lastName, contactNumber, email, password) => {
    axios
      .post(`${address}/signup`, {
        firstName,
        lastName,
        contactNumber,
        email,
        password,
      })
      .then(function (response) {
        console.log(response, "response signup");
      })
      .catch(function (error) {
        console.log(error, "error signup");
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
      <input
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        type="text"
        placeholder="enter your FirstName"
      />
      <input
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        type="text"
        placeholder="enter your last Name"
      />
      <input
        onChange={(e) => {
          setContactNumber(e.target.value);
        }}
        type="number"
        placeholder="enter your Contact number"
      />
      <button
        onClick={() => {
          signupFun(firstName, lastName, contactNumber, email, password);
        }}
      >
        Sign up
      </button>
    </>
  );
};

export default Signup;
