//https://www.freecodecamp.org/news/a-complete-beginners-guide-to-react-router-include-router-hooks/
//https://rapidapi.com/blog/how-to-use-an-api-with-react/

// CSS
import "./App.css";

// React
import React from "react";

// Noodlewall navbar and footer as React components
import Navbar from "./Common/Navbar";
import Footer from "./Common/Footer";

// Noodlewall pages as React components
import Landing from "./Landing/Landing";
// User Story 1: Login
import LoginUser from "./User/LoginUser";
// User Story 2: Register and Edit Own Profile
import RegisterOrEditUser from "./User/RegisterOrEditUser";
// User Stories 3 and 9: Browse Events and Dreams
import BrowseNoodles from "./Browse/BrowseNoodles";
// User Stories 4 and 8: View Event or Dream Details
import NoodleDetails from "./Details/NoodleDetails";
// User Story 5: Buy Ticket
// buy goes here
// User Stories 6, 7, 10, and 13: Create Event, Create Dream, Edit Event, Edit Dream
import CreateOrEditNoodle from "./Create/CreateOrEditNoodle";
// User Stories 11 and 12: View Other Profile, View Own Profile
import UserProfile from "./User/UserProfile";

// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
    const { noodleData, userData, currentUserID } = this.state;
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
    // The main section of the app
    const main = () => {
      const { error, noodlesAreCooked, noodlersAreLoaded } = this.state;
      // Check for error
      if (error) {
        // Show error message
        return (
          <main>
            <p>Error: {error.message} noodles</p>
          </main>
        );
      } else if (!noodlesAreCooked) {
        // Show loading message
        return (
          <main>
            <p>Cooking Noodles...</p>
          </main>
        );
      } else if (!noodlersAreLoaded) {
        // Show loading message
        return (
          <main>
            <div>
              <p>Cooking Noodles...</p>
              <p>Searching for Noodlers...</p>
            </div>
          </main>
        );
      } else {
        // Switch the main component based on the url
        return (
          <Switch>
            {/* ------------------------------------------------------------ */}
            {/* Registration or Edit User Module */}
            <Route
              path="/register"
              render={(props) => (
                <RegisterOrEditUser
                  {...props}
                  currentUserID={undefined}
                  onCreate={this.create}
                />
              )}
            />
            <Route
              path="/user/edit"
              render={(props) => (
                <RegisterOrEditUser
                  {...props}
                  userData={userData}
                  currentUserID={currentUserID}
                  onUpdate={this.update}
                  onDelete={this.delete}
                />
              )}
            />
            {/* ------------------------------------------------------------ */}
            {/* Login User Module */}
            <Route
              path="/login"
              render={(props) => (
                <LoginUser
                  {...props}
                  userData={userData}
                  onLogin={this.login}
                />
              )}
            />
            {/* ------------------------------------------------------------ */}
            {/* Create or Edit Noodle Module */}
            <Route
              path="/details/:id/edit"
              render={(props) => (
                <CreateOrEditNoodle
                  {...props}
                  userData={userData}
                  currentUserID={currentUserID}
                  onUpdate={this.update}
                  noodleData={noodleData}
                />
              )}
            />
            <Route
              path="/create/:type"
              render={(props) => (
                <CreateOrEditNoodle
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
                <CreateOrEditNoodle
                  {...props}
                  userData={userData}
                  currentUserID={currentUserID}
                  onCreate={this.create}
                />
              )}
            />
            {/* ------------------------------------------------------------ */}
            {/* User Profile Module */}
            <Route
              path="/user/:id/:action"
              render={(props) => (
                <UserProfile
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
                <UserProfile
                  {...props}
                  noodleData={noodleData}
                  userData={userData}
                  currentUserID={currentUserID}
                />
              )}
            />
            <Route
              path="/user"
              render={(props) => (
                <UserProfile
                  {...props}
                  noodleData={noodleData}
                  userData={userData}
                  currentUserID={currentUserID}
                />
              )}
            />
            {/* ------------------------------------------------------------ */}
            {/* Noodle Details Module */}
            <Route
              path="/details/:filterType/:id"
              render={(props) => (
                <NoodleDetails
                  {...props}
                  noodleData={noodleData}
                  userData={userData}
                  currentUserID={currentUserID}
                  onDelete={this.delete}
                />
              )}
            />
            <Route
              path="/details/:id"
              render={(props) => (
                <NoodleDetails
                  {...props}
                  noodleData={noodleData}
                  userData={userData}
                  currentUserID={currentUserID}
                  onDelete={this.delete}
                />
              )}
            />
            {/* ------------------------------------------------------------ */}
            {/* Browse Noodles Module */}
            <Route
              path="/browse/:type/:tag"
              render={(props) => (
                <BrowseNoodles
                  {...props}
                  noodleData={noodleData}
                  userData={userData}
                />
              )}
            />
            <Route
              path="/browse/:type"
              render={(props) => (
                <BrowseNoodles
                  {...props}
                  noodleData={noodleData}
                  userData={userData}
                />
              )}
            />
            <Route
              path="/browse"
              render={(props) => (
                <BrowseNoodles
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
        );
      }
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
          {main()}
          {/* Show the Noodlewall footer */}
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
