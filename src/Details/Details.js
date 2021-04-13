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
  // Render method
  render() {
    // Get the noodle and host details
    // Covert to zero-based index
    // Use object destructuring to get constants
    const { id } = this.props.match.params;
    const { noodleData, userData } = this.props;
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
    } = noodleData[id - 1];
    const { userID, userName } = userData[noodleData[id - 1].userID - 1];
    // Get the type for tag links
    const filterType = this.props.match.params.filterType;
    // Get status classes
    const status_classes = this.setStatusClasses(
      noodleStatus,
      noodleMinTickets,
      noodleMaxTickets,
      noodleTicketsSold
    );
    // Return the details page
    return (
      <main className={`${noodleStatus}`} id="details">
        <section id="details_intro">
          <div id="details_intro_left" className="details_intro_column">
            <h1>{noodleTitle}</h1>
            <p>Days Left to Make it Happen: </p>
            <div id="details_image_container">
              <img src={noodleImage} alt="Noodle"></img>
              {NoodleOverlay(noodleStatus)}
            </div>
            <div className="details_status_container">
              <span className={`details_status_dream ${status_classes.dream}`}>
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
          </div>
          <div id="details_intro_right" className="details_intro_column">
            <h3>{<CapitalizedText text={noodleStatus} />} Details</h3>
            <div id="details_summary">
              <p>Location: {noodleLocation}</p>
              <p>Date and Time: {noodleDate}</p>
              <p>{noodleTime}</p>
              <p>Ticket Price: {noodlePrice}</p>
              <p>Minimum Tickets Sold: {noodleMinTickets}</p>
              <p>Maximum Tickets Sold: {noodleMaxTickets}</p>
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
                Host: <Link to={`/user/${userID}`}>{userName}</Link>
              </p>
              <Link className="noodle_button" to={`/user/${userID}/contact`}>
                Contact {userName}
              </Link>
              <Link className="noodle_button" to={`/user/${userID}/follow`}>
                Follow {userName}
              </Link>
              <button
                className="noodle_button"
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
