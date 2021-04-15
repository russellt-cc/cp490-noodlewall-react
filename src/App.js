//https://www.freecodecamp.org/news/a-complete-beginners-guide-to-react-router-include-router-hooks/

// CSS
import "./App.css";

// React
import React from "react";

// Noodlewall navbar and footer as React components
import Navbar from "./Common/Navbar.js";
import Footer from "./Common/Footer.js";

// Noodlewall pages as React components
import Landing from "./Landing/Landing.js";
import Browse from "./Browse/Browse.js";
import Details from "./Details/Details.js";
import Create from "./Create/Create.js";
import User from "./User/User.js";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Get local JSON file
import { noodleData, userData } from "./Common/noodleData.js";

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
      currentUserID: 1,
      useAPI: true,
      apiURL: "http://www.gatkinson.site/noodlewall/product/",
      apiCreate: "create.php",
      apiRead: "read.php",
      apiUpdate: "update.php",
      apiDelete: "delete.php",
    };
  }
  componentDidMount() {
    // Load data
    this.read();
  }
  // Methods to handle CRUD
  // Create

  create = (type, data) => {
    // Check whether we are using the API for data
    const { useAPI } = this.state;
    if (useAPI) {
      // Check the type
      switch (type) {
        case "dream":
        case "event":
          // AJAX request to PHP server
          const { apiURL, apiCreate } = this.state;
          fetch(apiURL + apiCreate, {
            method: "POST",
            body: JSON.stringify(data),
          }).then(
            (result) => {
              console.log(result);
            },
            (error) => {
              console.log(error);
            }
          );
          break;
        default:
          alert("Error: Unknown Type");
          break;
      }
    } else {
      // Just show a message
      alert("You can't create data when using the static JSON data.");
    }
  };

  // Read
  read = () => {
    // Check whether we are using the API for data
    const { useAPI } = this.state;
    if (useAPI) {
      // AJAX request to PHP server
      const { apiURL, apiRead } = this.state;
      fetch(apiURL + apiRead)
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
  };
  // Update

  // Delete

  // Render method
  render() {
    // Destructure the props and state
    const { error, isLoaded, noodleData, userData, currentUserID } = this.state;
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
            <Navbar userData={userData} userID={currentUserID} />
            {/* Switch the main component based on the url */}
            <Switch>
              {/* ------------------------------------------------------------ */}
              {/* Create Module */}
              <Route
                path="/create/:type"
                render={(props) => (
                  <Create
                    {...props}
                    userData={userData}
                    currentUserID={currentUserID}
                    onCreate={this.create}
                  />
                )}
              />
              <Route
                path="/create"
                render={(props) => (
                  <Create
                    {...props}
                    userData={userData}
                    currentUserID={currentUserID}
                    onCreate={this.create}
                  />
                )}
              />
              {/* ------------------------------------------------------------ */}
              {/* User Module */}
              <Route
                path="/user/:id/:action"
                render={(props) => (
                  <User
                    {...props}
                    noodleData={noodleData}
                    userData={userData}
                    currentUserID={currentUserID}
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
                    currentUserID={currentUserID}
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
