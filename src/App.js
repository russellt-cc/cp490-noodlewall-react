//https://www.freecodecamp.org/news/a-complete-beginners-guide-to-react-router-include-router-hooks/

// CSS
import './css/App.css';

// React
import React from 'react';

// Noodlewall navbar and footer as React components
import Navbar from './Navbar.js';
import Footer from './Footer.js';

// Noodlewall pages as React components
import Landing from './Landing/Landing.js';
import Browse from './Browse/Browse.js';
import Details from './Details/Details.js';
import Create from './Create/Create.js';

// React Router
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

// Main App function
// Uses React Router to show different components
function App() {
  return (
    <div className="App">
      {/* Router component to use React Router */}
      <Router>
        {/* Show the Noodlewall navbar */}
        <Navbar/>
        {/* Switch the main component based on the url */}
        <Switch>
          {/* if the url goes to create with a type, load the create component */}
          <Route path="/create/:type" component={Create}/>
          {/* if the url goes to details with an ID, load the details component */}
          <Route path="/details/:id" component={Details}/>
          {/* if the url goes to browse with a type, load the browse component */}
          <Route path="/browse/:type" component={Browse}/>
          {/* if the url goes to create, load the create component */}
          <Route path="/create">
            <Create/>
          </Route>
          {/* if the url goes to browse, load the browse component */}
          <Route path="/browse" component={Browse}/>
          {/* if the url goes to root, load the landing page */}
          <Route path="/">
            <Landing/>
          </Route>
        </Switch>
        {/* Show the Noodlewall footer */}
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
