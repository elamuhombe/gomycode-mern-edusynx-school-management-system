import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';

import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Register from './pages/Register';


const App: React.FC = () => {
  return (
    <Router>
      <div className="m-4 font-sans">
      
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
