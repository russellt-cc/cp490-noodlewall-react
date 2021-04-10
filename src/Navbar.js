import logo from './images/noodlewall-logo-50p.png';
import user_icon from './images/usericon-50p.png';
import './css/Navbar.css';
import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        {/* left div has the logo and search box */}
        <div id="nav_left" class="nav_column">
          <a href="index.html">
            <img id="nav_logo" src={logo} height="50px" alt="Noodlewall Logo"/>
          </a>
          <form action="browse.html" autocomplete="off">
            <input type="search" id="mySearch" name="q" placeholder="Search"/>
          </form>
        </div>
        {/* right div has the browse, create, and user buttons */}
        <div id="nav_right" class="nav_column">
          <ul>
            <li id="browse_button" class="drop_button">
              <button><strong>Browse</strong></button>
              <div id="browse_drop" class="drop">
                <div id="browse_dreams_button" class="browse_drop_button">
                  <span class="dreams_color_text">
                    <a href="browse.html?type=dreams">Browse Dreams</a>
                  </span>
                </div>
                <div id="browse_all_button" class="browse_drop_button">
                  <span>
                    <a href="browse.html?type=all">Browse All</a>
                  </span>
                </div>
                <div id="browse_events_button" class="browse_drop_button">
                  <span class="events_color_text">
                    <a href="browse.html?type=events">Browse Events</a>
                  </span>
                </div>
              </div>
            </li>
            <li id="create_button" class="drop_button">
              <button><strong>Create</strong></button>
              <div id="create_drop" class="drop">
                <div id="create_dream_button" class="create_drop_button">
                  <span class="dreams_color_text">
                    <a href="/#">Create a Dream</a>
                  </span>
                </div>
                <div id="create_event_button" class="create_drop_button">
                  <span class="events_color_text">
                    <a href="/#">Create an Event</a>
                  </span>
                </div>
              </div>
            </li>
            <li id="user_button" class="drop_button">
              <button id="user_button_button">
                <img id="nav_user_image" src={user_icon} height="50px" alt="User"/>
              </button>
              <div id="user_drop" class="drop">
                <div class="user_drop_column" id="user_drop_left">
                  Left Column
                </div>
                <div class="user_drop_column" id="user_drop_middle">
                  Middle Column
                </div>
                <div class="user_drop_column" id="user_drop_right">
                  Right Column
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
