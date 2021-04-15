import React from "react";
import { Link } from "react-router-dom";
import UserRating from "../Common/UserRating";

// Class to structure the data for a user
class NoodlerSummary extends React.Component {
  render() {
    // Check if data is valid
    if (this.props.data != undefined) {
      const { userID, userName, userRating } = this.props.data;
      return (
        <div className={`noodle_userinfo`}>
          <p className={`noodle_userid`}>
            <span className="noodle_label">User ID: </span>
            {userID}
          </p>
          <p className={`noodle_noodler`}>
            <span className="noodle_label">Noodler: </span>
            <Link to={`/user/${this.props.data.userID}`}>{userName}</Link>
          </p>
          <UserRating rating={userRating} />
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default NoodlerSummary;
