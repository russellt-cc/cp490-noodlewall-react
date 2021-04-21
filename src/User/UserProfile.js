// React
import React from "react";
import ReactDOMServer from "react-dom/server";

// React Router
import { BrowserRouter as Router, Link } from "react-router-dom";

// CSS
import "./UserProfile.css";

// User Rating component
import UserRating from "../Common/UserRating";

// Noodle List component
import NoodleList from "../Common/NoodleList";

// Default user icon
import usericon from "../Images/usericon.png";

// API functions
import readNoodleOrUserByID from "../Data/readNoodleOrUserByID";
import readNoodleOrUserByOtherID from "../Data/readNoodleOrUserByOtherID";

// The user profile page
class User extends React.Component {
  componentDidMount() {
    let { id } = this.props.match.params;
    const { currentUser } = this.props;
    // Go to users own page by default
    // Check if we are not going to a specific id
    if (!id) {
      // Check if user is signed in
      if (currentUser.userID) {
        // Load current user
        id = currentUser.userID;
        const isOwnProfile = true;
        this.setState({ isOwnProfile });
      } else {
        // Just show user not found
        id = null;
        const userIsLoaded = true;
        this.setState({ userIsLoaded });
      }
    }
    // Fetch data for the id
    if (id) {
      readNoodleOrUserByID("user", id).then(
        (userLoadResult) => {
          // console.log(userLoadResult);
          const thisUser = userLoadResult;
          const userIsLoaded = true;
          this.setState({ thisUser, userIsLoaded });
          // Get users noodles
          readNoodleOrUserByOtherID("noodles", id).then(
            (userNoodlesResult) => {
              // console.log(userNoodlesResult);
              const userNoodles = userNoodlesResult.records;
              const userNoodlesLoaded = true;
              this.setState({ userNoodles, userNoodlesLoaded });
            },
            (userNoodlesError) => {
              // console.log(userNoodlesError);
              const userNoodlesLoaded = true;
              const userNoodles = [];
              this.setState({
                userNoodles,
                userNoodlesError,
                userNoodlesLoaded,
              });
            }
          );
        },
        (userLoadError) => {
          // console.log(userLoadError);
          const userIsLoaded = true;
          this.setState({ userLoadError, userIsLoaded });
          alert("User failed to load! Error: " + userLoadError.message);
        }
      );
    }
  }
  // Render method
  render() {
    if (this.state && this.state.userIsLoaded) {
      if (this.state && this.state.thisUser) {
        const { thisUser, userNoodles } = this.state;
        // Get the events organized by the user
        const userEvents = (
          <NoodleList
            noodleData={userNoodles}
            hostData={thisUser}
            filters={{
              type: "events",
              userID: thisUser.userID,
            }}
          />
        );
        // Get the dreams created by the user
        const userDreams = (
          <NoodleList
            noodleData={userNoodles}
            hostData={thisUser}
            filters={{
              type: "dreams",
              userID: thisUser.userID,
            }}
          />
        );
        // Actions when viewing a users own profile
        const otherProfileActions = (
          <p className="user_actions">
            <button
              className="noodle_button"
              onClick={() => {
                alert("Thanks for the follow!");
              }}
            >
              Follow Me
            </button>
            <button
              className="noodle_button"
              onClick={() => {
                alert("I'll get back to you soon.");
              }}
            >
              Contact Me
            </button>
          </p>
        );
        // Actions when viewing another users profile
        const ownProfileActions = (
          <p className="user_actions">
            <Link className="noodle_button" to="/user/edit">
              Edit Profile
            </Link>
            <button className="noodle_button">Manage Events</button>
            <button className="noodle_button">View Dashboard</button>
          </p>
        );
        // Return the profile page
        return (
          <main
            id="user_profile"
            className={this.state.isOwnProfile ? "own" : "other"}
          >
            {this.state.isOwnProfile ? (
              <div id="profile_own_profile_status_bar">
                <p>
                  Hi {thisUser.userFirstName}! You can edit your profile, manage
                  events, and view your dashboard from this page.
                </p>
              </div>
            ) : (
              <></>
            )}
            <section id="user_profile_intro">
              <div
                className="user_profile_intro_column"
                id="user_profile_intro_left"
              >
                <img
                  src={
                    thisUser.userImage
                      ? decodeURIComponent(thisUser.userImage)
                      : usericon
                  }
                  alt={thisUser.userName}
                />
                <h3>
                  {thisUser.userFirstName} {thisUser.userLastName}
                </h3>
                <UserRating rating={thisUser.userRating} />
              </div>
              <div
                className="user_profile_intro_column"
                id="user_profile_intro_right"
              >
                <h1>About {thisUser.userName}</h1>
                <p>{thisUser.userBioLong}</p>
                {!this.props.currentUser.userID ? (
                  <></>
                ) : this.state.isOwnProfile ? (
                  ownProfileActions
                ) : (
                  otherProfileActions
                )}
              </div>
            </section>
            {/* If the user has any events, show them here. 
            Use ReactDOMServer.renderToString to return a truthy or falsey 
            value from the userEvents JSX. Include Router tags because we have Link
            components inside the userEvents component if it returns true. */}
            {this.state.userNoodlesLoaded &&
            ReactDOMServer.renderToString(<Router>{userEvents}</Router>) ? (
              <section id="user_events">
                <h3>Events by {thisUser.userName}</h3>
                {userEvents}
              </section>
            ) : (
              <></>
            )}
            {/* If the user has any dreams, show them here */}
            {this.state.userNoodlesLoaded &&
            ReactDOMServer.renderToString(<Router>{userDreams}</Router>) ? (
              <section id="user_dreams">
                <h3>Dreams by {thisUser.userName}</h3>
                {userDreams}
              </section>
            ) : (
              <></>
            )}
          </main>
        );
      } else {
        // Return error message
        return (
          <main>
            <p>User not found!</p>
          </main>
        );
      }
    } else {
      return (
        <main>
          <p>Loading User...</p>
        </main>
      );
    }
  }
}

export default User;
