import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Services from './pages/Features';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import ResetPassword from './components/Login/ResetPassword';
import Register from './pages/Register';
import FAQ from './pages/support/FAQ';
import Documentation from './pages/support/Documentation';
import { GlobalStateProvider } from './context/useGlobalState';


const App: React.FC = () => {
  return (
    <GlobalStateProvider>
    <Router>
      <div className="m-4 font-sans">
      
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path ="/reset-password" element={<ResetPassword/>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Features" element={<Services />} />
          <Route path="/support/FAQ" element ={<FAQ />} />
          <Route path="/support/Documentation" element ={<Documentation/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      
      </div>
    </Router>
    </GlobalStateProvider>
  );
};

export default App;
