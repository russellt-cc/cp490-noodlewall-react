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

// Get local JSON file
import { noodleData, userData } from "./Data/noodleData";

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
  componentDidMount() {
    // Load data
    this.read();
  }
  // Methods to handle CRUD
  // Create
  create = (type, data) => {
    // Check whether we are using the API for data
    const { useAPI, apiNoodlePath, apiUserPath } = this.state;
    if (useAPI) {
      let apiPath = "product";
      // Check the type
      switch (type) {
        case "dream":
        case "event":
          apiPath = apiNoodlePath;
          break;
        case "user":
          apiPath = apiUserPath;
          break;
        default:
          alert("Error: Unknown Type");
          return;
      }
      // AJAX request to PHP server
      const { apiURL, apiCreate } = this.state;
      fetch(apiURL + apiPath + apiCreate, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("Create Succeeded");
            console.log("Outgoing data:");
            console.log(data);
            console.log("Incoming data:");
            console.log(result);
            // Reload data
            this.refresh();
            // Handle redirect
            let redirect;
            switch (type) {
              case "dream":
              case "event":
                // Redirect to noodle page
                redirect = "/details/" + result.noodleID;
                break;
              case "user":
                // Login to new account
                this.login(result.userID);
                // Redirect to user page
                redirect = "/user/" + result.userID;
                break;
              default:
                redirect = "/";
                break;
            }
            this.setState({ redirect });
          },
          (error) => {
            console.log("Create Failed");
            console.log("Outgoing data:");
            console.log(data);
            console.log("Incoming data:");
            console.log(error);
            alert(error.message);
          }
        );
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
      // Get noodles
      const { apiURL, apiRead } = this.state;
      let apiPath = "event/";
      fetch(apiURL + apiPath + apiRead)
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("Read Noodles Succeeded");
            console.log("Incoming data:");
            console.log(result);
            this.setState({
              noodlesAreCooked: true,
              noodleData: result.records,
            });
          },
          (error) => {
            console.log("Read Noodles Failed");
            console.log("Incoming data:");
            console.log(error);
            this.setState({
              noodlesAreCooked: true,
              error,
            });
          }
        );
      // Get users
      apiPath = "user/";
      fetch(apiURL + apiPath + apiRead)
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("Read Users Succeeded");
            console.log("Incoming data:");
            console.log(result);
            this.setState({
              noodlersAreLoaded: true,
              userData: result.records,
            });
          },
          (error) => {
            console.log("Read Users Failed");
            console.log("Incoming data:");
            console.log(error);
            this.setState({
              noodlersAreLoaded: true,
              error,
            });
          }
        );
    } else {
      // Get the JSON data and put in state
      this.setState({
        noodleData: noodleData,
        userData: userData,
        noodlesAreCooked: true,
        noodlersAreLoaded: true,
      });
    }
  };
  // Update
  update = (type, data) => {
    // Check whether we are using the API for data
    const { useAPI, apiNoodlePath, apiUserPath } = this.state;
    if (useAPI) {
      let apiPath = "product";
      // Check the type
      switch (type) {
        case "dream":
        case "event":
          apiPath = apiNoodlePath;
          break;
        case "user":
          apiPath = apiUserPath;
          break;
        default:
          alert("Error: Unknown Type");
          return;
      }
      // AJAX request to PHP server
      const { apiURL, apiUpdate } = this.state;
      fetch(apiURL + apiPath + apiUpdate, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            // Log data to console
            console.log("Update Succeeded");
            console.log("Outgoing Data:");
            console.log(data);
            console.log("Incoming Data:");
            console.log(result);
            // Reload data
            this.refresh();
            // Handle redirect
            let redirect;
            switch (type) {
              case "dream":
              case "event":
                // Redirect to noodle page
                redirect = "/details/" + data.noodleID;
                break;
              case "user":
                // Redirect to user page
                redirect = "/user/" + this.state.currentUserID;
                break;
              default:
                redirect = "/";
                break;
            }
            this.setState({ redirect });
          },
          (error) => {
            console.log("Update Failed");
            console.log("Incoming Data:");
            console.log(error);
            alert(error.message);
          }
        );
    } else {
      // Just show a message
      alert("You can't update data when using the static JSON data.");
    }
  };
  // Delete
  delete = (type, data) => {
    // Check whether we are using the API for data
    const { useAPI, apiNoodlePath, apiUserPath } = this.state;
    if (useAPI) {
      let apiPath = "product";
      // Check the type
      switch (type) {
        case "dream":
        case "event":
          apiPath = apiNoodlePath;
          break;
        case "user":
          apiPath = apiUserPath;
          break;
        default:
          alert("Error: Unknown Type");
          return;
      }
      // AJAX request to PHP server
      const { apiURL, apiDelete } = this.state;
      fetch(apiURL + apiPath + apiDelete, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(
        (result) => {
          console.log("Delete Succeeded");
          console.log("Outgoing Data:");
          console.log(data);
          console.log("Incoming Data:");
          console.log(result);
          // Reload data
          this.refresh();
          // Handle redirect
          let redirect;
          switch (type) {
            case "dream":
            case "event":
              // Redirect to user page
              redirect = "/user/" + this.state.currentUserID;
              break;
            case "user":
              // Logout
              this.logout();
              // Redirect to login
              redirect = "/login";
              break;
            default:
              redirect = "/";
              break;
          }
          this.setState({ redirect });
        },
        (error) => {
          console.log("Delete Failed");
          console.log("Incoming Data:");
          console.log(error);
          alert(error.message);
        }
      );
    } else {
      // Just show a message
      alert("You can't delete data when using the static JSON data.");
    }
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
    // Check for error
    if (error) {
      return <p>Error: {error.message} noodles</p>;
    } else if (!noodlesAreCooked) {
      return <p>Cooking Noodles...</p>;
    } else if (!noodlersAreLoaded) {
      return (
        <div>
          <p>Cooking Noodles...</p>
          <p>Searching for Noodlers...</p>
        </div>
      );
    } else {
      // Handle redirects
      const { redirect } = this.state;
      let redirectJSX = <></>;
      if (redirect) {
        redirectJSX = <Redirect to={redirect} />;
        this.setState({ redirect: null });
      }
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
            {redirectJSX}
            {/* Switch the main component based on the url */}
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
            {/* Show the Noodlewall footer */}
            <Footer />
          </Router>
        </div>
      );
    }
  }
}

export default App;
