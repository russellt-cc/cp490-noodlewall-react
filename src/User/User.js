import React from "react"
import "./css/User.css"
import { userData } from "../noodleData.js"
import UserRating from "../UserRating.js"

class User extends React.Component {

  constructor(props) {
    super(props)
    const params = this.props.match.params
    this.state = {
      userData: userData[params.id - 1],
      action: params.action
    }
  }

  follow = () => {
    alert("Follow component goes here!")
  }

  contact = () => {
    alert("Contact component goes here!")
  }

  render() {

    const userData = this.state.userData

    return(
      <main id="user_profile">
          
          <section id="user_profile_intro">
            
            <div className="user_profile_intro_column" id="user_profile_intro_left">
              <img src={userData.userImage} alt={userData.userName}/>
              <h3>{userData.userFirstName} {userData.userLastName}</h3>
              <UserRating rating={userData.userRating}/>
            </div>

            <div className="user_profile_intro_column" id="user_profile_intro_right">
              <h1>About {userData.userName}</h1>
              <p>{userData.userBioLong}</p>
              <p className="user_actions">
                <button className="noodle_button" onClick={
                  () => {this.follow()}
                }>Follow {userData.userName}</button>
                <button className="noodle_button" onClick={
                  () => {this.contact()}
                }>Contact {userData.userName}</button>
              </p>
            </div>

          </section>

          <section id="user_noodles">

          </section>

      </main>


    )
  }

  componentDidMount() {

    const action = this.state.action

      switch (action) {
        case "follow":
          this.follow()
          break
        case "contact":
          this.contact()
          break
        default:
          break
      }  

  }

}

export default User
