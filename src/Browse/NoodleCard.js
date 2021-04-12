import { userData } from "../noodleData.js"
import React from 'react'
import { Link } from "react-router-dom"
import NoodlerSummary from "./NoodlerSummary.js"

// Class to structure the data for each noodle
class NoodleCard extends React.Component {
  constructor(props) {
    super(props)
    // Get the user data
    // Covert to zero-based index
    this.state = {hostData: userData[this.props.data.userID - 1]}
  }
  render() {
    // Return the card for the noodle
    return (
      // div for each noodle
      <div className={`noodle ${this.props.data.noodleStatus}`}>
        <Link class="noodle_image_link" to={`/details/${this.props.data.noodleID}`}><img src={this.props.data.noodleImage} alt="Noodle"></img></Link>
        <p className={`noodle_id`}><span className="noodle_label">ID: </span>{this.props.data.noodleID}</p>
        <p className={`noodle_title`}><span className="noodle_label">Title: </span><Link to={`/details/${this.props.data.noodleID}`}>{this.props.data.noodleTitle}</Link></p>
        <p className={`noodle_status`}><span className="noodle_label">Status: </span>{this.props.data.noodleStatus}</p>
        <NoodlerSummary data={this.state.hostData} />
        <p className={`noodle_description`}><span className="noodle_label">Description: </span>{this.props.data.noodleDescription}</p>
        <div className={`noodle_tags_section`}>
          <p className="noodle_label">Tags:</p>
          <div className={`noodle_tag_list`}>
            {this.props.data.noodleTags.map(item => {
              // create a link for each tag
              return <Link className={`noodle_tag ${this.props.data.noodleStatus}_tag`} to={`/browse/${item}`}>#{item}</Link>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default NoodleCard
