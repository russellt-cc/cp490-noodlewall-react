import React from "react"
import "./css/User.css"
import { userData } from "../noodleData.js"

class User extends React.Component {
  render() {

    const user = userData[this.props.match.params.id - 1]

    return(
      <main id="user_profile">
          
          <section id="user_profile_intro">
            
            <div className="user_profile_intro_column" id="user_profile_intro_left">
              <p>Picture goes here</p>
              <p>{user.userFirstName} {user.userLastName}</p>
              <p>Rating goes here</p>
            </div>

            <div className="user_profile_intro_column" id="user_profile_intro_right">
              <p>About {user.userName}</p>
              <p>{user.userBio}</p>
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
