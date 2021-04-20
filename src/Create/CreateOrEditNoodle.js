import "./CreateOrEditNoodle.css";
import React from "react";

import CreateNavProgressBar from "./CreateNavProgressBar";
import CreateSection1 from "./CreateSection1";
import CreateSection2 from "./CreateSection2";
import CreateSection3 from "./CreateSection3";
import CreateSection4 from "./CreateSection4";
import CreateSection5 from "./CreateSection5/CreateSection5";
import CreateSection6 from "./CreateSection6";
import CreateSection7 from "./CreateSection7";
import CreateSubmitBar from "./CreateSubmitBar";

import apiUploadImage from "../Data/apiUploadImage";
import apiDeleteImage from "../Data/apiDeleteImage";
import apiConfig from "../Data/apiConfig";

// The create dream / event page
class CreateOrEditNoodle extends React.Component {
  constructor(props) {
    super(props);

    // Get the type of noodle we are creating
    let { type: noodleStatus } = this.props.match.params;
    // Check validity of the status
    if (noodleStatus !== "dream" && noodleStatus !== "event") {
      noodleStatus = "event";
    }
    // Get current user data to pre fill the form
    const { userData, currentUserID } = this.props;
    const thisUser = userData.filter((user) => {
      return parseInt(user.userID) === parseInt(currentUserID);
    })[0];
    const { userName, userBio, userBioLong } = thisUser;

    // Check if we are editing an existing entry
    const { id: noodleID } = this.props.match.params;

    if (noodleID) {
      // Get current noodle data to pre fill the form
      const { noodleData } = this.props;
      const thisNoodle = noodleData.filter((noodle) => {
        return parseInt(noodle.noodleID) === parseInt(noodleID);
      })[0];
      // console.log("Editing noodle");
      // console.log(thisNoodle);
      // Put data in state for editing
      this.state = {
        noodleID,
        createMode: thisNoodle.noodleStatus,
        noodleStatus: thisNoodle.noodleStatus,
        userName: userName ? userName : "User Name",
        userBio: userBio ? userBio : "User Bio",
        userBioLong: userBioLong ? userBioLong : "User Bio Long",
        noodleTitle: thisNoodle.noodleTitle,
        noodleSummary: thisNoodle.noodleSummary
          ? thisNoodle.noodleSummary
          : thisNoodle.noodleTitle,
        noodleDescription: thisNoodle.noodleDescription,
        noodleLocation: thisNoodle.noodleLocation
          ? thisNoodle.noodleLocation
          : undefined,
        noodleDirections: thisNoodle.noodleDirections
          ? thisNoodle.noodleDirections
          : undefined,
        noodleDate: thisNoodle.noodleDate,
        noodleTime: thisNoodle.noodleTime,
        noodleTags: thisNoodle.noodleTags,
        noodleCoverImage: thisNoodle.noodleCoverImage,
        noodleImages:
          thisNoodle.noodleImages && thisNoodle.noodleImages[0]
            ? thisNoodle.noodleImages
            : thisNoodle.noodleCoverImage
            ? [thisNoodle.noodleCoverImage]
            : [],
        noodleImageText:
          thisNoodle.noodleImageText && thisNoodle.noodleImageText[0]
            ? thisNoodle.noodleImageText
            : thisNoodle.noodleCoverImage
            ? [""]
            : [],
        noodlePrice: thisNoodle.noodlePrice,
        noodleMinTickets: thisNoodle.noodleMinTickets,
        noodleMaxTickets: thisNoodle.noodleMaxTickets,
        noodleCutoff: thisNoodle.noodleCutoff,
      };
    } else {
      // Put default data in state for testing
      this.state = {
        createMode: noodleStatus,
        noodleID: undefined,
        noodleStatus: undefined,
        userName: userName ? userName : "User Name",
        userBio: userBio ? userBio : "User Bio",
        userBioLong: userBioLong ? userBioLong : "User Bio Long",
        noodleTitle: undefined,
        noodleSummary: undefined,
        noodleDescription: undefined,
        noodleLocation: undefined,
        noodleDirections: undefined,
        noodleDate: undefined,
        noodleTime: undefined,
        noodleTags: [],
        noodleCoverImage: undefined,
        noodleImages: [],
        noodleImageText: [],
        noodlePrice: undefined,
        noodleMinTickets: undefined,
        noodleMaxTickets: undefined,
        noodleCutoff: undefined,
      };
    }
  }

