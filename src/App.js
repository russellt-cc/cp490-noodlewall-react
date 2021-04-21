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
      currentUser: {},
      redirectPath: null,
    };
  }

  // Return state method so we can update app state in child components
  // Pass this method as a parameter to components
  returnState = (newState) => {
    this.setState(newState);
  };

  // Methods to handle CRUD

  // Create
  // Return promise
  create = (type, data) => {
    // Create data using component function
    return dataCreate(type, data, this.returnState, this.login);
  };

  // Read
  // Return promise
  read = (type) => {
    // Load data using component function
    return dataRead(type);
  };

  // Update
  // Return promise
  update = (type, data) => {
    // Get configuration from state
    const { currentUser } = this.state;
    // Update data using component function
    return dataUpdate(type, data, this.returnState, currentUser);
  };

  // Delete
  // Return promise
  delete = (type, data) => {
    // Get configuration from state
    const { currentUser } = this.state;
    // Delete data using component function
    return dataDelete(type, data, this.returnState, this.logout, currentUser);
  };

  // Login
  login = (currentUser, redirectPath, redirectComponent, redirectID) => {
    // Check for specified redirect
    if (!redirectPath) {
      if (redirectComponent) {
        // Set redirect
        if (redirectID) {
          // Redirect to a page with an id
          redirectPath = "/" + redirectComponent + "/" + redirectID;
        } else {
          // Redirect to a page
          redirectPath = "/" + redirectComponent;
        }
      } else {
        // Set default redirect on login
        redirectPath = "/";
      }
    }
    this.setState({ currentUser, redirectPath });
  };

  // Logout
  logout = (redirectPath, redirectComponent, redirectID) => {
    // Set current ID to null to logout
    const currentUser = {};
    // Check for specified redirect
    if (!redirectPath) {
      if (redirectComponent) {
        // Set redirect
        if (redirectID) {
          // Redirect to a page with an id
          redirectPath = "/" + redirectComponent + "/" + redirectID;
        } else {
          // Redirect to a page
          redirectPath = "/" + redirectComponent;
        }
      } else {
        // Set default redirect on logout
        redirectPath = null;
      }
    }
    // Set state to reflect the logout and redirect
    this.setState({ currentUser, redirectPath });
  };

  // Render method
  render() {
    // Destructure the props and state
    const { currentUser } = this.state;
    // Handle redirects
    const redirect = () => {
      const { redirectPath } = this.state;
      let redirectJSX = <></>;
      if (redirectPath) {
        redirectJSX = <Redirect to={redirectPath} />;
        this.setState({ redirectPath: null });
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
            currentUser={currentUser}
            onRefresh={this.refresh}
            onLogout={this.logout}
            returnState={this.returnState}
          />
          {/* Element to redirect if needed */}
          {redirect()}
          {/* Switch the main component based on the url */}
          <Main
            currentUser={currentUser}
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
