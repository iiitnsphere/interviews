import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor";
import Homepage from "./components/Homepage";
import "./styles.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/create" element={<Editor />} />
    </Routes>
  );
}

export default App;
