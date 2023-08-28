import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from '../../components/login/index';
import Recording from '../../components/mainpage';

export default function index() {

  return (
    <Routes>
      <Route path="/mediacapturehub" element={<Recording />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
  
}
