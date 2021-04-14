import "./css/Details.css";
import React from "react";
import DetailsIntro from "./DetailsIntro.js";

// The event / dreams details page
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
      return parseInt(noodle.noodleID) === parseInt(noodleID);
    })[0];
    // Check if we have a valid noodle
    if (thisNoodle !== undefined) {
      // Get the right user details
      const thisHost = userData.filter((user) => {
        return parseInt(user.userID) === parseInt(thisNoodle.userID);
      })[0];
      // Save this noodle in state so we can modify it
      this.state = {
        thisNoodle: thisNoodle,
        thisHost: thisHost,
        error: false,
      };
    } else {
      this.state = {
        error: true,
      };
    }
  }
  // Render method
  render() {
    const { error } = this.state;
    if (error) {
      return (
        <main>
          <p>Noodle not found!</p>
        </main>
      );
    } else {
      const { thisNoodle, thisHost } = this.state;
      const { noodleStatus } = thisNoodle;
      // Return the details page
      return (
        <main className={`${noodleStatus}`} id="details">
          <DetailsIntro thisNoodle={thisNoodle} thisHost={thisHost} />
          <section id="details_details"></section>
        </main>
      );
    }
  }
}

export default Details;
