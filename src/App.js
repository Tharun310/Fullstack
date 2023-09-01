// src/App.js
import React from 'react';
import Signup from './components/signup/SignUp';
import Login from './components/login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './components/profile';

import './App.css'; // You can define your responsive styles here

const App = () => {
  return (
    <div className="app">
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
