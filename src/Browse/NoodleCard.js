import { userData } from "../noodleData.js"
import React from 'react';
import { Link } from "react-router-dom"
import NoodlerSummary from "./NoodlerSummary.js"

// Class to structure the data for each noodle
class NoodleCard extends React.Component {
  render() {
    // Get the noodle data from the props
    const data = this.props.data
    const noodleID = data.noodleID
    const userID = data.userID
    const status = data.noodleStatus
    // Get the user data
    // Covert to zero-based index
    const user = userData[userID - 1]
    // Return the card for the noodle
    return (
      // div for each noodle
      <div className={`noodle ${status}`}>
        <Link class="noodle_image_link" to={`/details/${noodleID}`}><img src={data.noodleImage} alt="Noodle"></img></Link>
        <p className={`noodle_id`}><span className="noodle_label">ID: </span>{noodleID}</p>
        <p className={`noodle_title`}><span className="noodle_label">Title: </span><Link to={`/details/${noodleID}`}>{data.noodleTitle}</Link></p>
        <p className={`noodle_status`}><span className="noodle_label">Status: </span>{status}</p>
        <NoodlerSummary data={user} />
        <p className={`noodle_description`}><span className="noodle_label">Description: </span>{data.noodleDescription}</p>
        <div className={`noodle_tags_section`}>
          <p className="noodle_label">Tags:</p>
          <div className={`noodle_tag_list`}>
            {data.noodleTags.map(item => {
              // create a link for each tag
              return <Link className={`noodle_tag ${status}_tag`} to={`/browse/${item}`}>#{item}</Link>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default NoodleCard
