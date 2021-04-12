import React from 'react'
import { Link } from "react-router-dom"
import UserRating from "../UserRating"

// Class to structure the data for a user
class NoodlerSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: this.props.data}
  }
  render() {
    const data = this.state.data
    return (
      <div className={`noodle_userinfo`}>
        <p className={`noodle_userid`}><span className="noodle_label">User ID: </span>{data.userID}</p>
        <p className={`noodle_noodler`}><span className="noodle_label">Noodler: </span><Link to={`/user/${data.userID}`}>{data.userName}</Link></p>
        <UserRating rating={data.userRating}/>
      </div>
    )
  }
}

export default NoodlerSummary
