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

  // Method to upload an image to api
  // Returns a promise with the image URL
  apiUploadImage = (imageFile) => {
    const { apiConfig } = this.props;
    const { apiURL, apiNoodlePath, apiNoodleUploadImage } = apiConfig;
    const formData = new FormData();
    formData.append("image", imageFile);
    return fetch(apiURL + apiNoodlePath + apiNoodleUploadImage, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        return res.imageAddress;
      });
  };

  // Method to upload images
  // Checks if there are any images that need to be uploaded
  uploadImages = () => {
    let { noodleImages } = this.state;
    // Check for local images
    noodleImages.forEach((image, index) => {
      // Check if object
      if (typeof image === "object") {
        const uploadedImagePromise = this.apiUploadImage(image);
        uploadedImagePromise.then(
          (imageAddress) => {
            let { noodleCoverImage } = this.state;
            if (noodleCoverImage === image) {
              noodleCoverImage = imageAddress;
            }
            noodleImages[index] = imageAddress;
            this.setState({ noodleImages, noodleCoverImage });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  };

  // Method to see which images can be deleted
  deleteDeletedImages = () => {
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
    noodleImagesOld.forEach((image, index) => {
      // See if the image is hosted on the api
      const { apiConfig } = this.props;
      const { apiURL } = apiConfig;
      if (
        image.substring(0, apiURL.length) ===
        "http://gatkinson.site/noodlewall/"
      ) {
        // Check to see if it is in the new list of images
        if (!noodleImagesNew.includes(image)) {
          // Delete the image from the server
          this.apiDeleteImage(image);
        }
      }
    });
  };

  // Method to delete a hosted image
  apiDeleteImage = (imageAddress) => {
    const { apiConfig } = this.props;
    const { apiURL, apiNoodlePath, apiNoodleDeleteImage } = apiConfig;
    fetch(apiURL + apiNoodlePath + apiNoodleDeleteImage, {
      method: "POST",
      body: { imageAddress },
    }).then(
      (response) => {
        // console.log(response);
      },
      (error) => {
        // console.log(error);
      }
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
  create = (status) => {
    // Get the required data
    const {
      noodleID,
      noodleTitle,
      noodleDescription,
      noodleTags,
      noodleSummary,
      noodleLocation,
      noodleDirections,
      noodleDate,
      noodleTime,
      noodleCoverImage,
      noodleImages,
      noodleImageText,
      noodlePrice,
      noodleMinTickets,
      noodleMaxTickets,
      noodleCutoff,
    } = this.state;
    const { currentUserID: userID } = this.props;
    // Create the object to be sent to the API
    const noodleData = {
      noodleTitle: noodleTitle,
      userID: userID,
      noodleStatus: status,
      noodleDescription: noodleDescription,
      noodleTags: noodleTags,
      noodleSummary: noodleSummary,
      noodleLocation: noodleLocation,
      noodleDirections: noodleDirections,
      noodleDate: noodleDate,
      noodleTime: noodleTime,
      noodleCoverImage: noodleCoverImage,
      noodleImages: noodleImages,
      noodleImageText: noodleImageText,
      noodlePrice: noodlePrice,
      noodleMinTickets: noodleMinTickets,
      noodleMaxTickets: noodleMaxTickets,
      noodleCutoff: noodleCutoff,
      noodleID: noodleID,
    };
    switch (status) {
      case "dream":
        // Validate the required data
        if (noodleTitle && noodleDescription && noodleTags.length) {
          // Check mode
          // Send the data to the main update or create function
          if (noodleID) {
            this.props.onUpdate(status, noodleData);
            this.deleteDeletedImages();
          } else {
            this.props.onCreate(status, noodleData);
          }
        } else {
          alert("You must fill in the basic information to save as a dream!");
        }
        break;
      case "event":
        // Validate the required data
        if (
          noodleTitle &&
          noodleDescription &&
          noodleTags.length &&
          userID &&
          noodleSummary &&
          noodleLocation &&
          noodleDirections &&
          noodleDate &&
          noodleTime &&
          noodleCoverImage &&
          noodlePrice &&
          noodleMinTickets &&
          noodleMaxTickets &&
          noodleCutoff
        ) {
          // Check mode
          // Send the data to the main update or create function
          if (noodleID) {
            this.props.onUpdate(status, noodleData);
            this.deleteDeletedImages();
          } else {
            this.props.onCreate(status, noodleData);
          }
        } else {
          alert("You must fill in all of the information to save as an event!");
        }
        break;
      default:
        alert("Error: Invalid Type");
        break;
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
    // Get data from state
    const {
      createMode,
      userName,
      userBio,
      userBioLong,
      noodleSummary,
      noodleDescription,
      noodleLocation,
      noodleDirections,
      noodleTitle,
      noodleTags,
      noodlePrice,
      noodleMinTickets,
      noodleMaxTickets,
      noodleCutoff,
      noodleCoverImage,
      noodleImages,
      noodleImageText,
      noodleStatus,
      noodleDate,
      noodleTime,
      noodleID,
    } = this.state;

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
              noodleLocation={noodleLocation}
              noodleDirections={noodleDirections}
              onChange={this.handleChange}
            ></CreateSection3>
            <CreateSection4
              sections={sections}
              noodleDate={noodleDate}
              noodleTime={noodleTime}
              onChange={this.handleChange}
            ></CreateSection4>
            <CreateSection5
              sections={sections}
              noodleTags={noodleTags}
              noodleCoverImage={noodleCoverImage}
              noodleImages={noodleImages}
              noodleImageText={noodleImageText}
              onChangeImage={this.changeImage}
              onChangeImages={this.changeImages}
              onChangeImagesText={this.changeImagesText}
            ></CreateSection5>
            <CreateSection6
              sections={sections}
              noodlePrice={noodlePrice}
              onChange={this.handleChange}
            ></CreateSection6>
            <CreateSection7
              sections={sections}
              noodleMinTickets={noodleMinTickets}
              noodleMaxTickets={noodleMaxTickets}
              noodleCutoff={noodleCutoff}
              onChange={this.handleChange}
            ></CreateSection7>
          </>
        );
      }
    };

    // Return the create page
    return (
      <main id="create" className={createMode}>
        <form id="create_form" onSubmit={this.handleSubmit}>
          <CreateNavProgressBar createMode={createMode} sections={sections} />
          <CreateSection1
            sections={sections}
            userName={userName}
            userBio={userBio}
            userBioLong={userBioLong}
            onChange={this.handleChange}
          />
          <CreateSection2
            sections={sections}
            noodleTitle={noodleTitle}
            noodleSummary={noodleSummary}
            noodleDescription={noodleDescription}
            noodleTags={noodleTags}
            onChange={this.handleChange}
            onChangeTags={this.changeTags}
          />
          {eventDetails()}
          <CreateSubmitBar
            sections={sections}
            noodleStatus={noodleStatus}
            createMode={createMode}
            setMode={this.setMode}
            onCreate={this.create}
            onUploadImages={this.uploadImages}
            readyToSubmit={this.readyToSubmit}
            noodleID={noodleID}
          />
        </form>
      </main>
    );
  }
}

export default CreateOrEditNoodle;
