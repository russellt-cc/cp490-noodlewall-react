import React from 'react'
import { Link } from "react-router-dom"
import UserRating from "../UserRating"

// Class to structure the data for a user
class NoodlerSummary extends React.Component {
  render() {
    return (
      <div className={`noodle_userinfo`}>
        <p className={`noodle_userid`}><span className="noodle_label">User ID: </span>{this.props.data.userID}</p>
        <p className={`noodle_noodler`}><span className="noodle_label">Noodler: </span><Link to={`/user/${this.props.data.userID}`}>{this.props.data.userName}</Link></p>
        <UserRating rating={this.props.data.userRating}/>
      </div>
    )
  }
}

export default NoodlerSummary
