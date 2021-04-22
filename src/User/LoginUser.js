// React
import React from "react";

// React router
import { Link } from "react-router-dom";

// CSS
import "./LoginUser.css";

// API function
import readNoodlesOrUsers from "../Data/readNoodlesOrUsers";

// The login / user switcher component
// Replace with a proper login
class LoginUser extends React.Component {
  componentDidMount() {
    // Get the latest data from the API
    readNoodlesOrUsers("users").then(
      (result) => {
        // Data read successfully
        const userData = result.records;
        // Save in state
        this.setState({ userData });
      },
      (error) => {
        // Data failed to read
        console.log(error);
        const userData = {};
        this.setState({ userData, error });
      }
    );
  }
  render() {
    // Check if we are loaded
    if (this.state && this.state.userData) {
      // Check for error
      if (!this.state.error) {
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
            <p>Users failed to load! Error: {this.state.error.message}</p>
          </main>
        );
      }
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
