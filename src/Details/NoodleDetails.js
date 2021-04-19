import "./NoodleDetails.css";
import React from "react";
import DetailsIntro from "./DetailsIntro/DetailsIntro";
import { Link } from "react-router-dom";
import UserRating from "../Common/UserRating";

// The event / dreams details page
class NoodleDetails extends React.Component {
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

      // Destructure the data
      const {
        noodleStatus,
        noodleDescription,
        noodleLocation,
        noodleDirections,
        noodleImages,
        noodleImageText,
      } = thisNoodle;
      const {
        userName: hostUserName,
        userFirstName: hostFirstName,
        userLastName: hostLastName,
        userImage: hostImage,
        userBioLong: hostBioLong,
        userID: hostID,
        userRating: hostRating,
      } = thisHost;

      // Get status and props
      const { currentUserID, onDelete } = this.props;
      const { filterType } = this.props.match.params;

      // Get the user actions
      const actionButtons = () => {
        if (!currentUserID) {
          // Actions for not logged in user
          return <></>;
        } else if (currentUserID === hostID) {
          // Actions for viewing your own noodle
          return <></>;
        } else {
          // Actions for viewing another users noodle
          return (
            <div id="details_organizer_actions">
              <button className={`noodle_button ${noodleStatus}`}>
                Follow Me
              </button>
              <button className={`noodle_button ${noodleStatus}`}>
                Contact Me
              </button>
            </div>
          );
        }
      };

      // Get the images and image text
      const detailsImageList = noodleImages ? (
        noodleImages.map((imageURL, index) => {
          <div key={index}>
            <img src={decodeURIComponent(imageURL)} alt={index}></img>
            <p>{noodleImageText[index]}</p>
          </div>;
        })
      ) : (
        <></>
      );

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
            <div className="details_column left" id="details_details_left">
              <h3>Event Description</h3>
              <p>{noodleDescription}</p>
              {detailsImageList}
            </div>
            <div
              className="details_column right"
              id="details_details_right"
            ></div>
          </section>
          <section id="details_location">
            <div className="details_column left" id="details_location_left">
              <h3>Event Location</h3>
              <p>{noodleLocation}</p>
              <p>{noodleDirections}</p>
            </div>
            <div
              className="details_column right"
              id="details_location_right"
            ></div>
          </section>
          <section id="details_organizer">
            <div className="details_column left" id="details_organizer_left">
              <h3>About {hostUserName}</h3>
              <div id="details_organizer_column_container">
                <div
                  className="details_organizer_column"
                  id="details_organizer_left_left"
                >
                  <Link to={`/user/${hostID}`}>
                    <img src={hostImage} alt="Host"></img>
                    <p>
                      {hostFirstName} {hostLastName}
                    </p>
                    <UserRating rating={hostRating} />
                  </Link>
                </div>
                <div
                  className="details_organizer_column"
                  id="details_organizer_right_right"
                >
                  <p>{hostBioLong}</p>
                  {actionButtons()}
                </div>
              </div>
            </div>
            <div
              className="details_column right"
              id="details_organizer_right"
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

export default NoodleDetails;
