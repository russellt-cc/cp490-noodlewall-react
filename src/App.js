//https://www.freecodecamp.org/news/a-complete-beginners-guide-to-react-router-include-router-hooks/

// CSS
import "./css/App.css";

// React
import React from "react";

// Noodlewall navbar and footer as React components
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

// Noodlewall pages as React components
import Landing from "./Landing/Landing.js";
import Browse from "./Browse/Browse.js";
import Details from "./Details/Details.js";
import Create from "./Create/Create.js";
import User from "./User/User.js";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Main App class
// Uses React Router to show different components
class App extends React.Component {
  render() {
    // Return the main Noodlewall app
    return (
      <div className="App">
        {/* Router component to use React Router */}
        <Router>
          {/* Show the Noodlewall navbar */}
          <Navbar />
          {/* Switch the main component based on the url */}
          <Switch>
            {/* ------------------------------------------------------------ */}
            {/* Create Module */}
            <Route path="/create/:type" component={Create} />
            <Route path="/create" component={Create} />
            {/* ------------------------------------------------------------ */}
            {/* User Module */}
            <Route path="/user/:id/:action" component={User} />
            <Route path="/user/:id" component={User} />
            {/* ------------------------------------------------------------ */}
            {/* Details Module */}
            <Route path="/details/:filterType/:id" component={Details} />
            <Route path="/details/:id" component={Details} />
            {/* ------------------------------------------------------------ */}
            {/* Browse Module */}
            <Route path="/browse/:type/:tag" component={Browse} />
            <Route path="/browse/:type" component={Browse} />
            <Route path="/browse" component={Browse} />
            {/* ------------------------------------------------------------ */}
            {/* Landing Module */}
            <Route path="/">
              <Landing />
            </Route>
            {/* ------------------------------------------------------------ */}
          </Switch>
          {/* Show the Noodlewall footer */}
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
