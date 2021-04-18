import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends React.Component {
  render() {
    // Get data from props
    const { userData, onLogin: login } = this.props;
    // Create list of existing users
    const userList = userData.map((user, index) => {
      const { userID, userImage, userName } = user;
      return (
        <button
          key={index}
          className="login_user_button"
          onClick={() => login(userID)}
        >
          <img src={userImage} alt="User"></img>
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
      <main id="login">
        <section id="login_user_list">
          {userList}
          {newUser}
        </section>
      </main>
    );
  }
}

export default Login;