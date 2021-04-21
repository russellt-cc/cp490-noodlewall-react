// React
import React from "react";

// React Router
import { Link } from "react-router-dom";

// Components
import NoodlerSummary from "./NoodlerSummary";
import NoodleOverlay from "../Common/NoodleOverlay";

// CSS
import "./NoodleCard.css";

// API call
import readNoodleOrUserByOtherID from "../Data/readNoodleOrUserByOtherID";

// Class to structure the data for each noodle
class NoodleCard extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    // Initialize host data in state
    const hostData = {};
    this.state = { hostData };
  }
  // Component did mount
  componentDidMount() {
    // Check to see if we have host data
    const { hostData } = this.props;
    if (hostData) {
      // Set the host data to props
      this.setState({ hostData });
    } else {
      // Get host data from database
      const { noodleID } = this.props.data;
      readNoodleOrUserByOtherID("user", noodleID).then(
        (result) => {
          // Got the user data
          const hostData = result.record[0];
          this.setState({ hostData });
        },
        (error) => {
          // Error
          console.log(error);
        }
      );
    }
  }
  // Render
  render() {
    // Get the noodle data
    // Use object destructuring to get constants from data
    const {
      noodleID,
      noodleTitle,
      noodleStatus,
      noodleDescription,
      noodleTags,
      noodleCoverImage,
    } = this.props.data;
    // Get the filter type for tag links
    const filterType = this.props.filterType;
    // The link to the noodle
    const noodleLink = `/details/${filterType}/${noodleID}`;
    // Return the card for the noodle
    return (
      // div for each noodle
      // <Link className="noodle_link" to={noodleLink}>
      <div className={`noodle_card ${noodleStatus}`}>
        <Link className="noodle_image_link" to={noodleLink}>
          <img src={decodeURIComponent(noodleCoverImage)} alt="Noodle"></img>
          {NoodleOverlay(noodleStatus)}
        </Link>
        <p className={`noodle_id`}>
          <span className="noodle_label">ID: </span>
          {noodleID}
        </p>
        <p className={`noodle_title`}>
          <span className="noodle_label">Title: </span>
          <Link to={noodleLink}>{noodleTitle}</Link>
        </p>
        <p className={`noodle_status`}>
          <span className="noodle_label">Status: </span>
          {noodleStatus}
        </p>
        <NoodlerSummary data={this.state.hostData} />
        <p className={`noodle_description`}>
          <span className="noodle_label">Description: </span>
          {noodleDescription}
        </p>
        <div className={`noodle_tags_section`}>
          <p className="noodle_label">Tags:</p>
          <div className={`noodle_tag_list`}>
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
      </div>
      // </Link>
    );
  }
}

export default NoodleCard;
