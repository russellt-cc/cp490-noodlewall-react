import React from "react";
import { Link } from "react-router-dom";

class DetailsIntroRight extends React.Component {
  render() {
    // Get data from props
    const { element_classes } = this.props;
    // Destructure the details and rename user id to host id
    const {
      noodleStatus,
      noodleLocation,
      noodleDate,
      noodleTime,
      noodlePrice,
      noodleMinTickets,
      noodleMaxTickets,
      noodleTicketsSold,
      noodleTags,
      userID: hostID,
    } = this.props.thisNoodle;
    // Destructure the user details and rename
    const { userName: hostName } = this.props.thisHost;
    // Get the type for tag links
    const filterType = this.props.filterType;

    return (
      <div id="details_intro_right" className="details_intro_column">
        <h3>{noodleStatus === "dream" ? "Dream " : ""}Event Details</h3>
        <div id="details_summary">
          <p class={element_classes.noodleLocation}>
            Location: {noodleLocation}
          </p>
          <p class={element_classes.noodleDate}>Date and Time: {noodleDate}</p>
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
              /* get buy method from props */
              this.props.onBuy();
            }}
          >
            Buy a Ticket
          </button>
        </div>
      </div>
    );
  }
}

export default DetailsIntroRight;
