import logo from './images/noodlewall-logo-50p.png';
import './css/App.css';
import React from 'react';
import Navbar from './Navbar.js';
import Landing from './Landing.js';
import Footer from './Footer.js';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Landing/>
      <Footer/>
    </div>
  );
}

export default App;
