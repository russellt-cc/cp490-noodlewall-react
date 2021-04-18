import "./NoodleDetails.css";
import React from "react";
import DetailsIntro from "./DetailsIntro";

// The event / dreams details page
class EventDetails extends React.Component {
  render() {
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
      // Get status and props
      const { noodleStatus } = thisNoodle;
      const { currentUserID, onDelete } = this.props;
      const { filterType } = this.props.match.params;
      // Return the details page
      return (
        <main className={`${noodleStatus}`} id="details">
          <DetailsIntro
            thisNoodle={thisNoodle}
            thisHost={thisHost}
            currentUserID={currentUserID}
            onDelete={onDelete}
            filterType={filterType}
          />
          <section id="details_details">
            <div className="details_details_column" id="details_details_left">
              <div>
                <h3>Event Description</h3>
                <p>{thisNoodle.noodleDescription}</p>
              </div>
            </div>
            <div
              className="details_details_column"
              id="details_details_right"
            ></div>
          </section>
        </main>
      );
    } else {
      // Return error message
      return (
        <main>
          <p>Noodle not found!</p>
        </main>
      );
    }
  }
}

export default EventDetails;
