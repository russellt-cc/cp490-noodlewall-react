// React
import React from "react";

// CSS
import "./BrowseNoodles.css";

// NoodleList component
import NoodleList from "../Common/NoodleList";

// Data Read function
import readNoodlesOrUsers from "../Data/readNoodlesOrUsers";

// The Browse Noodles page
class BrowseNoodles extends React.Component {
  componentDidMount() {
    // Get the latest data from the API
    readNoodlesOrUsers("noodles").then(
      (result) => {
        // Data read successfully
        const noodleData = result.records;
        // Save in state
        this.setState({ noodleData });
      },
      (error) => {
        // Data failed to read
        alert("Noodles failed to load! Error: " + error.message);
      }
    );
  }
  render() {
    if (this.state && this.state.noodleData) {
      // Getting information about events
      // Create a filters object to pass to NoodleList
      const filters = {
        type: this.props.match.params.type,
        tag: this.props.match.params.tag,
      };
      // Return the browse page
      return (
        <main id="browse">
          {/* Show the list of noodles. Pass filters as properties to the NoodleList. */}
          {/* Pass data to the NoodleList as properties */}
          <NoodleList
            noodleData={this.state.noodleData}
            query={this.props.location.search}
            filters={filters}
          />
        </main>
      );
    } else {
      return (
        <main>
          <p>Cooking Noodles...</p>
        </main>
      );
    }
  }
}

export default BrowseNoodles;
