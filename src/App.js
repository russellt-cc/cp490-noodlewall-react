//https://www.freecodecamp.org/news/a-complete-beginners-guide-to-react-router-include-router-hooks/
//https://rapidapi.com/blog/how-to-use-an-api-with-react/

// CSS
import "./App.css";

// React
import React from "react";

// Noodlewall navbar, main, and footer as React components
import Navbar from "./Common/Navbar";
import Main from "./Main";
import Footer from "./Common/Footer";

// React Router
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import ScrollToTop from "./Common/ScrollToTop";

// CRUD functions
import dataCreate from "./Data/dataCreate";
import dataRead from "./Data/dataRead";
import dataUpdate from "./Data/dataUpdate";
import dataDelete from "./Data/dataDelete";

// Main App class
// Uses React Router to show different components
class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      error: null,
      noodlesAreCooked: false,
      noodlersAreLoaded: false,
      noodleData: [],
      userData: [],
      currentUserID: null,
      useAPI: true,
      apiURL: "http://www.gatkinson.site/noodlewall/",
      apiCreate: "create.php",
      apiRead: "read.php",
      apiUpdate: "update.php",
      apiDelete: "delete.php",
      apiNoodlePath: "event/",
      apiUserPath: "user/",
      redirect: null,
    };
  }

  // Component did mount lifecycle method
  // Runs when the app is mounted in the DOM
  componentDidMount() {
    // Load data
    this.read();
  }

  // Return state method so we can update app state in child components
  // Pass this method as a parameter to components
  returnState = (newState) => {
    this.setState(newState);
  };

  // Methods to handle CRUD

  // Create
  create = (type, data) => {
    // Get configuration from state
    const {
      useAPI,
      apiNoodlePath,
      apiUserPath,
      apiURL,
      apiCreate,
    } = this.state;
    const apiConfig = { useAPI, apiNoodlePath, apiUserPath, apiURL, apiCreate };
    // Create data using component function
    dataCreate(
      type,
      data,
      apiConfig,
      this.returnState,
      this.refresh,
      this.login
    );
  };

  // Read
  read = () => {
    // Get configuration from state
    const { useAPI, apiURL, apiRead } = this.state;
    const apiConfig = { useAPI, apiURL, apiRead };
    // Load data using component function
    dataRead(apiConfig, this.returnState);
  };

  // Update
  update = (type, data) => {
    // Get configuration from state
    const {
      useAPI,
      apiNoodlePath,
      apiUserPath,
      apiURL,
      apiUpdate,
      currentUserID,
    } = this.state;
    const apiConfig = { useAPI, apiNoodlePath, apiUserPath, apiURL, apiUpdate };
    // Update data using component function
    dataUpdate(
      type,
      data,
      apiConfig,
      this.returnState,
      this.refresh,
      currentUserID
    );
  };

  // Delete
  delete = (type, data) => {
    // Get configuration from state
    const {
      useAPI,
      apiNoodlePath,
      apiUserPath,
      apiURL,
      apiDelete,
      currentUserID,
    } = this.state;
    const apiConfig = { useAPI, apiNoodlePath, apiUserPath, apiURL, apiDelete };
    // Delete data using component function
    dataDelete(
      type,
      data,
      apiConfig,
      this.returnState,
      this.refresh,
      this.logout,
      currentUserID
    );
  };

  // Refresh
  refresh = () => {
    this.setState({
      noodlesAreCooked: false,
      noodlersAreLoaded: false,
    });
    this.read();
  };

  // Login
  login = (currentUserID) => {
    const redirect = "/user/" + currentUserID;
    this.setState({ currentUserID, redirect });
  };

  // Logout
  logout = () => {
    const currentUserID = null;
    const redirect = "/login";
    this.setState({ currentUserID, redirect });
  };

  // Render method
  render() {
    // Destructure the props and state
    const {
      error,
      noodlesAreCooked,
      noodlersAreLoaded,
      noodleData,
      userData,
      currentUserID,
    } = this.state;
    // Handle redirects
    const redirect = () => {
      const { redirect } = this.state;
      let redirectJSX = <></>;
      if (redirect) {
        redirectJSX = <Redirect to={redirect} />;
        this.setState({ redirect: null });
      }
      return redirectJSX;
    };
    // Return the Noodlewall app
    return (
      // Return the main Noodlewall app
      <div className="App">
        {/* Router component to use React Router */}
        <Router>
          {/* Scroll to top */}
          <ScrollToTop />
          {/* Show the Noodlewall navbar */}
          {/* Replace the static user id with
            user id from session */}
          <Navbar
            userData={userData}
            userID={currentUserID}
            onRefresh={this.refresh}
            onLogout={this.logout}
          />
          {/* Element to redirect if needed */}
          {redirect()}
          {/* Switch the main component based on the url */}
          <Main
            error={error}
            noodlesAreCooked={noodlesAreCooked}
            noodlersAreLoaded={noodlersAreLoaded}
            noodleData={noodleData}
            userData={userData}
            currentUserID={currentUserID}
            onCreate={this.create}
            onUpdate={this.update}
            onDelete={this.delete}
            onLogin={this.login}
          />
          {/* Show the Noodlewall footer */}
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
