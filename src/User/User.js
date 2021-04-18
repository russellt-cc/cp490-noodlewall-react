import React from "react";
import ReactDOMServer from "react-dom/server";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./User.css";
import UserRating from "../Common/UserRating.js";
import NoodleList from "../Common/NoodleList.js";
import usericon from "../images/usericon.png";

// The user profile page
class User extends React.Component {
  constructor(props) {
    super(props);

    const { userData, currentUserID } = this.props;
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
      this.state = {
        userData: thisUser,
        isOwnProfile: isOwnProfile,
        error: false,
      };
    } else {
      this.state = {
        error: true,
      };
    }
  }

  follow = () => {
    if (!this.state.isOwnProfile) {
      alert("Follow component goes here!");
    } else {
      alert("You can't follow yourself!");
    }
  };

  contact = () => {
    if (!this.state.isOwnProfile) {
      alert("Contact component goes here!");
    } else {
      alert("You can't contact yourself!");
    }
  };

  edit = () => {
    if (this.state.isOwnProfile) {
      alert("Edit component goes here!");
    } else {
      alert("You can't edit someone else's profile!");
    }
  };

  manage = () => {
    if (this.state.isOwnProfile) {
      alert("Manage component goes here!");
    } else {
      alert("You can't manage someone else's events!");
    }
  };

  dashboard = () => {
    if (this.state.isOwnProfile) {
      alert("Dashboard component goes here!");
    } else {
      alert("You can't view someone else's dashboard!");
    }
  };

  getUserActionButtons = () => {
    const { isOwnProfile } = this.state;

    const otherProfileActions = (
      <p className="user_actions">
        <button
          className="noodle_button"
          onClick={() => {
            this.follow();
          }}
        >
          Follow {this.state.userData.userName}
        </button>
        <button
          className="noodle_button"
          onClick={() => {
            this.contact();
          }}
        >
          Contact {this.state.userData.userName}
        </button>
      </p>
    );

    const ownProfileActions = (
      <p className="user_actions">
        <Link className="noodle_button" to="/user/edit">
          Edit Profile
        </Link>
        <button
          className="noodle_button"
          onClick={() => {
            this.manage();
          }}
        >
          Manage Events
        </button>
        <button
          className="noodle_button"
          onClick={() => {
            this.dashboard();
          }}
        >
          View Dashboard
        </button>
      </p>
    );

    if (!isOwnProfile) {
      return otherProfileActions;
    } else {
      return ownProfileActions;
    }
  };

  render() {
    const { error, isOwnProfile } = this.state;

    if (error) {
      return (
        <main>
          <p>User not found!</p>
        </main>
      );
    } else {
      const {
        userID,
        userFirstName,
        userImage,
        userName,
        userLastName,
        userRating,
        userBioLong,
      } = this.state.userData;

      const eventFilters = {
        type: "events",
        userID: this.state.userData.userID,
      };
      const userEvents = (
        <NoodleList
          noodleData={this.props.noodleData}
          userData={this.props.userData}
          filters={eventFilters}
        />
      );
      const dreamFilters = {
        type: "dreams",
        userID: userID,
      };
      const userDreams = (
        <NoodleList
          noodleData={this.props.noodleData}
          userData={this.props.userData}
          filters={dreamFilters}
        />
      );
      return (
        <main id="user_profile">
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
              <img src={userImage ? userImage : usericon} alt={userName} />
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
              {this.getUserActionButtons()}
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
              <p>Dreams by {userName}</p>
              {userDreams}
            </section>
          ) : (
            <></>
          )}
        </main>
      );
    }
  }

  componentDidMount() {
    switch (this.props.match.params.action) {
      case "follow":
        this.follow();
        break;
      case "contact":
        this.contact();
        break;
      case "edit":
        this.edit();
        break;
      case "manage":
        this.manage();
        break;
      case "dashboard":
        this.dashboard();
        break;
      default:
        break;
    }
  }
}

export default User;
