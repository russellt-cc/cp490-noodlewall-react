// React
import React from "react";

// React router
import { Link } from "react-router-dom";

// CSS
import "./LoginUser.css";

// API function
import dataRead from "../Data/dataRead";

// The login / user switcher component
// Replace with a proper login
class LoginUser extends React.Component {
  componentDidMount() {
    // Get the latest data from the API
    dataRead("users").then(
      (userLoadResult) => {
        // Data read successfully
        const userData = userLoadResult.records;
        const usersAreLoaded = true;
        // Save in state
        this.setState({ userData, usersAreLoaded });
      },
      (userLoadError) => {
        // Data failed to read
        alert("Users failed to load! Error: " + userLoadError.message);
        const usersAreLoaded = true;
        this.setState({ userLoadError, usersAreLoaded });
      }
    );
  }
  render() {
    if (this.state && this.state.usersAreLoaded) {
      const { userData } = this.state;
      // Get data from props
      const { onLogin: login } = this.props;
      // Get redirect
      const { redirect, id } = this.props.match.params;
      // Create list of existing users
      const userList = userData.map((user, index) => {
        const { userImage, userName } = user;
        return (
          <button
            key={index}
            className="login_user_button"
            onClick={() => login(user, undefined, redirect, id)}
          >
            <img src={decodeURIComponent(userImage)} alt="User"></img>
            <p>{userName}</p>
          </button>
        );
      });
      // New user button
      const newUser = (
        <button className="login_user_button">
          <Link to="/register">
            <p id="add_symbol">+</p>
            <p>New User</p>
          </Link>
        </button>
      );
      return (
        <main id="user_login">
          <section id="login_user_list">
            {userList}
            {newUser}
          </section>
        </main>
      );
    } else {
      return (
        <main>
          <p>Loading Users...</p>
        </main>
      );
    }
  }
}

export default LoginUser;
