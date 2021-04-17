//https://www.freecodecamp.org/news/a-complete-beginners-guide-to-react-router-include-router-hooks/
//https://rapidapi.com/blog/how-to-use-an-api-with-react/

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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ScrollToTop from "./Common/ScrollToTop.js";

// Get local JSON file
import { noodleData, userData } from "./Data/noodleData.js";

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
      currentUserID: 2,
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
            console.log(result);
            // Reload data
            this.read();
            // Redirect to user page
            const redirect = "/user/" + this.state.currentUserID;
            // Redirect to noodle page
            // const redirect = "/details/" + result.noodleID;
            this.setState({ redirect: redirect });
          },
          (error) => {
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
            console.log(result);
            this.setState({
              noodlesAreCooked: true,
              noodleData: result.records,
            });
          },
          (error) => {
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
            console.log(result);
            this.setState({
              noodlersAreLoaded: true,
              userData: result.records,
            });
          },
          (error) => {
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
            console.log(result);
            // Reload data
            this.read();
            // Redirect to user page
            const redirect = "/user/" + this.state.currentUserID;
            // Redirect to noodle page
            // const redirect = "/details/" + result.noodleID;
            this.setState({ redirect: redirect });
          },
          (error) => {
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
          console.log(result);
          // Reload data
          this.read();
          // Redirect to user page
          const redirect = "/user/" + this.state.currentUserID;
          this.setState({ redirect: redirect });
        },
        (error) => {
          console.log(error);
          alert(error.message);
        }
      );
    } else {
      // Just show a message
      alert("You can't delete data when using the static JSON data.");
    }
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
            <Navbar userData={userData} userID={currentUserID} />
            {/* Element to redirect if needed */}
            {redirectJSX}
            {/* Switch the main component based on the url */}
            <Switch>
              {/* ------------------------------------------------------------ */}
              {/* Create Module */}
              <Route
                path="/edit/:id"
                render={(props) => (
                  <Create
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
                    currentUserID={currentUserID}
                    onDelete={this.delete}
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
                    currentUserID={currentUserID}
                    onDelete={this.delete}
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
