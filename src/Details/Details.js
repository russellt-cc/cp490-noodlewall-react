import "./css/Details.css";
import React from "react";
import DetailsIntro from "./DetailsIntro.js";

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
    // Get the right user details
    const thisHost = userData.filter((user) => {
      return parseInt(user.userID) === parseInt(thisNoodle.userID);
    })[0];
    // Save this noodle in state so we can modify it
    this.state = {
      thisNoodle: thisNoodle,
      thisHost: thisHost,
    };
  }
  // Render method
  render() {
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

export default Details;
