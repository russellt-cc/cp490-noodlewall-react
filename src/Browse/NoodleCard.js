import { userData } from "../noodleData.js"
import React from 'react'
import { Link } from "react-router-dom"
import NoodlerSummary from "./NoodlerSummary.js"
import generateNoodleOverlay from "../generateNoodleOverlay.js"

// Class to structure the data for each noodle
class NoodleCard extends React.Component {
  render() {
    // Get the noodle data
    // Use object destructuring to get constants from data
    const { noodleID, noodleTitle, noodleStatus, noodleDescription, noodleTags, noodleImage } = this.props.data
    // Get the user data
    // Covert to zero-based index
    const hostData = userData[this.props.data.userID - 1]
    // Return the card for the noodle
    return (
      // div for each noodle
      <Link className="noodle_link" to={`/details/${noodleID}`}><div className={`noodle ${noodleStatus}`}>
        <Link className="noodle_image_link" to={`/details/${noodleID}`}>
          <img src={noodleImage} alt="Noodle"></img>
          {generateNoodleOverlay(noodleStatus)}
        </Link>
        <p className={`noodle_id`}><span className="noodle_label">ID: </span>{noodleID}</p>
        <p className={`noodle_title`}><span className="noodle_label">Title: </span><Link to={`/details/${noodleID}`}>{noodleTitle}</Link></p>
        <p className={`noodle_status`}><span className="noodle_label">Status: </span>{noodleStatus}</p>
        <NoodlerSummary data={hostData} />
        <p className={`noodle_description`}><span className="noodle_label">Description: </span>{noodleDescription}</p>
        <div className={`noodle_tags_section`}>
          <p className="noodle_label">Tags:</p>
          <div className={`noodle_tag_list`}>
            {noodleTags.map(item => {
              // create a link for each tag
              return <Link className={`noodle_tag ${noodleStatus}_tag`} to={`/browse/${item}`}>#{item}</Link>
            })}
          </div>
        </div>
      </div></Link>
    )
  }
}

export default NoodleCard
