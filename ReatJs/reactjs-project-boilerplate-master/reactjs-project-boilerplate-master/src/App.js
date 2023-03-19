import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarComp from "./components/navbar";

// Pages

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBarComp />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
