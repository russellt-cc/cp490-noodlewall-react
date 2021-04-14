import "./css/Details.css";
import React from "react";
import { Link } from "react-router-dom";
import NoodleOverlay from "../NoodleOverlay.js";
import { DateTime, Interval } from "luxon";

class Details extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    // Get the noodle and host details
    // Covert to zero-based index
    // Use object destructuring to get constants
    const { id: noodleID } = this.props.match.params;
    const { noodleData, userData } = this.props;
    // Get the right details page
    // filter returns an array so we need to get the first index which is 0
    const thisNoodle = noodleData.filter((noodle) => {
      return noodle.noodleID === parseInt(noodleID);
    })[0];
    // Get the right user details
    const thisHost = userData.filter((user) => {
      return user.userID === thisNoodle.userID;
    })[0];
    // Save this noodle in state so we can modify it
    this.state = {
      thisNoodle: thisNoodle,
      thisHost: thisHost,
    };
  }
  // Method to handle the buy button
  buyTicket = () => {
    let thisNoodle = this.state.thisNoodle;
    thisNoodle.noodleTicketsSold++;
    this.setState({ thisNoodle: thisNoodle });
  };
  // Method to determine classes of the status bar
  getStatusClasses = () => {
    const {
      noodleStatus,
      noodleMinTickets,
      noodleMaxTickets,
      noodleTicketsSold,
    } = this.state.thisNoodle;
    let status_classes = {
      dream: "notChecked",
      notHappening: "notChecked",
      happening: "notChecked",
      soldOut: "notChecked",
    };
    if (noodleStatus === "dream") {
      status_classes.dream = "passed checked";
    } else if (noodleTicketsSold < noodleMinTickets) {
      status_classes.dream = "passed";
      status_classes.notHappening = "passed checked";
    } else if (noodleTicketsSold < noodleMaxTickets) {
      status_classes.dream = "passed";
      status_classes.notHappening = "passed";
      status_classes.happening = "passed checked";
    } else {
      status_classes.dream = "passed";
      status_classes.notHappening = "passed";
      status_classes.happening = "passed";
      status_classes.soldOut = "passed checked";
    }
    return status_classes;
  };
  // Method to determine classes of page elements
  getElementClasses = () => {
    const {
      noodleStatus,
      noodleLocation,
      noodleDate,
      noodleTime,
    } = this.state.thisNoodle;
    const visible = "visible";
    const hidden = "hidden";
    let element_classes = {
      noodleDaysLeft: visible,
      noodleLocation: visible,
      noodleDate: visible,
      noodleTime: visible,
      noodleTicketPrice: visible,
      noodleMinTickets: visible,
      noodleMaxTickets: visible,
      noodleTicketsSold: visible,
      noodleBuyButton: visible,
    };
    if (noodleStatus === "dream") {
      element_classes.noodleDaysLeft = hidden;
      element_classes.noodleTicketPrice = hidden;
      element_classes.noodleMinTickets = hidden;
      element_classes.noodleMaxTickets = hidden;
      element_classes.noodleTicketsSold = hidden;
      element_classes.noodleBuyButton = hidden;
    }
    if (noodleLocation == null) element_classes.noodleLocation = hidden;
    if (noodleDate == null) element_classes.noodleDate = hidden;
    if (noodleTime == null) element_classes.noodleTime = hidden;
    return element_classes;
  };
  // Methods to determine a status message
  getStatusMessage1 = () => {
    const {
      noodleStatus: status,
      noodleTicketsSold: sold,
      noodleMinTickets: min,
      noodleMaxTickets: max,
    } = this.state.thisNoodle;
    if (status === "dream") {
      return (
        <p className="status_message_1">
          Status:{" "}
          <span className="dreams_color_text">
            <strong>Dream Event</strong>
          </span>
        </p>
      );
    } else if (sold < min) {
      return (
        <p className="status_message_1">
          Status:{" "}
          <span className="dreams_color_text">
            <strong>Not Happening</strong>
          </span>{" "}
          (Yet!)
        </p>
      );
    } else if (sold < max) {
      return (
        <p className="status_message_1">
          Status:{" "}
          <span className="events_color_text">
            <strong>Happening</strong>
          </span>
        </p>
      );
    } else {
      return (
        <p className="status_message_1">
          Status:{" "}
          <span className="events_color_text">
            <strong>Sold Out</strong>
          </span>
        </p>
      );
    }
  };
  getStatusMessage2 = () => {
    const {
      noodleStatus: status,
      noodleTicketsSold: sold,
      noodleMinTickets: min,
      noodleMaxTickets: max,
    } = this.state.thisNoodle;
    if (status === "dream") {
      return (
        <p className="status_message_2">
          Like this{" "}
          <span className="dreams_color_text">
            <strong>Dream Event</strong>
          </span>{" "}
          to show your support!
        </p>
      );
    } else if (sold < min) {
      const diff = min - sold;
      return (
        <p className="status_message_2">
          Only{" "}
          <span class="dreams_color_text">
            <strong>{diff}</strong>
          </span>{" "}
          ticket
          {diff > 1 ? "s" : ""} left to make it happen!
        </p>
      );
    } else if (sold < max) {
      const diff = max - sold;
      return (
        <p className="status_message_2">
          Only{" "}
          <span class="events_color_text">
            <strong>{diff}</strong>
          </span>{" "}
          ticket{diff > 1 ? "s" : ""} remaining!
        </p>
      );
    } else {
      return (
        <p className="status_message_2">
          This event is all{" "}
          <span className="events_color_text">
            <strong>Sold Out!</strong>
          </span>
        </p>
      );
    }
  };
  // Method to determine the days left
  getDaysLeft = () => {
    const {
      noodleStatus,
      noodleTicketsSold,
      noodleMinTickets,
      noodleCutoff,
      noodleDate,
    } = this.state.thisNoodle;
    let wholeDaysLeft = 0;
    if (noodleStatus === "event" && noodleTicketsSold < noodleMinTickets) {
      // Determine the days left to make it happen
      const now = DateTime.now();
      const cutoff = DateTime.fromFormat(noodleCutoff, "yyyy-MM-dd");
      const interval = Interval.fromDateTimes(now, cutoff);
      const daysLeft = interval.length("days");
      wholeDaysLeft = parseInt(daysLeft);
    } else if (noodleStatus === "event") {
      // Determine the days left until the event
      const now = DateTime.now();
      const event = DateTime.fromFormat(noodleDate, "yyyy-MM-dd");
      const interval = Interval.fromDateTimes(now, event);
      const daysLeft = interval.length("days");
      wholeDaysLeft = parseInt(daysLeft);
    }
    return wholeDaysLeft;
  };
  // Method to get the intro section
  getIntro = () => {
    // Destructure the details and rename user id to host id
    const {
      noodleTitle,
      noodleStatus,
      noodleImage,
      noodleLocation,
      noodleDate,
      noodleTime,
      noodlePrice,
      noodleMinTickets,
      noodleMaxTickets,
      noodleTicketsSold,
      noodleTags,
      userID: hostID,
    } = this.state.thisNoodle;
    // Determine the days left
    const wholeDaysLeft = this.getDaysLeft();
    // Destructure the user details and rename
    const { userName: hostName } = this.state.thisHost;
    // Get the type for tag links
    const filterType = this.props.match.params.filterType;
    // Get status classes
    const status_classes = this.getStatusClasses();
    // Get element classes
    const element_classes = this.getElementClasses();
    return (
      <section id="details_intro">
        <div id="details_intro_left" className="details_intro_column">
          <h1>{noodleTitle}</h1>
          <p
            className={
              wholeDaysLeft > 0 ? element_classes.noodleDaysLeft : "hidden"
            }
          >
            {noodleTicketsSold < noodleMinTickets
              ? "Days Left to Make it Happen"
              : "Days Left Until The Event"}
            :{" "}
            <span
              className={
                noodleTicketsSold < noodleMinTickets
                  ? "dreams_color_text"
                  : "events_color_text"
              }
            >
              <strong>{wholeDaysLeft}</strong>
            </span>
          </p>
          <div id="details_image_container">
            <img src={noodleImage} alt="Noodle"></img>
            {NoodleOverlay(noodleStatus)}
          </div>
          <div className="details_status_container_container">
            {this.getStatusMessage1()}
            <div className="details_status_container">
              <span
                className={`details_status_dream ${status_classes.dream} ${
                  noodleStatus !== "dream" &&
                  noodleTicketsSold < noodleMaxTickets
                    ? "unfinished"
                    : "finished"
                }`}
                onClick={() => {
                  alert(
                    "Dream events allow an organizer to gauge interest in an idea before starting to sell tickets."
                  );
                }}
              >
                Dream
              </span>
              <span
                className={`details_status_not_happening ${status_classes.notHappening}`}
                onClick={() => {
                  alert(
                    "Not happening events have not sold enough tickets to meet the minimum required for the event to take place."
                  );
                }}
              >
                Not Happening
              </span>
              <span
                className={`details_status_happening ${status_classes.happening}`}
                onClick={() => {
                  alert(
                    "Happening events have sold the minimum number for the event to take place but still have more available."
                  );
                }}
              >
                Happening
              </span>
              <span
                className={`details_status_sold_out ${status_classes.soldOut} ${
                  noodleStatus === "dream" ? "dream" : "event"
                }`}
                onClick={() =>
                  alert(
                    "Sold out events are happening events that do not have any tickets remaining."
                  )
                }
              >
                Sold Out
              </span>
            </div>
            <div
              className={`details_progress_container ${
                noodleStatus !== "dream" && noodleTicketsSold < noodleMaxTickets
                  ? "visible"
                  : "hidden"
              }`}
            >
              <meter
                className={`details_progress_dream ${status_classes.dream}`}
                value="1"
              ></meter>
              <meter
                className={`details_progress_not_happening ${status_classes.notHappening}`}
                max={noodleMinTickets}
                value={noodleTicketsSold}
              ></meter>
              <meter
                className={`details_progress_happening ${status_classes.happening}`}
                min={noodleMinTickets}
                max={noodleMaxTickets}
                value={noodleTicketsSold}
              ></meter>
              <meter
                className={`details_progress_sold_out ${status_classes.soldOut}`}
                min={noodleMaxTickets}
                max={noodleMaxTickets + 1}
                value={noodleTicketsSold + 1}
              ></meter>
            </div>
            {this.getStatusMessage2()}
          </div>
        </div>
        <div id="details_intro_right" className="details_intro_column">
          <h3>{noodleStatus === "dream" ? "Dream " : ""}Event Details</h3>
          <div id="details_summary">
            <p class={element_classes.noodleLocation}>
              Location: {noodleLocation}
            </p>
            <p class={element_classes.noodleDate}>
              Date and Time: {noodleDate}
            </p>
            <p class={element_classes.noodleTime}>{noodleTime}</p>
            <p class={element_classes.noodleTicketPrice}>
              Ticket Price: {noodlePrice}
            </p>
            <p class={element_classes.noodleTicketsSold}>
              Tickets Sold: {noodleTicketsSold}
            </p>
            <p class={element_classes.noodleMinTickets}>
              Minimum Tickets Sold: {noodleMinTickets}
            </p>
            <p class={element_classes.noodleMaxTickets}>
              Maximum Tickets Sold: {noodleMaxTickets}
            </p>
            <div id="details_tags">
              {noodleTags.map((item, i) => {
                // create a link for each tag
                return (
                  <Link
                    className={`noodle_tag ${noodleStatus}_tag`}
                    to={`/browse/${filterType}/${item}`}
                    key={i}
                  >
                    #{item}
                  </Link>
                );
              })}
            </div>
          </div>
          <div id={`details_host_intro_${noodleStatus}`}>
            <p>
              Host: <Link to={`/user/${hostID}`}>{hostName}</Link>
            </p>
            <Link className="noodle_button" to={`/user/${hostID}/contact`}>
              Contact {hostName}
            </Link>
            <Link className="noodle_button" to={`/user/${hostID}/follow`}>
              Follow {hostName}
            </Link>
            <button
              className={`noodle_button ${
                noodleTicketsSold < noodleMaxTickets
                  ? element_classes.noodleBuyButton
                  : "hidden"
              }`}
              id="details_buy_button"
              onClick={() => {
                this.buyTicket();
              }}
            >
              Buy a Ticket
            </button>
          </div>
        </div>
      </section>
    );
  };
  // Render method
  render() {
    const { noodleStatus } = this.state.thisNoodle;
    // Return the details page
    return (
      <main className={`${noodleStatus}`} id="details">
        {this.getIntro()}
        <section id="details_details"></section>
      </main>
    );
  }
}

export default Details;
