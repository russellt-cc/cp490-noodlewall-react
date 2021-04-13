import './css/Browse.css'
import React from 'react'
import NoodleList from './NoodleList.js'

class Browse extends React.Component {
  render() {
    // Getting information about events
    // Create a filters object to pass to NoodleList
    const filters = {
      type: this.props.match.params.type,
      tag: this.props.match.params.tag
    }
    // Return the browse page
    return (
      <main id="browse">
        {/* Show the list of noodles. Pass filters as properties to the NoodleList. */}
        <NoodleList
          query={this.props.location.search}
          filters={filters}
        />
      </main>
    )
  }
}

export default Browse
