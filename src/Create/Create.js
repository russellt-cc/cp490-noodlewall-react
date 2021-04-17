//https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa
//https://stackoverflow.com/questions/60797390/generate-random-image-by-url

import "./Create.css";
import React from "react";
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

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
        noodleAddTag: thisNoodle.noodleAddTag,
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
        noodleAddTag: undefined,
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

  addNoodleTag = () => {
    const { noodleTags, noodleAddTag } = this.state;
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
      noodleAddTag,
      noodleTicketPrice,
      noodleMinTickets,
      noodleMaxTickets,
      noodleCutoff,
      noodleImage,
      noodleChangeImage,
      randomImageWidth,
      randomImageHeight,
      noodleImageText,
      noodleStatus,
    } = this.state;

    // Set data for the sections
    const section1 = {
      name: "Organizer Information",
      className:
        this.state.userName && this.state.userBio && this.state.userBioLong
          ? "finished"
          : "unfinished",
    };
    const section2 = {
      name: "Basic Info",
      className:
        this.state.noodleTitle &&
        this.state.noodleSummary &&
        this.state.noodleDescription &&
        this.state.noodleTags.length
          ? "finished"
          : "unfinished",
    };
    const section3 = {
      name: "Location",
      className:
        this.state.noodleLocation && this.state.noodleDirections
          ? "finished"
          : "unfinished",
    };
    const section4 = {
      name: "Date and Time",
      className:
        this.state.noodleDate && this.state.noodleTime
          ? "finished"
          : "unfinished",
    };
    const section5 = {
      name: "Upload Images",
      className: this.state.noodleImage ? "finished" : "unfinished",
    };
    const section6 = {
      name: "Create Tickets",
      className: this.state.noodleTicketPrice ? "finished" : "unfinished",
    };
    const section7 = {
      name: "Make It Happen",
      className:
        this.state.noodleMinTickets &&
        this.state.noodleMaxTickets &&
        this.state.noodleCutoff
          ? "finished"
          : "unfinished",
    };

    const createNavProgressBar = () => {
      const mode = this.state.noodleStatus;
      if (mode === "event") {
        return (
          <div id="create_nav_progress_bar">
            <div
              id="create_nav_progress_bar_line"
              className={`${
                section1.className === "finished" &&
                section2.className === "finished" &&
                section3.className === "finished" &&
                section4.className === "finished" &&
                section5.className === "finished" &&
                section6.className === "finished" &&
                section7.className === "finished"
                  ? "finished"
                  : "unfinished"
              }`}
            ></div>
            <div id="create_nav_progress_bar_buttons">
              <div>
                <a href="#section1" className={section1.className}>
                  1
                </a>
                <p>{section1.name}</p>
              </div>
              <div>
                <a href="#section2" className={section2.className}>
                  2
                </a>
                <p>{section2.name}</p>
              </div>
              <div>
                <a href="#section3" className={section3.className}>
                  3
                </a>
                <p>{section3.name}</p>
              </div>
              <div>
                <a href="#section4" className={section4.className}>
                  4
                </a>
                <p>{section4.name}</p>
              </div>
              <div>
                <a href="#section5" className={section5.className}>
                  5
                </a>
                <p>{section5.name}</p>
              </div>
              <div>
                <a href="#section6" className={section6.className}>
                  6
                </a>
                <p>{section6.name}</p>
              </div>
              <div>
                <a href="#section7" className={section7.className}>
                  7
                </a>
                <p>{section7.name}</p>
              </div>
            </div>
          </div>
        );
      }
    };

    const eventDetails = () => {
      const mode = this.state.noodleStatus;
      if (mode === "event") {
        return (
          <>
            <section id="location" className={section3.className}>
              <h1 id="section3" className="create_section_heading">
                {section3.name}
              </h1>
              <p>Where is your event located?</p>
              <div>
                <label htmlFor="noodleLocation">Event Location</label>
                <Textbox
                  attributesInput={{ name: "noodleLocation" }}
                  value={noodleLocation}
                  onChange={(noodleLocation, e) => {
                    this.setState({ noodleLocation });
                  }}
                />
                <label htmlFor="noodleDirections">Event Directions</label>
                <Textarea
                  attributesInput={{ name: "noodleDirections", rows: 5 }}
                  value={noodleDirections}
                  onChange={(noodleDirections, e) => {
                    this.setState({ noodleDirections });
                  }}
                />
              </div>
            </section>
            <section id="date_time" className={section4.className}>
              <h1 id="section4" className="create_section_heading">
                {section4.name}
              </h1>
              <p>Set the date and time of the event.</p>
              <div>
                <label htmlFor="noodleDate">Event Date</label>
                <input
                  type="date"
                  name="noodleDate"
                  value={this.state.noodleDate}
                  onChange={this.handleChange}
                ></input>
              </div>
              <div>
                <label htmlFor="noodleTime">Event Time</label>
                <input
                  type="time"
                  name="noodleTime"
                  value={this.state.noodleTime}
                  onChange={this.handleChange}
                ></input>
              </div>
            </section>
            <section id="images" className={section5.className}>
              <h1 id="section5" className={"create_section_heading"}>
                {section5.name}
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
                      }}
                    >
                      Get a Random Image from Picsum
                    </button>
                    <button
                      type="button"
                      className="noodleImageButton"
                      onClick={() => {
                        // Get a random number for our image seed
                        const seed = Math.floor(Math.random() * 1000);
                        const randomImage =
                          "https://source.unsplash.com/random/" +
                          randomImageWidth +
                          "x" +
                          randomImageHeight +
                          "?sig=" +
                          seed;
                        this.setState({ noodleImage: randomImage });
                      }}
                    >
                      Get a Random Image from Unsplash
                    </button>
                  </div>
                </div>
                <div className="noodle_image_preview_container">
                  {noodleImage ? <img src={noodleImage} alt="Noodle" /> : <></>}
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
            <section id="tickets" className={section6.className}>
              <h1 id="section6" className="create_section_heading">
                {section6.name}
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
            <section id="secret_sauce" className={section7.className}>
              <h1 id="section7" className="create_section_heading">
                {section7.name}
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
              section1.className === "finished" &&
              section2.className === "finished" &&
              section3.className === "finished" &&
              section4.className === "finished" &&
              section5.className === "finished" &&
              section6.className === "finished" &&
              section7.className === "finished"
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
      <main id="create" class={noodleStatus}>
        <form id="create_form" onSubmit={this.handleSubmit}>
          {createNavProgressBar()}
          <section id="organizer_information" className={section1.className}>
            <h1 id="section1" className="create_section_heading">
              {section1.name}
            </h1>
            <p>Enter some information about who is organizing the event.</p>
            <div>
              <label htmlFor="userName">Organizer Name</label>
              <Textbox
                attributesInput={{ name: "userName" }}
                value={userName}
                onChange={(userName, e) => {
                  this.setState({ userName });
                }}
              />
            </div>
            <div>
              <label htmlFor="userBio">Organizer Detail Short</label>
              <Textarea
                attributesInput={{ name: "userBio", rows: 3 }}
                value={userBio}
                onChange={(userBio, e) => {
                  this.setState({ userBio });
                }}
              />
            </div>
            <div>
              <label htmlFor="userBioLong">Organizer Detail Long</label>
              <Textarea
                attributesInput={{ name: "userBioLong", rows: 5 }}
                value={userBioLong}
                onChange={(userBioLong, e) => {
                  this.setState({ userBioLong });
                }}
              />
            </div>
          </section>
          <section id="the_basics" className={section2.className}>
            <h1 id="section2" className="create_section_heading">
              {section2.name}
            </h1>
            <p>
              Enter the name of the event and some essential details about it.
            </p>
            <div>
              <label htmlFor="noodleTitle">Event Name</label>
              <Textbox
                attributesInput={{ name: "noodleTitle" }}
                value={noodleTitle}
                onChange={(noodleTitle, e) => {
                  this.setState({ noodleTitle });
                }}
              />
            </div>
            <div>
              <label htmlFor="noodleSummary">Event Summary</label>
              <Textarea
                attributesInput={{ name: "noodleSummary", rows: 3 }}
                value={noodleSummary}
                onChange={(noodleSummary, e) => {
                  this.setState({ noodleSummary });
                }}
              />
            </div>
            <div>
              <label htmlFor="noodleDescription">Event Description</label>
              <Textarea
                attributesInput={{ name: "noodleDescription", rows: 5 }}
                value={noodleDescription}
                onChange={(noodleDescription, e) => {
                  this.setState({ noodleDescription });
                }}
              />
            </div>
            <div id="noodle_tags_container">
              <label htmlFor="noodleAddTag">Event Tags</label>
              <div id="noodle_add_tags">
                <Textbox
                  attributesInput={{
                    name: "noodleAddTag",
                    id: "noodleAddTagInput",
                  }}
                  value={noodleAddTag}
                  onChange={(noodleAddTag, e) => {
                    this.setState({ noodleAddTag });
                  }}
                />
                <button
                  type="button"
                  id="noodleAddTagButton"
                  onClick={() => {
                    this.addNoodleTag();
                  }}
                >
                  Add Tag
                </button>
              </div>
              <ul id="noodleTagsList">
                {noodleTags.map((item, i) => {
                  return (
                    <li key={i}>
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => {
                          this.removeNoodleTag(i);
                        }}
                      >
                        X
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {eventDetails()}

          <div id="create_submit_bar">
            <button
              id="create_dream_button"
              className={`noodle_button ${
                section1.className === "finished" &&
                section2.className === "finished"
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
