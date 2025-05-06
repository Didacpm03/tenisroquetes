import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/new-arrivals" element={<CategoryPage />} />
        <Route path="/sale" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;