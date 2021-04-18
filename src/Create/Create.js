import "./Create.css";
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
class Create extends React.Component {
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
      console.log("Editing noodle");
      console.log(thisNoodle);
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
        noodleImage: thisNoodle.noodleImage,
        noodleImages: thisNoodle.noodleImages
          ? thisNoodle.noodleImages
          : thisNoodle.noodleImage
          ? [thisNoodle.noodleImage]
          : [],
        noodleImagesText: thisNoodle.noodleImagesText
          ? thisNoodle.noodleImagesText
          : thisNoodle.noodleImage
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
        noodleImage: undefined,
        noodleImages: [],
        noodleImagesText: [],
        noodlePrice: undefined,
        noodleMinTickets: undefined,
        noodleMaxTickets: undefined,
        noodleCutoff: undefined,
      };
    }
  }

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
      noodleImage,
      noodleImages,
      noodleImagesText,
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
      noodleImage: noodleImage,
      noodleImages: noodleImages,
      noodleImagesText: noodleImagesText,
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
          noodleID
            ? this.props.onUpdate(status, noodleData)
            : this.props.onCreate(status, noodleData);
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
          noodleImage &&
          noodlePrice &&
          noodleMinTickets &&
          noodleMaxTickets &&
          noodleCutoff
        ) {
          // Check mode
          // Send the data to the main update or create function
          noodleID
            ? this.props.onUpdate(status, noodleData)
            : this.props.onCreate(status, noodleData);
        } else {
          alert("You must fill in all of the information to save as an event!");
        }
        break;
      default:
        alert("Error: Invalid Type");
        break;
    }
  };

  changeTags = (noodleTags) => {
    this.setState({ noodleTags });
  };

  changeImage = (noodleImage) => {
    this.setState({ noodleImage });
  };

  changeImages = (noodleImages) => {
    this.setState({ noodleImages });
  };

  changeImagesText = (noodleImagesText) => {
    this.setState({ noodleImagesText });
  };

  setMode = (createMode) => {
    this.setState({ createMode });
  };

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
      noodleImage,
      noodleImages,
      noodleImagesText,
      noodleStatus,
      noodleDate,
      noodleTime,
      noodleID,
    } = this.state;

    let sections = [];

    // Set data for the sections
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
      className: this.state.noodleImage ? "finished" : "unfinished",
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
              noodleImage={noodleImage}
              noodleImages={noodleImages}
              noodleImagesText={noodleImagesText}
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
            noodleID={noodleID}
          />
        </form>
      </main>
    );
  }
}

export default Create;
