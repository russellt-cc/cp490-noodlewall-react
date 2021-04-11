import './css/Browse.css';
import React from 'react';
import NoodleList from './NoodleList.js'

class Browse extends React.Component {
  render() {
    // Getting information about events
    // Return the browse page
    return (
      <main>
        {/* Show the list of noodles. Pass filters as properties to the NoodleList. */}
        <NoodleList
          query={this.props.location.search}
          type={this.props.match.params.type}
        />
      </main>
    );
  }
}

export default Browse;
