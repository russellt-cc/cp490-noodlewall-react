import React from "react";
import ReactDOMServer from "react-dom/server";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./UserProfile.css";
import UserRating from "../Common/UserRating";
import NoodleList from "../Common/NoodleList";
import usericon from "../Images/usericon.png";

// The user profile page
class User extends React.Component {
  render() {
    // Destructure the props
    const { userData, currentUserID, noodleData } = this.props;
    let { id: profileUserID } = this.props.match.params;
    // Go to users own page by default
    if (!profileUserID) profileUserID = currentUserID;
    const thisUser = userData.filter((user) => {
      return parseInt(user.userID) === parseInt(profileUserID);
    })[0];
    if (thisUser !== undefined) {
      // Check to see if a user is viewing their own page
      let isOwnProfile = false;
      if (parseInt(currentUserID) === parseInt(profileUserID)) {
        isOwnProfile = true;
      }
      // Destructure the user data
      const {
        userID,
        userFirstName,
        userImage,
        userName,
        userLastName,
        userRating,
        userBioLong,
      } = thisUser;
      // Get the events organized by the user
      const userEvents = (
        <NoodleList
          noodleData={noodleData}
          userData={userData}
          filters={{
            type: "events",
            userID: userID,
          }}
        />
      );
      // Get the dreams created by the user
      const userDreams = (
        <NoodleList
          noodleData={this.props.noodleData}
          userData={this.props.userData}
          filters={{
            type: "dreams",
            userID: userID,
          }}
        />
      );
      // Actions when viewing a users own profile
      const otherProfileActions = (
        <p className="user_actions">
          <button
            className="noodle_button"
            onClick={() => {
              this.follow();
            }}
          >
            Follow Me
          </button>
          <button
            className="noodle_button"
            onClick={() => {
              this.contact();
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
        <main id="user_profile" className={isOwnProfile ? "own" : "other"}>
          {isOwnProfile ? (
            <div id="profile_own_profile_status_bar">
              <p>
                Hi {userFirstName}! You can edit your profile, manage events,
                and view your dashboard from this page.
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
                src={userImage ? decodeURIComponent(userImage) : usericon}
                alt={userName}
              />
              <h3>
                {userFirstName} {userLastName}
              </h3>
              <UserRating rating={userRating} />
            </div>
            <div
              className="user_profile_intro_column"
              id="user_profile_intro_right"
            >
              <h1>About {userName}</h1>
              <p>{userBioLong}</p>
              {!currentUserID ? (
                <></>
              ) : isOwnProfile ? (
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
          {ReactDOMServer.renderToString(<Router>{userEvents}</Router>) ? (
            <section id="user_events">
              <h3>Events by {userName}</h3>
              {userEvents}
            </section>
          ) : (
            <></>
          )}
          {/* If the user has any dreams, show them here */}
          {ReactDOMServer.renderToString(<Router>{userDreams}</Router>) ? (
            <section id="user_dreams">
              <h3>Dreams by {userName}</h3>
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
  }
}

export default User;
