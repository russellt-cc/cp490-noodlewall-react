import React from 'react'
import { Link } from "react-router-dom"
import setRatingClasses from "../setRatingClasses.js"

// Class to structure the data for a user
class NoodlerSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: this.props.data}
  }
  render() {
    const data = this.state.data
    // Make an array to store the star classes
    // Determine which ones are checked based on the rating
    const star_classes = setRatingClasses(data.userRating)
    return (
      <div className={`noodle_userinfo`}>
        <p className={`noodle_userid`}><span className="noodle_label">User ID: </span>{data.userID}</p>
        <p className={`noodle_noodler`}><span className="noodle_label">Noodler: </span><Link to={`/user/${data.userID}`}>{data.userName}</Link></p>
        <p class="user_rating">
          <span className={`fa fa-star ${star_classes[1]}`}></span>
          <span className={`fa fa-star ${star_classes[2]}`}></span>
          <span className={`fa fa-star ${star_classes[3]}`}></span>
          <span className={`fa fa-star ${star_classes[4]}`}></span>
          <span className={`fa fa-star ${star_classes[5]}`}></span>
        </p>
      </div>
    )
  }
}

export default NoodlerSummary
