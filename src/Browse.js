import './css/Browse.css';
import React from 'react';
// import { Noodles } from './Noodles.js'
import Noodles from './Noodles.js'

class Browse extends React.Component {
  render() {
    // Testing the properties
    var type=""
    var query=""
    var match=""
    var location=""
    if (this.props.match !== undefined) {
      type = this.props.match.params.type
      match = JSON.stringify(this.props.match, null, 2)
    }
    if (this.props.location !== undefined) {
      query = this.props.location.search
      location = JSON.stringify(this.props.location, null, 2)
    }
    // Getting information about an event
    // const myNoodle = <Noodles/>
    // var myNoodleJSON = JSON.parse(myNoodle)
    // var noodleTitle = myNoodleJSON.noodleTitle
    // var noodlerName = myNoodleJSON.noodlerName
    // var noodleDescription = myNoodleJSON.noodleDescription
    // var noodleTags = myNoodleJSON.noodleTags
    // Return the page
    return (
      <main>
        <p>testing browsing type={type} query={query}</p>
        <p>Match Props: {match}</p>
        <p>Location Props: {location}</p>
        {/* <div class="dream">
          <p>My Noodle: {myNoodle}</p>
          <p>Title: </p>
          <p>Noodler: </p>
          <p>Description: </p>
          <p>Tags: </p>
        </div> */}
        <p>List of Noodles</p>
        <Noodles/>
      </main>
    );
  }
}

export default Browse;
