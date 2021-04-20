import logo from "../Images/noodlewall-logo-50p.png";
import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import usericon from "../Images/usericon.png";

class Navbar extends React.Component {
  // Get current path
  getCurrentPath = () => {
    const splitURL = window.location.href.split("/");
    let currentPath = "/";
    switch (splitURL.length) {
      case 4:
        currentPath = "/" + splitURL[3];
        break;
      case 5:
        currentPath = "/" + splitURL[3] + "/" + splitURL[4];
        break;
      case 6:
        currentPath = "/" + splitURL[3] + "/" + splitURL[5];
        break;
      default:
        break;
    }
    return currentPath;
  };
  // Render method
  render() {
    // Destructure props to get data
    const {
      onRefresh: refresh,
      onLogout: logout,
      userData,
      userID,
      returnState,
    } = this.props;
    let userFirstName,
      userLastName,
      userImage = undefined;
    // If user is signed in get the current user data
    // Destructure the current user data
    // If not signed in leave as undefined
    if (userID) {
      const thisUser = userData.filter((user) => {
        return parseInt(user.userID) === parseInt(userID);
      })[0];
      if (thisUser) {
        userFirstName = thisUser.userFirstName;
        userLastName = thisUser.userLastName;
        userImage = thisUser.userImage;
      }
    }
    // Create the create drop menu
    const createDrop = userID ? (
      <div id="create_drop" className="drop">
        <div id="create_dream_button" className="create_drop_button">
          <span className="dreams_color_text">
            <Link to="/create/dream">Create a Dream</Link>
          </span>
        </div>
        <div id="create_event_button" className="create_drop_button">
          <span className="events_color_text">
            <Link to="/create/event">Create an Event</Link>
          </span>
        </div>
      </div>
    ) : (
      <div id="loggedout_create_drop" className="drop">
        <div>
          <Link className="noodle_button" to="/login/create">
            You must log in to create a dream or event.
          </Link>
        </div>
      </div>
    );
    // Create the user menu
    const userDrop = userID ? (
      <div id="user_drop" className="drop">
        <div className="user_drop_column" id="user_drop_left">
          <h3>Tickets</h3>
        </div>
        <div className="user_drop_column" id="user_drop_middle">
          <h3>Following</h3>
        </div>
        <div className="user_drop_column" id="user_drop_right">
          <h3>Your Account</h3>
          <div>
            <Link to="/user">
              <img
                src={userImage ? decodeURIComponent(userImage) : usericon}
                alt="User"
              ></img>
              <h4>
                {userFirstName} {userLastName}
              </h4>
            </Link>
          </div>
          <div>
            <Link className="noodle_button" to="/manage">
              Manage Your Account
            </Link>
            <Link className="noodle_button" to="/dashboard">
              View Dashboard
            </Link>
            <button className="noodle_button" onClick={() => logout()}>
              Sign Out
            </button>
          </div>
          <div>
            <button className="noodle_button" onClick={() => refresh()}>
              Refresh Noodlewall
            </button>
          </div>
          <div>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
    ) : (
      <div id="login_drop" className="drop">
        <div>
          <button
            className="noodle_button"
            onClick={() => {
              const redirectPath = "/login" + this.getCurrentPath();
              returnState({ redirectPath });
            }}
          >
            Login to Noodlewall
          </button>
        </div>
        <div>
          <button className="noodle_button" onClick={() => refresh()}>
            Refresh Noodlewall
          </button>
        </div>
        <div>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    );
    // Return the Noodlewall navbar
    return (
      <nav>
        {/* left div has the logo and search box */}
        <div id="nav_left" className="nav_column">
          <Link to="/">
            <img id="nav_logo" src={logo} height="50px" alt="Noodlewall Logo" />
          </Link>
          <form action="/browse" autoComplete="off">
            <input type="search" id="mySearch" name="q" placeholder="Search" />
          </form>
        </div>
        {/* right div has the browse, create, and user buttons */}
        <div id="nav_right" className="nav_column">
          <ul>
            <li id="browse_button" className="drop_button">
              <button>
                <strong>Browse</strong>
              </button>
              <div id="browse_drop" className="drop">
                <div id="browse_dreams_button" className="browse_drop_button">
                  <span className="dreams_color_text">
                    <Link to="/browse/dreams">Browse Dreams</Link>
                  </span>
                </div>
                <div id="browse_all_button" className="browse_drop_button">
                  <span>
                    <Link to="/browse/all">Browse All</Link>
                  </span>
                </div>
                <div id="browse_events_button" className="browse_drop_button">
                  <span className="events_color_text">
                    <Link to="/browse/events">Browse Events</Link>
                  </span>
                </div>
              </div>
            </li>
            <li id="create_button" className="drop_button">
              <button>
                <strong>Create</strong>
              </button>
              {createDrop}
            </li>
            <li id="user_button" className="drop_button">
              <button id="user_button_button">
                <img
                  id="nav_user_image"
                  src={userImage ? decodeURIComponent(userImage) : usericon}
                  height="50px"
                  width="50px"
                  alt="User"
                />
              </button>
              {userDrop}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
