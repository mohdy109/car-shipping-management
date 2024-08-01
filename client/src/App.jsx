// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import AddCarScreen from './screens/AddCarScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import SignUpScreen from './screens/SignUpScreen.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/add-car" element={<AddCarScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
