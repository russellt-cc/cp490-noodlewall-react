import React from "react";
import "./css/User.css";
import UserRating from "../UserRating.js";

class User extends React.Component {
  constructor(props) {
    super(props);

    const { userData, currentUserID } = this.props;
    const { id: profileUserID } = this.props.match.params;

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
        <button
          className="noodle_button"
          onClick={() => {
            this.edit();
          }}
        >
          Edit Profile
        </button>
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
    const { error } = this.state;

    if (error) {
      return (
        <main>
          <p>User not found!</p>
        </main>
      );
    } else {
      return (
        <main id="user_profile">
          <section id="user_profile_intro">
            <div
              className="user_profile_intro_column"
              id="user_profile_intro_left"
            >
              <img
                src={this.state.userData.userImage}
                alt={this.state.userData.userName}
              />
              <h3>
                {this.state.userData.userFirstName}{" "}
                {this.state.userData.userLastName}
              </h3>
              <UserRating rating={this.state.userData.userRating} />
            </div>

            <div
              className="user_profile_intro_column"
              id="user_profile_intro_right"
            >
              <h1>About {this.state.userData.userName}</h1>
              <p>{this.state.userData.userBioLong}</p>
              {this.getUserActionButtons()}
            </div>
          </section>

          <section id="user_noodles"></section>
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
