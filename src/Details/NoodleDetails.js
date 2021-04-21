import "./NoodleDetails.css";
import React from "react";
import DetailsIntro from "./DetailsIntro/DetailsIntro";
import { Link } from "react-router-dom";
import UserRating from "../Common/UserRating";

import dataReadByID from "../Data/dataReadByID";

// The event / dreams details page
class NoodleDetails extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    // Load the latest data
    dataReadByID("noodle", id).then(
      (result) => {
        // Noodle loaded successfully
        // console.log(result);
        let thisNoodle = result ? result : null;
        // Parse CSV to array
        // if (typeof thisNoodle.noodleTags === "string") {
        //   thisNoodle.noodleTags = thisNoodle.noodleTags.split(",");
        // }
        // if (typeof thisNoodle.noodleImages === "string") {
        //   thisNoodle.noodleImages = thisNoodle.noodleImages.split(",");
        // }
        // if (typeof thisNoodle.noodleImageText === "string") {
        //   thisNoodle.noodleImageText = thisNoodle.noodleImageText.split(",");
        // }
        const noodleIsCooked = true;
        this.setState({ thisNoodle, noodleIsCooked });
        // Load latest user data
        dataReadByID("user", result.userID).then(
          (result) => {
            // User loaded successfully
            // console.log(result);
            const thisHost = result ? result : {};
            const hostIsLoaded = true;
            this.setState({ thisHost, hostIsLoaded });
          },
          (error) => {
            // User failed to load
            // console.log(error);
            alert("User failed to load! Error: " + error.message);
            const hostError = error;
            const hostIsLoaded = true;
            this.setState({ hostError, hostIsLoaded });
          }
        );
      },
      (error) => {
        // Noodle failed to load
        // console.log(error);
        alert("Noodle failed to load! Error: " + error.message);
        const noodleError = error;
        const noodleIsCooked = true;
        this.setState({ noodleError, noodleIsCooked });
      }
    );
  }
  render() {
    if (this.state && this.state.noodleIsCooked) {
      // Get the noodle and host details
      const { thisNoodle } = this.state;
      let { thisHost } = this.state;
      if (!thisHost) thisHost = {};
      // Check if we have a valid noodle
      if (thisNoodle) {
        // Get status and props
        const { currentUser, onDelete } = this.props;
        const { filterType } = this.props.match.params;
        // Get the user actions
        const actionButtons = () => {
          if (!currentUser) {
            // Actions for not logged in user
            return <></>;
          } else if (currentUser.userID === thisHost.hostID) {
            // Actions for viewing your own noodle
            return <></>;
          } else {
            // Actions for viewing another users noodle
            return (
              <div id="details_organizer_actions">
                <button className={`noodle_button ${thisNoodle.noodleStatus}`}>
                  Follow Me
                </button>
                <button className={`noodle_button ${thisNoodle.noodleStatus}`}>
                  Contact Me
                </button>
              </div>
            );
          }
        };
        // Get the images and image text
        const detailsImageList = thisNoodle.noodleImages ? (
          thisNoodle.noodleImages.map((imageURL, index) => {
            return (
              <div key={index} className="details_details_image_text_container">
                <img src={decodeURIComponent(imageURL)} alt={index}></img>
                <p>
                  {thisNoodle.noodleImageText[index] &&
                  thisNoodle.noodleImageText[index] !== "undefined" &&
                  thisNoodle.noodleImageText[index] !== "null"
                    ? unescape(thisNoodle.noodleImageText[index])
                    : ""}
                </p>
              </div>
            );
          })
        ) : (
          <></>
        );
        // Return the details page
        return (
          <main className={`${thisNoodle.noodleStatus}`} id="details">
            <DetailsIntro
              thisNoodle={thisNoodle}
              thisHost={thisHost}
              currentUser={currentUser}
              onDelete={onDelete}
              filterType={filterType}
            />
            <section id="details_details">
              <div className="details_column left" id="details_details_left">
                <h3>Event Description</h3>
                <p>{thisNoodle.noodleDescription}</p>
                {thisNoodle.noodleImages && thisNoodle.noodleImages[0] ? (
                  detailsImageList
                ) : (
                  <></>
                )}
              </div>
              <div
                className="details_column right"
                id="details_details_right"
              ></div>
            </section>
            <section id="details_location">
              <div className="details_column left" id="details_location_left">
                <h3>Event Location</h3>
                <p>{thisNoodle.noodleLocation}</p>
                <p>{thisNoodle.noodleDirections}</p>
              </div>
              <div
                className="details_column right"
                id="details_location_right"
              ></div>
            </section>
            <section id="details_organizer">
              <div className="details_column left" id="details_organizer_left">
                <h3>About {thisHost.userName}</h3>
                <div id="details_organizer_column_container">
                  <div
                    className="details_organizer_column"
                    id="details_organizer_left_left"
                  >
                    <Link to={`/user/${thisHost.userID}`}>
                      <img src={thisHost.userImage} alt="Host"></img>
                      <p>
                        {thisHost.userFirstName} {thisHost.userLastName}
                      </p>
                      <UserRating rating={thisHost.userRating} />
                    </Link>
                  </div>
                  <div
                    className="details_organizer_column"
                    id="details_organizer_right_right"
                  >
                    <p>{thisHost.userBioLong}</p>
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
    } else {
      return (
        <main>
          <p>Loading Noodle...</p>
        </main>
      );
    }
  }
}

export default NoodleDetails;
