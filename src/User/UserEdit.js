import React from "react";
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { Link } from "react-router-dom";
import "./UserEdit.css";
import getRandomImageFromPicsum from "../Images/getRandomImageFromPicsum";
import getRandomImageFromUnsplash from "../Images/getRandomImageFromUnsplash";
import usericon from "../Images/usericon.png";

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
      userImageNew: undefined,
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

  getPicture = () => {
    const { userImageNew: imageURL } = this.state;
    fetch(imageURL).then((response) => {
      const responseURL = response.url;
      if (responseURL.substring(0, 16) !== "http://localhost") {
        const encodedURL = encodeURIComponent(responseURL);
        this.setState({ userImage: encodedURL });
      }
    });
  };

  render() {
    const {
      userName,
      userFirstName,
      userLastName,
      userBio,
      userBioLong,
      userImage,
      userImageNew,
    } = this.state;
    return (
      <main id="user_edit">
        <section>
          <h1>Profile Picture</h1>
          <img
            src={userImage ? decodeURIComponent(userImage) : usericon}
            alt="User"
          ></img>
          <Textbox
            value={userImageNew}
            onChange={(value) => this.setState({ userImageNew: value })}
          ></Textbox>
          <div id="user_edit_image_buttons">
            <button class="noodle_button" onClick={() => this.getPicture()}>
              Get an Image from URL
            </button>
            <button
              class="noodle_button"
              onClick={() =>
                this.setState({
                  userImage: getRandomImageFromPicsum(300, 300),
                })
              }
            >
              Get a Random Image from Picsum
            </button>
            <button
              class="noodle_button"
              onClick={() => {
                getRandomImageFromUnsplash(300, 300).then((userImage) => {
                  this.setState({ userImage });
                });
              }}
            >
              Get a Random Image from Unsplash
            </button>
          </div>
        </section>
        <section>
          <h1>User Information</h1>
          <div>
            <label htmlFor="userName">Organizer Name</label>
            <Textbox
              name="userName"
              value={userName}
              onChange={(value) => this.setState({ userName: value })}
            ></Textbox>
          </div>
          <div>
            <label htmlFor="userFirstName">First Name</label>
            <Textbox
              name="userFirstName"
              value={userFirstName}
              onChange={(value) => this.setState({ userFirstName: value })}
            ></Textbox>
          </div>
          <div>
            <label htmlFor="userLastName">Last Name</label>
            <Textbox
              name="userLastName"
              value={userLastName}
              onChange={(value) => this.setState({ userLastName: value })}
            ></Textbox>
          </div>
          <div>
            <label htmlFor="userBio">User Detail Short</label>
            <Textarea
              attributesInput={{ rows: 3 }}
              name="userBio"
              value={userBio}
              onChange={(value) => this.setState({ userBio: value })}
            ></Textarea>
          </div>
          <div>
            <label htmlFor="userBioLong">User Detail Long</label>
            <Textarea
              attributesInput={{ rows: 5 }}
              name="userBioLong"
              value={userBioLong}
              onChange={(value) => this.setState({ userBioLong: value })}
            ></Textarea>
          </div>
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
