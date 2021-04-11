import './css/Browse.css';
import React from 'react';
import NoodleList from './Noodles.js'

class Browse extends React.Component {
  render() {
    // Testing the properties
    // var type=""
    // var query=""
    // var match=""
    // var location=""
    // if (this.props.match !== undefined) {
    //   type = this.props.match.params.type
    //   match = JSON.stringify(this.props.match, null, 2)
    // }
    // if (this.props.location !== undefined) {
    //   query = this.props.location.search
    //   location = JSON.stringify(this.props.location, null, 2)
    // }
    // Getting information about events
    return (
      <main>
        {/* <p>testing browsing type={type} query={query}</p>
        <p>Match Props: {match}</p>
        <p>Location Props: {location}</p>
        <p>List of Noodles</p> */}
        <NoodleList/>
      </main>
    );
  }
}

export default Browse;
