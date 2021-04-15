import React from "react";
import NoodleOverlay from "../Common/NoodleOverlay.js";
import { DateTime, Interval } from "luxon";
import DetailsProgress from "./DetailsProgress";

// The left column of the details intro
class DetailsIntroLeft extends React.Component {
  // Method to determine the days left
  getDaysLeft = () => {
    const {
      noodleStatus,
      noodleTicketsSold,
      noodleMinTickets,
      noodleCutoff,
      noodleDate,
    } = this.props.thisNoodle;
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
  // Render method
  render() {
    // Get data from props
    const { element_classes, status_classes } = this.props;
    // Determine the days left
    const wholeDaysLeft = this.getDaysLeft();
    // Destructure the props to get our data
    const {
      noodleTitle,
      noodleTicketsSold,
      noodleMinTickets,
      noodleImage,
      noodleStatus,
    } = this.props.thisNoodle;
    return (
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
        <DetailsProgress
          thisNoodle={this.props.thisNoodle}
          status_classes={status_classes}
        />
      </div>
    );
  }
}

export default DetailsIntroLeft;
