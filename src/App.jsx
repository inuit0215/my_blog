import React from "react";
import EditPage from "./pages/EditPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/edit" element={<EditPage />}/>
          <Route path="/detail" element={<DetailPage />}/>
      </Routes>
    </BrowserRouter>
  );
}
