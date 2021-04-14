import "./css/Details.css";
import React from "react";
import { Link } from "react-router-dom";
import CapitalizedText from "../CapitalizedText.js";
import NoodleOverlay from "../NoodleOverlay.js";

class Details extends React.Component {
  // Method to handle the buy button
  buyTicket = () => {
    alert("Buy ticket component goes here!");
  };
  // Method to determine classes of the status bar
  setStatusClasses = (
    noodleStatus,
    noodleMinTickets,
    noodleMaxTickets,
    noodleTicketsSold
  ) => {
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
  setElementClasses = (
    noodleStatus,
    noodleLocation,
    noodleDate,
    noodleTime
  ) => {
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
      noodleBuyButton: visible,
    };
    if (noodleStatus == "dream") {
      element_classes.noodleDaysLeft = hidden;
      element_classes.noodleTicketPrice = hidden;
      element_classes.noodleMinTickets = hidden;
      element_classes.noodleMaxTickets = hidden;
      element_classes.noodleBuyButton = hidden;
    }
    if (noodleLocation == null) element_classes.noodleLocation = hidden;
    if (noodleDate == null) element_classes.noodleDate = hidden;
    if (noodleTime == null) element_classes.noodleTime = hidden;
    return element_classes;
  };
  // Render method
  render() {
    // Get the noodle and host details
    // Covert to zero-based index
    // Use object destructuring to get constants
    const { id: noodleID } = this.props.match.params;
    const { noodleData, userData } = this.props;
    // Get the right details page
    const thisNoodle = noodleData.filter((noodle) => {
      return noodle.noodleID == noodleID;
    });
    // Destructure the details and rename user id to host id
    // this noodle is an array so we need to get the first index which is 0
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
    } = thisNoodle[0];
    // Get the right user details
    const thisHost = userData.filter((user) => {
      return user.userID == hostID;
    });
    // Destructure the user details and rename
    // this host is an array so we get the first index
    const { userName: hostName } = thisHost[0];
    // Get the type for tag links
    const filterType = this.props.match.params.filterType;
    // Get status classes
    const status_classes = this.setStatusClasses(
      noodleStatus,
      noodleMinTickets,
      noodleMaxTickets,
      noodleTicketsSold
    );
    // Get element classes
    const element_classes = this.setElementClasses(
      noodleStatus,
      noodleLocation,
      noodleDate,
      noodleTime
    );
    // Return the details page
    return (
      <main className={`${noodleStatus}`} id="details">
        <section id="details_intro">
          <div id="details_intro_left" className="details_intro_column">
            <h1>{noodleTitle}</h1>
            <p class={element_classes.noodleDaysLeft}>
              Days Left to Make it Happen:{" "}
            </p>
            <div id="details_image_container">
              <img src={noodleImage} alt="Noodle"></img>
              {NoodleOverlay(noodleStatus)}
            </div>
            <div className="details_status_container_container">
              <div className="details_status_container">
                <span
                  className={`details_status_dream ${status_classes.dream}`}
                >
                  Dream
                </span>
                <span
                  className={`details_status_not_happening ${status_classes.notHappening}`}
                >
                  Not Happening
                </span>
                <span
                  className={`details_status_happening ${status_classes.happening}`}
                >
                  Happening
                </span>
                <span
                  className={`details_status_sold_out ${status_classes.soldOut}`}
                >
                  Sold Out
                </span>
              </div>
              <div className="details_progress_container">
                <meter
                  className={`details_progress_dream ${status_classes.dream}`}
                  value="1"
                ></meter>
                <meter
                  className={`details_progress_not_happening ${status_classes.notHappening}`}
                  max={noodleMinTickets + 1}
                  value={noodleTicketsSold + 1}
                ></meter>
                <meter
                  className={`details_progress_happening ${status_classes.happening}`}
                  min={noodleMinTickets}
                  max={noodleMaxTickets + 1}
                  value={noodleTicketsSold + 1}
                ></meter>
                <meter
                  className={`details_progress_sold_out ${status_classes.soldOut}`}
                  min={noodleMaxTickets}
                  max={noodleMaxTickets + 1}
                  value={noodleTicketsSold + 1}
                ></meter>
              </div>
            </div>
          </div>
          <div id="details_intro_right" className="details_intro_column">
            <h3>{<CapitalizedText text={noodleStatus} />} Details</h3>
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
                className={`noodle_button ${element_classes.noodleBuyButton}`}
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
        <section id="details_details"></section>
      </main>
    );
  }
}

export default Details;
