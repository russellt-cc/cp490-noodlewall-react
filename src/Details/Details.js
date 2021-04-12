import './css/Details.css'
import React from 'react'
import { noodleData, userData } from "../noodleData.js"
import { Link } from 'react-router-dom'
import CapitalizedText from "../CapitalizedText.js"

class Details extends React.Component {
  // Constructor method
  constructor(props) {
    super(props)
    // Get the JSON from the file
    // Get the host details
    // Covert to zero-based index
    // Replace with database query
    this.state = {
      noodleData: noodleData[this.props.match.params.id - 1],
      hostData: userData[noodleData[this.props.match.params.id - 1].userID - 1]
    }
  }
  // Method to handle the buy button
  buyTicket = () => {
    alert("Buy ticket component goes here!")
  }
  // Render method
  render() {
    // Return the details page
    return (
      <main id={`details ${noodleData.noodleStatus}`}>
        <section id="details_intro">
          <div id="details_intro_left" className="details_intro_column">
            <h1>{this.state.noodleData.noodleTitle}</h1>
            <p>Days Left to Make it Happen: </p>
            <img src={this.state.noodleData.noodleImage} alt="Noodle"></img>
            <p>Status bar goes here!</p>
          </div>
          <div id="details_intro_right" className="details_intro_column">
            <h3>{<CapitalizedText text={this.state.noodleData.noodleStatus}/>} Details</h3>
            <div id="details_summary">
              <p>Location: {this.state.noodleData.noodleLocation}</p>
              <p>Date and Time: {this.state.noodleData.noodleDate}</p>
              <p>{this.state.noodleData.noodleTime}</p>
              <p>Ticket Price: {this.state.noodleData.noodlePrice}</p>
              <p>Minimum Tickets Sold: {this.state.noodleData.noodleMinTickets}</p>
              <p>Maximum Tickets Sold: {this.state.noodleData.noodleMaxTickets}</p>
              <div id="details_tags">
                {this.state.noodleData.noodleTags.map(item => {
                  // create a link for each tag
                  return <Link className={`noodle_tag ${this.state.noodleData.noodleStatus}_tag`} to={`/browse/${item}`}>#{item}</Link>
                })}
              </div>
            </div>
            <div id={`details_host_intro_${this.state.noodleData.noodleStatus}`}>
              <p>Host: <Link to={`/user/${this.state.hostData.userID}`}>{this.state.hostData.userName}</Link></p>
              <Link class="noodle_button" to={`/user/${this.state.hostData.userID}/contact`}>Contact {this.state.hostData.userName}</Link>
              <Link class="noodle_button" to={`/user/${this.state.hostData.userID}/follow`}>Follow {this.state.hostData.userName}</Link>
              <button class="noodle_button" id="details_buy_button" onClick={() => {
                this.buyTicket()
              }}>Buy a Ticket</button>
            </div>
          </div>
        </section>
        <section id="details_details">
        </section>
      </main>
    )
  }
}

export default Details
