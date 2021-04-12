import React from "react"
import "./css/User.css"
import { userData } from "../noodleData.js"
import UserRating from "../UserRating.js"

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {userData: userData[this.props.match.params.id - 1]}
  }
  render() {

    const userData = this.state.userData

    return(
      <main id="user_profile">
          
          <section id="user_profile_intro">
            
            <div className="user_profile_intro_column" id="user_profile_intro_left">
              <p>Picture goes here</p>
              <p>{userData.userFirstName} {userData.userLastName}</p>
              <UserRating rating={userData.userRating}/>
            </div>

            <div className="user_profile_intro_column" id="user_profile_intro_right">
              <p>About {userData.userName}</p>
              <p>{userData.userBio}</p>
              <p>Buttons goes here</p>
            </div>

          </section>

          <section id="user_noodles">

          </section>

      </main>
    )
  }
}

export default User
