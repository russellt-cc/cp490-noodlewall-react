//https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa

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

    // Put default data in state for testing
    this.state = {
      noodleStatus: noodleStatus,
      userName: userName,
      userBio: userBio,
      userBioLong: userBioLong,
      noodleTitle: "Test Event",
      noodleSummary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum. Suspendisse pulvinar in ex a posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      noodleDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum. Suspendisse pulvinar in ex a posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras varius arcu tellus, et eleifend turpis porta id. Aliquam commodo leo leo, eget rhoncus enim dictum nec. Morbi porta elementum ex sollicitudin porttitor.",
      noodleLocation: "Nowhere",
      noodleDirections: "There aren't any.",
      noodleDate: "2021-05-30",
      noodleTime: "12:00",
      noodleTags: ["test1", "test2", "test3"],
      noodleAddTag: "noodle",
      noodleImage: "https://picsum.photos/1280/720",
      noodleTicketPrice: "10.00",
      noodleMinTickets: 5,
      noodleMaxTickets: 10,
      noodleCutoff: "2021-04-30",
    };
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

  handleSubmit = (event) => {
    if (event.nativeEvent.submitter.name === "create_dream") {
      alert("Create dream goes here!");
    } else if (event.nativeEvent.submitter.name === "create_event") {
      alert("Create event goes here!");
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
    } = this.state;

    // Set data for the sections
    const section1 = {
      name: "Organizer Information",
      className:
        this.state.userName !== "" &&
        this.state.userBio !== "" &&
        this.state.userBioLong !== ""
          ? "finished"
          : "unfinished",
    };
    const section2 = {
      name: "Basic Info",
      className:
        this.state.noodleTitle !== "" &&
        this.state.noodleSummary !== "" &&
        this.state.noodleDescription !== "" &&
        this.state.noodleTags.length !== 0
          ? "finished"
          : "unfinished",
    };
    const section3 = {
      name: "Location",
      className:
        this.state.noodleLocation !== undefined &&
        this.state.noodleLocation !== "" &&
        this.state.noodleDirections !== undefined &&
        this.state.noodleDirections !== ""
          ? "finished"
          : "unfinished",
    };
    const section4 = {
      name: "Date and Time",
      className:
        this.state.noodleDate !== undefined &&
        this.state.noodleDate !== "" &&
        this.state.noodleTime !== undefined &&
        this.state.noodleTime !== ""
          ? "finished"
          : "unfinished",
    };
    const section5 = {
      name: "Upload Images",
      className:
        this.state.noodleImage !== undefined && this.state.noodleImage !== ""
          ? "finished"
          : "unfinished",
    };
    const section6 = {
      name: "Create Tickets",
      className:
        this.state.noodleTicketPrice !== undefined &&
        this.state.noodleTicketPrice !== ""
          ? "finished"
          : "unfinished",
    };
    const section7 = {
      name: "Make It Happen",
      className:
        this.state.noodleMinTickets !== undefined &&
        this.state.noodleMinTickets !== "" &&
        this.state.noodleMaxTickets !== undefined &&
        this.state.noodleMaxTickets !== "" &&
        this.state.noodleCutoff !== undefined &&
        this.state.noodleCutoff !== ""
          ? "finished"
          : "unfinished",
    };

    // Return the create page
    return (
      <main id="create">
        <form id="create_form" onSubmit={this.handleSubmit}>
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
          <section id="organizer_information" className={section1.className}>
            <h1 id="section1" className="create_section_heading">
              {section1.name}
            </h1>
            <p>Enter some information about who is organizing the event.</p>
            <div>
              <label for="userName">Organizer Name</label>
              <Textbox
                attributesInput={{ name: "userName" }}
                value={userName}
                onChange={(userName, e) => {
                  this.setState({ userName });
                }}
              />
            </div>
            <div>
              <label for="userBio">Organizer Detail Short</label>
              <Textarea
                attributesInput={{ name: "userBio", rows: 3 }}
                value={userBio}
                onChange={(userBio, e) => {
                  this.setState({ userBio });
                }}
              />
            </div>
            <div>
              <label for="userBioLong">Organizer Detail Long</label>
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
              <label for="noodleTitle">Event Name</label>
              <Textbox
                attributesInput={{ name: "noodleTitle" }}
                value={noodleTitle}
                onChange={(noodleTitle, e) => {
                  this.setState({ noodleTitle });
                }}
              />
            </div>
            <div>
              <label for="noodleSummary">Event Summary</label>
              <Textarea
                attributesInput={{ name: "noodleSummary", rows: 3 }}
                value={noodleSummary}
                onChange={(noodleSummary, e) => {
                  this.setState({ noodleSummary });
                }}
              />
            </div>
            <div>
              <label for="noodleDescription">Event Description</label>
              <Textarea
                attributesInput={{ name: "noodleDescription", rows: 5 }}
                value={noodleDescription}
                onChange={(noodleDescription, e) => {
                  this.setState({ noodleDescription });
                }}
              />
            </div>
            <div id="noodle_tags_container">
              <label for="noodleAddTag">Event Tags</label>
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
                    <li>
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
          <section id="location" className={section3.className}>
            <h1 id="section3" className="create_section_heading">
              {section3.name}
            </h1>
            <p>Where is your event located?</p>
            <div>
              <label for="noodleLocation">Event Location</label>
              <Textbox
                attributesInput={{ name: "noodleLocation" }}
                value={noodleLocation}
                onChange={(noodleLocation, e) => {
                  this.setState({ noodleLocation });
                }}
              />
              <label for="noodleDirections">Event Directions</label>
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
              <label for="noodleDate">Event Date</label>
              <input
                type="date"
                name="noodleDate"
                value={this.state.noodleDate}
                onChange={this.handleChange}
              ></input>
            </div>
            <div>
              <label for="noodleTime">Event Time</label>
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
            <div>
              <label for="noodleImage">Event Image</label>
              <input
                type="file"
                accept="image/*"
                name="noodleImage"
                onChange={this.handleChange}
              ></input>
              <img src={this.state.noodleImage} />
            </div>
          </section>
          <section id="tickets" className={section6.className}>
            <h1 id="section6" className="create_section_heading">
              {section6.name}
            </h1>
            <p>Create ticket types available for the event.</p>
            <div>
              <label for="noodleTicketPrice">Ticket Price</label>
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
          <section id="secret_sauce" class={section7.className}>
            <h1 id="section7" className="create_section_heading">
              {section7.name}
            </h1>
            <p>Adjust the secret sauce details to make the noodle stick.</p>
            <div>
              <label for="noodleMinTickets">Minimum Tickets Required</label>
              <input
                type="number"
                min="1"
                step="1"
                max="2500"
                name="noodleMinTickets"
                value={noodleMinTickets}
                onChange={this.handleChange}
              ></input>
              <label for="noodleMaxTickets">Maximum Tickets Available</label>
              <input
                type="number"
                min="1"
                step="1"
                max="2500"
                name="noodleMaxTickets"
                value={noodleMaxTickets}
                onChange={this.handleChange}
              ></input>
              <label for="noodleCutoff">Cutoff Date</label>
              <input
                type="date"
                name="noodleCutoff"
                value={noodleCutoff}
                onChange={this.handleChange}
              ></input>
            </div>
          </section>
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
              onClick={() => alert("Create Dream")}
            >
              Save as Dream
            </button>
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
              onClick={() => alert("Create Event")}
            >
              Make it Happen
            </button>
          </div>
        </form>
      </main>
    );
  }
}

export default Create;