  // Method to handle change in html input elements
  handleChange = (event) => {
    const target = event.target;
    let value = undefined;
    switch (target.type) {
      case "checkbox":
        value = target.checked;
        break;
      case "file":
        value = URL.createObjectURL(target.files[0]);
        break;
      default:
        value = target.value;
        break;
    }
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  // Method to upload images
  // Checks if there are any images that need to be uploaded
  // Return a Promise.all
  uploadImages = () => {
    // Get image list from state
    let { noodleImages } = this.state;
    // Check for local images
    if (noodleImages && noodleImages[0]) {
      return Promise.all(
        noodleImages.map((image, index) => {
          // Check if object
          // If object then image is a file object and needs to be uploaded
          if (typeof image === "object") {
            // Upload the image and get the address back as a promise
            const uploadedImagePromise = apiUploadImage(image);
            return uploadedImagePromise.then((imageAddress) => {
              // Set the link in state to be the uploaded image
              let { noodleCoverImage } = this.state;
              if (
                URL.createObjectURL(noodleCoverImage) ===
                URL.createObjectURL(image)
              ) {
                noodleCoverImage = imageAddress;
              }
              noodleImages[index] = imageAddress;
              this.setState({ noodleImages, noodleCoverImage });
              return imageAddress;
            });
          } else {
            // return Promise.resolve("Image Not Hosted");
            return image;
          }
        })
      );
    } else {
      return Promise.resolve([]);
    }
  };

  // Method to see which images can be deleted
  // Return a Promise.all
  deleteImages = () => {
    // Get the old list of images from props
    const { noodleData } = this.props;
    const { noodleID } = this.state;
    const thisNoodle = noodleData.filter((noodle) => {
      return parseInt(noodle.noodleID) === parseInt(noodleID);
    })[0];
    const { noodleImages: noodleImagesOld } = thisNoodle;
    // Get the new list of images from state
    const { noodleImages: noodleImagesNew } = this.state;
    // Go through the list of old images
    return Promise.all(
      noodleImagesOld.map((image, index) => {
        // See if the image is hosted on the api
        const { apiURL } = apiConfig();
        if (image && image.substring(0, apiURL.length) === apiURL) {
          // Check to see if it is in the new list of images
          if (!noodleImagesNew.includes(image)) {
            // Delete the image from the server
            return apiDeleteImage(image);
          } else {
            return Promise.resolve("Image Not Deleted");
          }
        } else {
          return Promise.resolve("Image Not Hosted");
        }
      })
    );
  };

  // Check if there are any images that need to be uploaded
  readyToSubmit = () => {
    const { noodleImages } = this.state;
    if (noodleImages.some((image) => typeof image === "object")) {
      return false;
    } else {
      return true;
    }
  };

  // Method to create or update a noodle
  submit = (status) => {
    switch (status) {
      case "dream":
        // Validate the required data
        if (
          this.state.noodleTitle &&
          this.state.noodleDescription &&
          this.state.noodleTags.length
        ) {
          this.createOrUpdateNoodle(status);
        } else {
          alert("You must fill in the basic information to save as a dream!");
        }
        break;
      case "event":
        // Validate the required data
        if (
          this.state.noodleTitle &&
          this.state.noodleDescription &&
          this.state.noodleTags.length &&
          this.state.userID &&
          this.state.noodleSummary &&
          this.state.noodleLocation &&
          this.state.noodleDirections &&
          this.state.noodleDate &&
          this.state.noodleTime &&
          this.state.noodleCoverImage &&
          this.state.noodlePrice &&
          this.state.noodleMinTickets &&
          this.state.noodleMaxTickets &&
          this.state.noodleCutoff
        ) {
          this.createOrUpdateNoodle(status);
        } else {
          alert("You must fill in all of the information to save as an event!");
        }
        break;
      default:
        alert("Error: Invalid Type");
        break;
    }
  };

  // Method to create or update a noodle
  createOrUpdateNoodle = (status) => {
    // Get the required data
    // Create the object to be sent to the API
    const noodleData = {
      noodleTitle: this.state.noodleTitle,
      userID: this.props.currentUserID,
      noodleStatus: status,
      noodleDescription: this.state.noodleDescription,
      noodleTags: this.state.noodleTags,
      noodleSummary: this.state.noodleSummary,
      noodleLocation: this.state.noodleLocation,
      noodleDirections: this.state.noodleDirections,
      noodleDate: this.state.noodleDate,
      noodleTime: this.state.noodleTime,
      noodleCoverImage: this.state.noodleCoverImage,
      noodleImages: this.state.noodleImages,
      noodleImageText: this.state.noodleImageText,
      noodlePrice: this.state.noodlePrice,
      noodleMinTickets: this.state.noodleMinTickets,
      noodleMaxTickets: this.state.noodleMaxTickets,
      noodleCutoff: this.state.noodleCutoff,
      noodleID: this.state.noodleID,
    };
    // Check mode
    // Send the data to the main update or create function
    if (this.state.noodleID) {
      // Edit
      // Use chained promised to keep synchronized
      this.deleteImages().then((deleteImagesResult) =>
        this.uploadImages().then((uploadImagesResult) => {
          this.props.onUpdate(status, noodleData);
        })
      );
    } else {
      // Create
      // Use chained promised to keep synchronized
      this.uploadImages().then((uploadImagesResult) => {
        this.props.onCreate(status, noodleData);
      });
    }
  };

  // Methods to update state based on child components
  // Pass these methods as props to child components

  changeTags = (noodleTags) => {
    this.setState({ noodleTags });
  };

  changeImage = (noodleCoverImage) => {
    this.setState({ noodleCoverImage });
  };

  changeImages = (noodleImages) => {
    this.setState({ noodleImages });
  };

  changeImagesText = (noodleImageText) => {
    this.setState({ noodleImageText });
  };

  setMode = (createMode) => {
    this.setState({ createMode });
  };

  // Get Derived State From Props lifecycle method
  static getDerivedStateFromProps(props, state) {
    // Set create mode to event if user selects create event in the navbar while already creating a dream
    const { type: createMode } = props.match.params;
    if (createMode === "event" && createMode !== state.createMode) {
      state.createMode = createMode;
    }
    return state;
  }

  // Render method
  render() {
    // Create an array to store data about the sections
    let sections = [];

    // Set data for the sections
    // Classes are based on the status of entered data and are used in CSS to change the appearance of finished vs unfinished sections
    sections[1 - 1] = {
      name: "Organizer Information",
      className:
        this.state.userName && this.state.userBio && this.state.userBioLong
          ? "finished"
          : "unfinished",
    };
    sections[2 - 1] = {
      name: "Basic Info",
      className:
        this.state.noodleTitle &&
        this.state.noodleSummary &&
        this.state.noodleDescription &&
        this.state.noodleTags.length
          ? "finished"
          : "unfinished",
    };
    sections[3 - 1] = {
      name: "Location",
      className:
        this.state.noodleLocation && this.state.noodleDirections
          ? "finished"
          : "unfinished",
    };
    sections[4 - 1] = {
      name: "Date and Time",
      className:
        this.state.noodleDate && this.state.noodleTime
          ? "finished"
          : "unfinished",
    };
    sections[5 - 1] = {
      name: "Upload Images",
      className: this.state.noodleCoverImage ? "finished" : "unfinished",
    };
    sections[6 - 1] = {
      name: "Create Tickets",
      className: this.state.noodlePrice ? "finished" : "unfinished",
    };
    sections[7 - 1] = {
      name: "Make It Happen",
      className:
        this.state.noodleMinTickets &&
        this.state.noodleMaxTickets &&
        this.state.noodleCutoff
          ? "finished"
          : "unfinished",
    };

    // The sections that are only shown when creating an event instead of a dream
    const eventDetails = () => {
      const { createMode } = this.state;
      if (createMode === "event") {
        return (
          <>
            <CreateSection3
              sections={sections}
              noodleLocation={this.state.noodleLocation}
              noodleDirections={this.state.noodleDirections}
              onChange={this.handleChange}
            ></CreateSection3>
            <CreateSection4
              sections={sections}
              noodleDate={this.state.noodleDate}
              noodleTime={this.state.noodleTime}
              onChange={this.handleChange}
            ></CreateSection4>
            <CreateSection5
              sections={sections}
              noodleTags={this.state.noodleTags}
              noodleCoverImage={this.state.noodleCoverImage}
              noodleImages={this.state.noodleImages}
              noodleImageText={this.state.noodleImageText}
              onChangeImage={this.changeImage}
              onChangeImages={this.changeImages}
              onChangeImagesText={this.changeImagesText}
            ></CreateSection5>
            <CreateSection6
              sections={sections}
              noodlePrice={this.state.noodlePrice}
              onChange={this.handleChange}
            ></CreateSection6>
            <CreateSection7
              sections={sections}
              noodleMinTickets={this.state.noodleMinTickets}
              noodleMaxTickets={this.state.noodleMaxTickets}
              noodleCutoff={this.state.noodleCutoff}
              onChange={this.handleChange}
            ></CreateSection7>
          </>
        );
      }
    };

    // Return the create page
    return (
      <main id="create" className={this.state.createMode}>
        <form id="create_form" onSubmit={this.handleSubmit}>
          <CreateNavProgressBar
            createMode={this.state.createMode}
            sections={sections}
          />
          <CreateSection1
            sections={sections}
            userName={this.state.userName}
            userBio={this.state.userBio}
            userBioLong={this.state.userBioLong}
            onChange={this.handleChange}
          />
          <CreateSection2
            sections={sections}
            noodleTitle={this.state.noodleTitle}
            noodleSummary={this.state.noodleSummary}
            noodleDescription={this.state.noodleDescription}
            noodleTags={this.state.noodleTags}
            onChange={this.handleChange}
            onChangeTags={this.changeTags}
          />
          {eventDetails()}
          <CreateSubmitBar
            sections={sections}
            noodleStatus={this.state.noodleStatus}
            createMode={this.state.createMode}
            setMode={this.setMode}
            onSubmit={this.submit}
            onUploadImages={this.uploadImages}
            noodleID={this.state.noodleID}
          />
        </form>
      </main>
    );
  }
}

export default CreateOrEditNoodle;
