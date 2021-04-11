import './css/Details.css';
import React from 'react';
import { noodleData, userData } from "../noodleData.js"
import { Link } from 'react-router-dom';
import fishing from "../images/fishing-crop.png"

class Details extends React.Component {
  render() {
    // Get the JSON from the file
    // Replace with database query
    const noodle = noodleData[this.props.match.params.id - 1]
    // Get the host details
    // Replace with database query
    const host = userData[noodle.userID - 1]
    // Return the details page
    return (
      <main>

        <section id="details_intro">
          <div id="details_intro_left" className="details_intro_column">
            <h1>{noodle.noodleTitle}</h1>
            <p>Days Left to Make it Happen: </p>
            <img src={fishing} alt="Noodle"></img>
            <p>Status bar goes here!</p>
          </div>
          <div id="details_intro_right" className="details_intro_column">
            <h1>Event Details</h1>
            <div id="details_summary">
              <p>Location: {noodle.noodleLocation}</p>
              <p>Date and Time: {noodle.noodleDate}</p>
              <p>{noodle.noodleTime}</p>
              <p>Ticket Price: {noodle.noodlePrice}</p>
              <p>Minimum Tickets Sold: {noodle.noodleMinTickets}</p>
              <p>Maximum Tickets Sold: {noodle.noodleMaxTickets}</p>
              <div id="details_tags">
                {noodle.noodleTags.map(item => {
                  // create a link for each tag
                  return <Link className={`noodle_tag ${noodle.noodleStatus}_tag`} to={`/browse/${item}`}>#{item}</Link>
                })}
              </div>
            </div>
            <div id="details_host_intro">
              <p>Host: {host.userName}</p>
              <Link to={`/user/${host.userID}/contact`}>Contact {host.userName}</Link>
              <Link to={`/user/${host.userID}/follow`}>Follow {host.userName}</Link>
              <Link id="details_buy_button" to={`/buy/${noodle.noodleID}`}>Buy a Ticket</Link>
            </div>
          </div>
        </section>

        <section id="details_details">

        </section>

      </main>
    );
  }
}

export default Details;
