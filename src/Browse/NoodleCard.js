import { userData } from "../noodleData.js"
import React from 'react'
import { Link } from "react-router-dom"
import NoodlerSummary from "./NoodlerSummary.js"

// Class to structure the data for each noodle
class NoodleCard extends React.Component {
  constructor(props) {
    super(props)
    // Get the noodle data from the props
    // Get the user data
    // Covert to zero-based index
    this.state = {noodleData: this.props.data, hostData: userData[this.props.data.userID - 1]}
  }
  render() {
    const noodleData = this.state.noodleData
    const hostData = this.state.hostData
    // Return the card for the noodle
    return (
      // div for each noodle
      <div className={`noodle ${noodleData.noodleStatus}`}>
        <Link class="noodle_image_link" to={`/details/${noodleData.noodleID}`}><img src={noodleData.noodleImage} alt="Noodle"></img></Link>
        <p className={`noodle_id`}><span className="noodle_label">ID: </span>{noodleData.noodleID}</p>
        <p className={`noodle_title`}><span className="noodle_label">Title: </span><Link to={`/details/${noodleData.noodleID}`}>{noodleData.noodleTitle}</Link></p>
        <p className={`noodle_status`}><span className="noodle_label">Status: </span>{noodleData.noodleStatus}</p>
        <NoodlerSummary data={hostData} />
        <p className={`noodle_description`}><span className="noodle_label">Description: </span>{noodleData.noodleDescription}</p>
        <div className={`noodle_tags_section`}>
          <p className="noodle_label">Tags:</p>
          <div className={`noodle_tag_list`}>
            {this.state.noodleData.noodleTags.map(item => {
              // create a link for each tag
              return <Link className={`noodle_tag ${noodleData.noodleStatus}_tag`} to={`/browse/${item}`}>#{item}</Link>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default NoodleCard
