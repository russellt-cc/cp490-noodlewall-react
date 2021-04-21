// React
import React from "react";

// React Router
import { Link } from "react-router-dom";

// Components
import NoodlerSummary from "./NoodlerSummary";
import NoodleOverlay from "../Common/NoodleOverlay";

// CSS
import "./NoodleCard.css";

// Class to structure the data for each noodle
class NoodleCard extends React.Component {
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
        <NoodlerSummary data={this.props.hostData} />
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
