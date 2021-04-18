import logo from "../Images/noodlewall-logo-50p.png";
import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import usericon from "../Images/usericon.png";

class Navbar extends React.Component {
  render() {
    const { onRefresh: refresh } = this.props;
    // Get the current user data
    // Destructure the current user data
    const userID = this.props.userID;
    const { userFirstName, userLastName, userImage } = this.props.userData[
      userID - 1
    ];
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
                        src={
                          userImage ? decodeURIComponent(userImage) : usericon
                        }
                        alt="User"
                      ></img>
                      <h4>
                        {userFirstName} {userLastName}
                      </h4>
                    </Link>
                  </div>
                  <div>
                    {" "}
                    <Link className="noodle_button" to="/manage">
                      Manage Your Account
                    </Link>
                    <Link className="noodle_button" to="/dashboard">
                      View Dashboard
                    </Link>
                    <Link className="noodle_button" to="/logout">
                      Sign Out
                    </Link>
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
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
