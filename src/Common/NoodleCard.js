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
    this.mounted = true;
    // Check to see if we have host data
    const { hostData } = this.props;
    if (this.mounted) {
      if (hostData) {
        // Set the host data to props
        if (this.mounted) {
          this.setState({ hostData });
        }
      } else {
        // Get host data from database
        const { noodleID } = this.props.data;
        readNoodleOrUserByOtherID("user", noodleID).then(
          (result) => {
            // Got the user data
            if (this.mounted) {
              const hostData = result.record[0];
              this.setState({ hostData });
            }
          },
          (error) => {
            // Error loading host data
            console.log(error);
          }
        );
      }
    }
  }
  // Component will unmount
  componentWillUnmount() {
    this.mounted = false;
  }
  // Render
  render() {
    // The link to the noodle
    const noodleLink = `/details/${this.props.filterType}/${this.props.data.noodleID}`;
    // Return the card for the noodle
    return (
      // div for each noodle
      // <Link className="noodle_link" to={noodleLink}>
      <div className={`noodle_card ${this.props.data.noodleStatus}`}>
        <Link className="noodle_image_link" to={noodleLink}>
          <img
            src={decodeURIComponent(this.props.data.noodleCoverImage)}
            alt="Noodle"
          ></img>
          {NoodleOverlay(this.props.data.noodleStatus)}
        </Link>
        <p className={`noodle_id`}>
          <span className="noodle_label">ID: </span>
          {this.props.data.noodleID}
        </p>
        <p className={`noodle_title`}>
          <span className="noodle_label">Title: </span>
          <Link to={noodleLink}>{this.props.data.noodleTitle}</Link>
        </p>
        <p className={`noodle_status`}>
          <span className="noodle_label">Status: </span>
          {this.props.data.noodleStatus}
        </p>
        <NoodlerSummary data={this.state.hostData} />
        <p className={`noodle_description`}>
          <span className="noodle_label">Description: </span>
          {this.props.data.noodleDescription}
        </p>
        <div className={`noodle_tags_section`}>
          <p className="noodle_label">Tags:</p>
          <div className={`noodle_tag_list`}>
            {this.props.data.noodleTags.map((item, i) => {
              // create a link for each tag
              return (
                <Link
                  className={`noodle_tag ${this.props.data.noodleStatus}_tag`}
                  to={`/browse/${this.props.filterType}/${item}`}
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
