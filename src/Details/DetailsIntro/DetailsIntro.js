import React from "react";
import DetailsIntroLeft from "./DetailsIntroLeft";
import DetailsIntroRight from "./DetailsIntroRight";
import "./DetailsIntro.css";

// The intro section of the details page
class DetailsIntro extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    // Save this noodle in state so we can modify it
    this.state = {
      thisNoodle: this.props.thisNoodle,
      thisHost: this.props.thisHost,
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
    const sold = parseInt(noodleTicketsSold);
    const min = parseInt(noodleMinTickets);
    const max = parseInt(noodleMaxTickets);
    let status_classes = {
      dream: "notChecked",
      notHappening: "notChecked",
      happening: "notChecked",
      soldOut: "notChecked",
    };
    if (noodleStatus === "dream") {
      status_classes.dream = "passed checked";
    } else if (sold < min) {
      status_classes.dream = "passed";
      status_classes.notHappening = "passed checked";
    } else if (sold < max) {
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
  // Render method
  render() {
    // Get this noodle and host from state
    const { thisNoodle, thisHost } = this.state;
    const { currentUser, onDelete, filterType } = this.props;
    // Get element classes
    const element_classes = this.getElementClasses();
    // Get status classes
    const status_classes = this.getStatusClasses();
    return (
      <section id="details_intro">
        <DetailsIntroLeft
          thisNoodle={thisNoodle}
          element_classes={element_classes}
          status_classes={status_classes}
        />
        <DetailsIntroRight
          thisNoodle={thisNoodle}
          thisHost={thisHost}
          element_classes={element_classes}
          onBuy={this.buyTicket}
          currentUser={currentUser}
          onDelete={onDelete}
          filterType={filterType}
        />
      </section>
    );
  }
}

export default DetailsIntro;
