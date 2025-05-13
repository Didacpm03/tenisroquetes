import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import SizeGuide from './pages/SizeGuide';
import Jordan4Page from './pages/jordan4';

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
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<FAQ />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/jordan4" element={<Jordan4Page />} />
      </Routes>
    </Router>
  );
}

export default App;