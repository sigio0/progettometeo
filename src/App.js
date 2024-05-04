import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Results from "./Components/Results";
import { useState } from "react";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Results/:dinamicId" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
