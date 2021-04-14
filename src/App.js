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

// Get local JSON file
import { noodleData, userData } from "./noodleData.js";

// Main App class
// Uses React Router to show different components
class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      error: null,
      isLoaded: false,
      noodleData: [],
      userData: [],
    };
  }
  componentDidMount() {
    // Configure whether we are using the API for data
    const useAPI = false;
    const apiURL = "http://www.gatkinson.site/noodlewall/product/read.php";
    if (useAPI) {
      // AJAX request to PHP server
      fetch(apiURL)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              noodleData: result.events,
              userData: result.users,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    } else {
      // Get the JSON data and put in state
      this.setState({
        noodleData: noodleData,
        userData: userData,
        isLoaded: true,
      });
    }
  }
  render() {
    // Destructure the props and state
    const { error, isLoaded, noodleData, userData } = this.state;
    // Check for error
    if (error) {
      return <p>Error: {error.message} noodles</p>;
    } else if (!isLoaded) {
      return <p>Cooking Noodles...</p>;
    } else {
      return (
        // Return the main Noodlewall app
        <div className="App">
          {/* Router component to use React Router */}
          <Router>
            {/* Show the Noodlewall navbar */}
            {/* Replace the static user id with
            user id from session */}
            <Navbar userData={userData} userID={1} />
            {/* Switch the main component based on the url */}
            <Switch>
              {/* ------------------------------------------------------------ */}
              {/* Create Module */}
              <Route path="/create/:type" component={Create} />
              <Route path="/create" component={Create} />
              {/* ------------------------------------------------------------ */}
              {/* User Module */}
              <Route
                path="/user/:id/:action"
                render={(props) => (
                  <User
                    {...props}
                    noodleData={noodleData}
                    userData={userData}
                  />
                )}
              />
              <Route
                path="/user/:id"
                render={(props) => (
                  <User
                    {...props}
                    noodleData={noodleData}
                    userData={userData}
                  />
                )}
              />
              {/* ------------------------------------------------------------ */}
              {/* Details Module */}
              <Route
                path="/details/:filterType/:id"
                render={(props) => (
                  <Details
                    {...props}
                    noodleData={noodleData}
                    userData={userData}
                  />
                )}
              />
              <Route
                path="/details/:id"
                render={(props) => (
                  <Details
                    {...props}
                    noodleData={noodleData}
                    userData={userData}
                  />
                )}
              />
              {/* ------------------------------------------------------------ */}
              {/* Browse Module */}
              <Route
                path="/browse/:type/:tag"
                render={(props) => (
                  <Browse
                    {...props}
                    noodleData={noodleData}
                    userData={userData}
                  />
                )}
              />
              <Route
                path="/browse/:type"
                render={(props) => (
                  <Browse
                    {...props}
                    noodleData={noodleData}
                    userData={userData}
                  />
                )}
              />
              <Route
                path="/browse"
                render={(props) => (
                  <Browse
                    {...props}
                    noodleData={noodleData}
                    userData={userData}
                  />
                )}
              />
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
}

export default App;
