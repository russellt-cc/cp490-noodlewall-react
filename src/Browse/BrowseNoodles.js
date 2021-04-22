// React
import React from "react";

// CSS
import "./BrowseNoodles.css";

// NoodleList component
import NoodleList from "../Common/NoodleList";

// Data Read function
import readNoodlesOrUsers from "../Data/readNoodlesOrUsers";
import searchForNoodleOrUser from "../Data/searchForNoodleOrUser";

// The Browse Noodles page
class BrowseNoodles extends React.Component {
  // Component did mount
  componentDidMount() {
    // Check to see if we are doing a search
    const { search: query } = this.props.location;
    if (query) {
      // Read data using the search function
      searchForNoodleOrUser("noodles", query).then(
        (result) => {
          // Data read successfully
          // Check to see if we got any results
          if (result.records) {
            // We got some result
            const noodleData = result.records;
            // Save in state
            this.setState({ noodleData });
          } else {
            // Show message
            console.log(result);
            const noodleData = {};
            const error = result;
            this.setState({ noodleData, error });
          }
        },
        (error) => {
          // Data failed to read
          console.log(error);
          const noodleData = {};
          this.setState({ noodleData, error });
        }
      );
    } else {
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
          console.log(error);
          const noodleData = {};
          this.setState({ noodleData, error });
        }
      );
    }
  }
  // Render
  render() {
    // Check if we are loaded
    if (this.state && this.state.noodleData) {
      // Check for error
      if (!this.state.error) {
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
            <NoodleList noodleData={this.state.noodleData} filters={filters} />
          </main>
        );
      } else {
        // Show error message
        return (
          <main>
            <p>Noodles failed to load! Error: {this.state.error.message}</p>
          </main>
        );
      }
    } else {
      // Show loading screen
      return (
        <main>
          <p>Loading Noodles...</p>
        </main>
      );
    }
  }
}

export default BrowseNoodles;
