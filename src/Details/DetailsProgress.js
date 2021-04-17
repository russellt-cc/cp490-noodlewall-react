import React from "react";

// The progress bar element on the details page
class DetailsProgress extends React.Component {
  // Methods to determine a status message
  getStatusMessage1 = () => {
    const {
      noodleStatus: status,
      noodleTicketsSold,
      noodleMinTickets,
      noodleMaxTickets,
    } = this.props.thisNoodle;
    const sold = parseInt(noodleTicketsSold);
    const min = parseInt(noodleMinTickets);
    const max = parseInt(noodleMaxTickets);
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
      noodleTicketsSold,
      noodleMinTickets,
      noodleMaxTickets,
    } = this.props.thisNoodle;
    const sold = parseInt(noodleTicketsSold);
    const min = parseInt(noodleMinTickets);
    const max = parseInt(noodleMaxTickets);
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
          <span className="dreams_color_text">
            <strong>{diff}</strong>
          </span>{" "}
          ticket
          {diff > 1 ? "s" : ""} left to{" "}
          <span className="events_color_text">
            <strong>make it happen!</strong>
          </span>
        </p>
      );
    } else if (sold < max) {
      const diff = max - sold;
      return (
        <p className="status_message_2">
          Only{" "}
          <span className="events_color_text">
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
  // Render method
  render() {
    // Get data from props
    const {
      noodleStatus,
      noodleTicketsSold,
      noodleMaxTickets,
      noodleMinTickets,
    } = this.props.thisNoodle;
    const sold = parseInt(noodleTicketsSold) ? parseInt(noodleTicketsSold) : 0;
    const min = parseInt(noodleMinTickets) ? parseInt(noodleMinTickets) : 0;
    const max = parseInt(noodleMaxTickets) ? parseInt(noodleMaxTickets) : 0;
    const status_classes = this.props.status_classes;
    return (
      <div className="details_status_container_container">
        {this.getStatusMessage1()}
        <div className="details_status_container">
          <span
            className={`details_status_dream ${status_classes.dream} ${
              noodleStatus !== "dream" && sold < max ? "unfinished" : "finished"
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
            noodleStatus !== "dream" && sold < max ? "visible" : "hidden"
          }`}
        >
          <meter
            className={`details_progress_dream ${status_classes.dream}`}
            value="1"
          ></meter>
          <meter
            className={`details_progress_not_happening ${status_classes.notHappening}`}
            max={min}
            value={sold}
          ></meter>
          <meter
            className={`details_progress_happening ${status_classes.happening}`}
            min={min}
            max={max}
            value={sold}
          ></meter>
          <meter
            className={`details_progress_sold_out ${status_classes.soldOut}`}
            min={max}
            max={parseInt(max) + 1}
            value={parseInt(sold) + 1}
          ></meter>
        </div>
        {this.getStatusMessage2()}
      </div>
    );
  }
}

export default DetailsProgress;
