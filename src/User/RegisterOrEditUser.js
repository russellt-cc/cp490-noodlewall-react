// React
import React from "react";

// React Inputs Validation
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

// React Router
import { Link } from "react-router-dom";

// CSS
import "./RegisterOrEditUser.css";

// Random Images
import getRandomImageFromPicsum from "../Images/getRandomImageFromPicsum";
import getRandomImageFromUnsplash from "../Images/getRandomImageFromUnsplash";

// Default User Icon
import usericon from "../Images/usericon.png";

// API Calls and Configuration
import uploadNoodleOrUserImage from "../Data/uploadNoodleOrUserImage";
import deleteNoodleOrUserImage from "../Data/deleteNoodleOrUserImage";
import apiConfig from "../Data/apiConfig";

// Form to register a new user or edit an existing one
class RegisterOrEditUser extends React.Component {
  // Load data into state for editing
  componentDidMount() {
    const { currentUser } = this.props;
    // Check to see if we are editing or creating a new user
    if (currentUser) {
      // Edit mode
      this.setState({
        userID: currentUser.userID,
        userName: currentUser.userName,
        userFirstName: currentUser.userFirstName,
        userLastName: currentUser.userLastName,
        userBio: currentUser.userBio,
        userBioLong: currentUser.userBioLong,
        userImage: currentUser.userImage,
        userImageOld: currentUser.userImage,
        userRating: currentUser.userRating,
      });
    }
  }
  // Validate data and submit the form
  submit = () => {
    // Check if we have the required data
    if (
      (this.state.userName, this.state.userFirstName, this.state.userLastName)
    ) {
      this.createOrUpdateUser();
    } else {
      alert("You must enter a user name, first name, and last name.");
    }
  };
  // Handle the create or update process
  // Uses promise chaining to keep in sync
  createOrUpdateUser = () => {
    // Upload image if needed
    this.uploadImage().then(
      (uploadImageResult) => {
        // Image Uploaded Successfully
        // console.log(uploadImageResult);
        // Create the data object
        const data = {
          userID: this.state.userID,
          userName: this.state.userName,
          userFirstName: this.state.userFirstName,
          userLastName: this.state.userLastName,
          userBio: this.state.userBio,
          userBioLong: this.state.userBioLong,
          userImage: uploadImageResult.imageAddress
            ? uploadImageResult.imageAddress
            : this.state.userImage,
          userRating: this.state.userRating ? this.state.userRating : 3,
        };
        // Check if we are creating or updating
        if (!this.state.userID) {
          // Create
          this.props.onCreate("user", data).then(
            (createResult) => {
              // Creation completed successfully
              // console.log(createResult);
            },
            (creationError) => {
              // Creation failed
              // console.log(creationError);
              alert("User Creation Failed! Error: " + creationError.message);
            }
          );
        } else {
          // Delete old image if needed
          this.deleteImage().then(
            (deleteResult) => {
              // Delete completed successfully
              // console.log(deleteResult);
              // Update
              this.props.onUpdate("user", data).then(
                (updateResult) => {
                  // Update completed successfully
                  // console.log(updateResult);
                },
                (updateError) => {
                  // Update failed
                  // console.log(updateError);
                  alert("User Update Failed! Error: " + updateError.message);
                }
              );
            },
            (deleteError) => {
              // Delete failed
              // console.log(deleteError);
              alert("Image Deletion Failed! Error: " + deleteError.message);
            }
          );
        }
      },
      (uploadImageError) => {
        // Image Failed to Upload
        // console.log(uploadImageError);
        alert("Image Upload Failed! Error: " + uploadImageError.message);
      }
    );
  };
  // Delete the old image if needed
  // Return a promise
  deleteImage = () => {
    // Check if the user changed their image
    const { currentUser: thisUser } = this.props;
    const { userImage: oldImage } = thisUser;
    if (this.state.userImage !== oldImage) {
      // See if we are hosting the image
      const { apiURL } = apiConfig();
      if (oldImage.substring(0, apiURL.length) === apiURL) {
        // Delete the image from the server
        const splitImageAddress = oldImage.split("/");
        const imageAddress = splitImageAddress[splitImageAddress.length - 1];
        const data = { imageAddress };
        const deletedImagePromise = deleteNoodleOrUserImage("user", data);
        return deletedImagePromise.then(
          (result) => {
            // Delete succeeded
            return result;
          },
          (error) => {
            // Delete failed
            return error;
          }
        );
      } else {
        return Promise.resolve({ message: "Image Not Hosted." });
      }
    } else {
      return Promise.resolve({ message: "Image Didn't Change." });
    }
  };
  // Upload the image if needed
  // Return a promise
  uploadImage = () => {
    // Check to see if the image needs to be uploaded
    if (this.state.userImage) {
      if (typeof this.state.userImage === "object") {
        return uploadNoodleOrUserImage("user", this.state.userImage).then(
          (uploadImageResult) => {
            // Image Uploaded Successfully
            // console.log(uploadImageResult);
            return uploadImageResult;
          },
          (uploadImageError) => {
            // Image Failed to Upload
            // console.log(uploadImageError);
            return uploadImageError;
          }
        );
      } else {
        return Promise.resolve({
          message: "Image doesn't need to be uploaded.",
        });
      }
    } else {
      return Promise.resolve({ message: "No image found." });
    }
  };
  // Confirm and delete account
  deleteAccount = () => {
    // Confirm that a user really wants to delete their account
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Create the object to be sent to the API
      const { userID } = this.state;
      const userData = { userID };
      const { onDelete } = this.props;
      onDelete("user", userData).then(
        (deleteUserResult) => {
          // Delete successful
          // console.log(deleteUserResult);
          // Get old image link
          const { userImageOld: oldImage } = this.state;
          // Check to see if their image was hosted
          const { apiURL } = apiConfig();
          if (oldImage.substring(0, apiURL.length) === apiURL) {
            // Delete the image from the server
            const splitImageAddress = oldImage.split("/");
            const imageAddress =
              splitImageAddress[splitImageAddress.length - 1];
            const data = { imageAddress };
            const deletedImagePromise = deleteNoodleOrUserImage("user", data);
            return deletedImagePromise.then(
              (deleteImageResult) => {
                // Delete succeeded
                // console.log(deleteImageResult);
              },
              (deleteImageError) => {
                // Delete failed
                // console.log(deleteImageError);
                alert(
                  "Image Deletion Failed! Error: " + deleteImageError.message
                );
              }
            );
          } else {
            // console.log({ message: "Image Not Hosted." });
          }
        },
        (deleteUserError) => {
          // Delete failed
          // console.log(deleteUserError);
          alert("User Deletion Failed! Error: " + deleteUserError.message);
        }
      );
    }
  };
  // Render method
  render() {
    if (this.state) {
      const {
        userID,
        userName,
        userFirstName,
        userLastName,
        userBio,
        userBioLong,
        userImage,
        userImageNew,
      } = this.state;
      // The action buttons depending on whether user is editing or creating an account
      const actionButtons = userID ? (
        <div id="user_edit_action_bar">
          <Link className="noodle_button" to="/user">
            Cancel Editing
          </Link>
          <button className="noodle_button" onClick={() => this.submit()}>
            Submit Changes
          </button>
          <button
            className="noodle_button"
            onClick={() => this.deleteAccount()}
          >
            Delete Account
          </button>
        </div>
      ) : (
        <div id="user_edit_action_bar">
          <Link className="noodle_button" to="/login">
            Cancel Registration
          </Link>
          <button className="noodle_button" onClick={() => this.submit()}>
            Submit Registration
          </button>
        </div>
      );
      // Return the user edit form
      return (
        <main id="user_edit">
          <section>
            <h1>Profile Picture</h1>
            <img
              src={
                userImage
                  ? typeof userImage === "object"
                    ? URL.createObjectURL(userImage)
                    : decodeURIComponent(userImage)
                  : usericon
              }
              onError={() => {
                this.setState({ userImage: undefined });
              }}
              alt="User"
            ></img>
            <label htmlFor="noodleImageUpload">
              Upload an image from your device
            </label>
            <input
              type="file"
              accept="image/*"
              name="noodleImageUpload"
              onChange={(event) => {
                this.setState({ userImage: event.target.files[0] });
              }}
            ></input>
            <label htmlFor="noodleImageLink">
              Get an image from the internet
            </label>
            <Textbox
              attributesInput={{
                name: "noodleImageLink",
              }}
              value={userImageNew}
              onChange={(value) => this.setState({ userImageNew: value })}
            ></Textbox>
            <div id="user_edit_image_buttons">
              <button
                className="noodle_button"
                onClick={() =>
                  this.setState({ userImage: this.state.userImageNew })
                }
              >
                Get an Image from URL
              </button>
              <button
                className="noodle_button"
                onClick={() =>
                  this.setState({
                    userImage: getRandomImageFromPicsum(300, 300),
                  })
                }
              >
                Get a Random Image from Picsum
              </button>
              <button
                className="noodle_button"
                onClick={() => {
                  getRandomImageFromUnsplash(300, 300).then((result) => {
                    this.setState({ userImage: result.encodedURL });
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
          {actionButtons}
        </main>
      );
    } else {
      return (
        <main>
          <p>Loading...</p>
        </main>
      );
    }
  }
}

export default RegisterOrEditUser;
