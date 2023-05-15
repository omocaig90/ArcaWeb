import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormImbarca from './pages/FormImbarca';
import FormSbarca from './pages/FormSbarca';
//import Navbar from './components/Navbar';
import Home from './pages/Home';
import React from 'react';
import Login from './pages/Login';
//import 'bootstrap-icons/font/bootstrap-icons.css';


const App = () => {

  return (
    <Router>
      <div className="App">


        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Home" element={<Home />} />
          <Route path="Imbarca" element={<FormImbarca />} />
          <Route path="Sbarca" element={<FormSbarca />} />
        </Routes>

      </div >
    </Router>

  );
};

export default App
