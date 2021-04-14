import React from "react";
import "./css/User.css";
import UserRating from "../UserRating.js";

class User extends React.Component {
  constructor(props) {
    super(props);

    const { userData } = this.props;
    const { id: userID } = this.props.match.params;

    const thisUser = userData.filter((user) => {
      return parseInt(user.userID) === parseInt(userID);
    })[0];

    if (thisUser != undefined) {
      this.state = {
        userData: thisUser,
        error: false,
      };
    } else {
      this.state = {
        error: true,
      };
    }
  }

  follow = () => {
    alert("Follow component goes here!");
  };

  contact = () => {
    alert("Contact component goes here!");
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
      default:
        break;
    }
  }
}

export default User;
