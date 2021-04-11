// CSS
import './css/App.css';

// React
import React from 'react';

// Noodlewall navbar and footer as React components
import Navbar from './Navbar.js';
import Footer from './Footer.js';

// Noodlewall pages as React components
import Landing from './Landing.js';
import Browse from './Browse.js';
import Create from './Create.js';

// React Router
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

// Main App function
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/create/:type" component={Create}/>
          <Route path="/browse/:type" component={Browse}/>
          <Route path="/create">
            <Create/>
          </Route>
          <Route path="/browse" component={Browse}/>
          <Route path="/">
            <Landing/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
