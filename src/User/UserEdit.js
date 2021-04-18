import React from "react";
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { Link } from "react-router-dom";
import "./UserEdit.css";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    const { userData, currentUserID: userID } = this.props;
    const thisUser = userData.filter((user) => {
      return parseInt(user.userID) === parseInt(userID);
    })[0];
    const {
      userName,
      userFirstName,
      userLastName,
      userBio,
      userBioLong,
      userImage,
    } = thisUser;
    this.state = {
      userName,
      userFirstName,
      userLastName,
      userBio,
      userBioLong,
      userImage,
    };
  }
  update = () => {
    // Create the object to be sent to the API
    const {
      userName,
      userFirstName,
      userLastName,
      userBio,
      userBioLong,
      userImage,
    } = this.state;
    const { currentUserID: userID, onUpdate } = this.props;
    const userData = {
      userID,
      userName,
      userFirstName,
      userLastName,
      userBio,
      userBioLong,
      userImage,
    };
    onUpdate("user", userData);
  };
  render() {
    const {
      userName,
      userFirstName,
      userLastName,
      userBio,
      userBioLong,
      userImage,
    } = this.state;
    return (
      <main id="user_edit">
        <section>
          <h1>Profile Picture</h1>
          <img src={decodeURIComponent(userImage)} alt="User"></img>
          <Textbox
            value={userImage}
            onChange={(value) => this.setState({ userImage: value })}
          ></Textbox>
          <button class="noodle_button">
            Get a random image from Unsplash
          </button>
        </section>
        <section>
          <h1>User Information</h1>
          <label htmlFor="userName">Organizer Name</label>
          <Textbox
            name="userName"
            value={userName}
            onChange={(value) => this.setState({ userName: value })}
          ></Textbox>
          <label htmlFor="userFirstName">First Name</label>
          <Textbox
            name="userFirstName"
            value={userFirstName}
            onChange={(value) => this.setState({ userFirstName: value })}
          ></Textbox>
          <label htmlFor="userLastName">Last Name</label>
          <Textbox
            name="userLastName"
            value={userLastName}
            onChange={(value) => this.setState({ userLastName: value })}
          ></Textbox>
          <label htmlFor="userBio">User Detail Short</label>
          <Textarea
            attributesInput={{ rows: 3 }}
            name="userBio"
            value={userBio}
            onChange={(value) => this.setState({ userBio: value })}
          ></Textarea>
          <label htmlFor="userBioLong">User Detail Long</label>
          <Textarea
            attributesInput={{ rows: 5 }}
            name="userBioLong"
            value={userBioLong}
            onChange={(value) => this.setState({ userBioLong: value })}
          ></Textarea>
        </section>
        <div id="user_edit_action_bar">
          <Link class="noodle_button" to="/user">
            Cancel Editing
          </Link>
          <button class="noodle_button" onClick={() => this.update()}>
            Submit Changes
          </button>
        </div>
      </main>
    );
  }
}

export default UserEdit;
