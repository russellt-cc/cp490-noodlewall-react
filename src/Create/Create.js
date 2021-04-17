//https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa
//https://stackoverflow.com/questions/60797390/generate-random-image-by-url
//https://source.unsplash.com/
//https://allegra9.medium.com/unsplash-without-api-ab2dcdb503a0
//https://stackoverflow.com/questions/15130091/amp-character-from-api-url-not-saved-to-mysql-database

import "./Create.css";
import React from "react";
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

import CreateNavProgressBar from "./CreateNavProgressBar.js";
import CreateSection1 from "./CreateSection1.js";
import CreateSection2 from "./CreateSection2.js";
import CreateSection3 from "./CreateSection3.js";
import CreateSection4 from "./CreateSection4.js";
import CreateSection5 from "./CreateSection5.js";
import CreateSection6 from "./CreateSection6.js";
import CreateSection7 from "./CreateSection7.js";

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
      // Put data in state for editing
      this.state = {
        noodleID,
        noodleStatus: thisNoodle.noodleStatus,
        userName: userName,
        userBio: userBio,
        userBioLong: userBioLong,
        noodleTitle: thisNoodle.noodleTitle,
        noodleSummary: thisNoodle.noodleSummary
          ? thisNoodle.noodleSummary
          : undefined,
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
        noodleChangeImage: thisNoodle.noodleChangeImage,
        noodleTicketPrice: thisNoodle.noodleTicketPrice,
        noodleMinTickets: thisNoodle.noodleMinTickets,
        noodleMaxTickets: thisNoodle.noodleMaxTickets,
        noodleCutoff: thisNoodle.noodleCutoff,
        randomImageWidth: 1280,
        randomImageHeight: 720,
        noodleImageText: thisNoodle.noodleImageText,
      };
    } else {
      // Put default data in state for testing
      this.state = {
        noodleID: undefined,
        noodleStatus: noodleStatus,
        userName: userName,
        userBio: userBio,
        userBioLong: userBioLong,
        noodleTitle: undefined,
        noodleSummary: undefined,
        noodleDescription: undefined,
        noodleLocation: undefined,
        noodleDirections: undefined,
        noodleDate: undefined,
        noodleTime: undefined,
        noodleTags: [],
        noodleImage: undefined,
        noodleChangeImage: undefined,
        noodleTicketPrice: undefined,
        noodleMinTickets: undefined,
        noodleMaxTickets: undefined,
        noodleCutoff: undefined,
        randomImageWidth: 1280,
        randomImageHeight: 720,
        noodleImageText: undefined,
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
      noodleTicketPrice,
      noodleMinTickets,
      noodleMaxTickets,
      noodleCutoff,
      noodleImageText,
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
      noodleTicketPrice: noodleTicketPrice,
      noodleMinTickets: noodleMinTickets,
      noodleMaxTickets: noodleMaxTickets,
      noodleCutoff: noodleCutoff,
      noodleImageText: noodleImageText,
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
          noodleTicketPrice &&
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

  addNoodleTag = (noodleAddTag) => {
    const { noodleTags } = this.state;
    if (!noodleTags.includes(noodleAddTag)) {
      const index = noodleTags.length;
      let splicedNoodles = [...noodleTags];
      splicedNoodles.splice(index, 0, noodleAddTag);
      this.setState({ noodleTags: splicedNoodles });
    }
  };

  removeNoodleTag = (index) => {
    let splicedNoodles = [...this.state.noodleTags];
    splicedNoodles.splice(index, 1);
    this.setState({ noodleTags: splicedNoodles });
  };

  getRandomImageFromPicsum = () => {
    const { randomImageWidth, randomImageHeight } = this.state;
    // Get a random number for our image seed
    const seed = Math.floor(Math.random() * 1000);
    const randomImage =
      "https://picsum.photos/seed/" +
      seed +
      "/" +
      randomImageWidth +
      "/" +
      randomImageHeight +
      "";
    this.setState({ noodleImage: randomImage });
  };

  getRandomImageFromUnsplash = () => {
    const { randomImageWidth, randomImageHeight, noodleTags } = this.state;
    let randomImageRequest =
      "https://source.unsplash.com/random/" +
      randomImageWidth +
      "x" +
      randomImageHeight;
    // Check if we have tags
    if (noodleTags.length) {
      // Get images based on tags
      const tags = noodleTags.join();
      randomImageRequest = randomImageRequest + "/?" + tags;
    }
    // Get random image
    fetch(randomImageRequest).then((response) => {
      console.log("Request for random image succeeded");
      console.log("Outgoing Data");
      console.log(randomImageRequest);
      console.log("Incoming Data");
      console.log(response);
      const encodedURL = encodeURIComponent(response.url);
      console.log("Encoded URI");
      console.log(encodedURL);
      this.setState({ noodleImage: encodedURL });
    });
  };

  render() {
    // Get data from state
    const {
      userName,
      userBio,
      userBioLong,
      noodleSummary,
      noodleDescription,
      noodleLocation,
      noodleDirections,
      noodleTitle,
      noodleTags,
      noodleTicketPrice,
      noodleMinTickets,
      noodleMaxTickets,
      noodleCutoff,
      noodleImage,
      noodleChangeImage,
      noodleImageText,
      noodleStatus,
      noodleDate,
      noodleTime,
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
      className: this.state.noodleTicketPrice ? "finished" : "unfinished",
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
      const mode = this.state.noodleStatus;
      if (mode === "event") {
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
            <section id="images" className={sections[5 - 1].className}>
              <h1 id="section5" className={"create_section_heading"}>
                {sections[5 - 1].name}
              </h1>
              <p>
                Upload as many images as you would like to be displayed on the
                event page.
              </p>
              <div className="noodle_image_container">
                <div className="noodle_image_header_container">
                  <label>Event Image</label>
                  <button
                    type="button"
                    className="noodleImageRemoveButton"
                    onClick={() => {
                      this.setState({
                        noodleImage: undefined,
                        noodleChangeImage: undefined,
                      });
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="noodle_image_file_upload">
                  <label htmlFor="noodleImage">
                    Upload an image from your device
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="noodleImage"
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="noodle_image_set_url">
                  <label htmlFor="noodleImageLink">
                    Get an image from the internet
                  </label>
                  <Textbox
                    attributesInput={{
                      name: "noodleImageLink",
                    }}
                    value={noodleChangeImage}
                    onChange={(noodleChangeImage, e) => {
                      this.setState({ noodleChangeImage });
                    }}
                  />
                  <div className="noodle_image_button_container">
                    <button
                      type="button"
                      className="noodleImageButton"
                      onClick={() => {
                        this.setState({
                          noodleImage: noodleChangeImage,
                          noodleChangeImage: undefined,
                        });
                      }}
                    >
                      Get Image from URL
                    </button>
                    <button
                      type="button"
                      className="noodleImageButton"
                      onClick={() => {
                        this.getRandomImageFromPicsum();
                      }}
                    >
                      Get a Random Image from Picsum
                    </button>
                    <button
                      type="button"
                      className="noodleImageButton"
                      onClick={() => this.getRandomImageFromUnsplash()}
                    >
                      Get a Random Image from Unsplash
                    </button>
                  </div>
                </div>
                <div className="noodle_image_preview_container">
                  {noodleImage ? (
                    <img src={decodeURIComponent(noodleImage)} alt="Noodle" />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="noodle_image_text_container">
                  <label htmlFor="noodleImageText">
                    Enter some text to go along with the image
                  </label>
                  <Textarea
                    attributesInput={{ name: "noodleImageText", rows: 5 }}
                    value={noodleImageText}
                    onChange={(noodleImageText, e) => {
                      this.setState({ noodleImageText });
                    }}
                  />
                </div>
              </div>
            </section>
            <section id="tickets" className={sections[6 - 1].className}>
              <h1 id="section6" className="create_section_heading">
                {sections[6 - 1].name}
              </h1>
              <p>Create ticket types available for the event.</p>
              <div>
                <label htmlFor="noodleTicketPrice">Ticket Price</label>
                <div id="noodle_ticket_price_container">
                  <span>$</span>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    max="2500"
                    name="noodleTicketPrice"
                    value={noodleTicketPrice}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
            </section>
            <section id="secret_sauce" className={sections[7 - 1].className}>
              <h1 id="section7" className="create_section_heading">
                {sections[7 - 1].name}
              </h1>
              <p>Adjust the secret sauce details to make the noodle stick.</p>
              <div>
                <label htmlFor="noodleMinTickets">
                  Minimum Tickets Required
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  max="2500"
                  name="noodleMinTickets"
                  value={noodleMinTickets}
                  onChange={this.handleChange}
                ></input>
                <label htmlFor="noodleMaxTickets">
                  Maximum Tickets Available
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  max="2500"
                  name="noodleMaxTickets"
                  value={noodleMaxTickets}
                  onChange={this.handleChange}
                ></input>
                <label htmlFor="noodleCutoff">Cutoff Date</label>
                <input
                  type="date"
                  name="noodleCutoff"
                  value={noodleCutoff}
                  onChange={this.handleChange}
                ></input>
              </div>
            </section>
          </>
        );
      }
    };

    const createEventButton = () => {
      if (noodleStatus === "event") {
        return (
          <button
            id="create_event_button"
            className={`noodle_button ${
              sections[1 - 1].className === "finished" &&
              sections[2 - 1].className === "finished" &&
              sections[3 - 1].className === "finished" &&
              sections[4 - 1].className === "finished" &&
              sections[5 - 1].className === "finished" &&
              sections[6 - 1].className === "finished" &&
              sections[7 - 1].className === "finished"
                ? "finished"
                : "unfinished"
            }`}
            name="create_event"
            type="button"
            onClick={() => this.create("event")}
          >
            Make it Happen
          </button>
        );
      } else {
        return (
          <button
            id="create_event_button"
            className="noodle_button"
            name="create_event"
            type="button"
            onClick={() => this.setState({ noodleStatus: "event" })}
          >
            Show All
          </button>
        );
      }
    };

    // Return the create page
    return (
      <main id="create" className={noodleStatus}>
        <form id="create_form" onSubmit={this.handleSubmit}>
          <CreateNavProgressBar mode={noodleStatus} sections={sections} />
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
            onAddTag={this.addNoodleTag}
            onRemoveTag={this.removeNoodleTag}
          />
          {eventDetails()}
          <div id="create_submit_bar">
            <button
              id="create_dream_button"
              className={`noodle_button ${
                sections[1 - 1].className === "finished" &&
                sections[2 - 1].className === "finished"
                  ? "finished"
                  : "unfinished"
              }`}
              name="create_dream"
              type="button"
              onClick={() => this.create("dream")}
            >
              Save as Dream
            </button>
            {createEventButton()}
          </div>
        </form>
      </main>
    );
  }
}

export default Create;
