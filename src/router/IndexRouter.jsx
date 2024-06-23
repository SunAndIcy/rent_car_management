import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../views/login/Login';
import CarBox from '../views/CarBox';

export default function IndexRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedRoute />} />
      </Routes>
    </Router>
  );
}

function ProtectedRoute() {
  // 检查是否已经登录
  const isLoggedIn = localStorage.getItem("token");

  return isLoggedIn ? <CarBox /> : <Navigate to="/login" />;
}