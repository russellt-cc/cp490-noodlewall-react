import "./BrowseNoodles.css";
import React from "react";
import NoodleList from "../Common/NoodleList";

import dataRead from "../Data/dataRead";

class BrowseNoodles extends React.Component {
  componentDidMount() {
    // Get the latest data from the API
    dataRead("noodles").then(
      (result) => {
        // Data read successfully
        const noodleData = result.records;
        // Save in state
        this.setState({ noodleData });
        // Get user data
        dataRead("users").then(
          (result) => {
            // Users read successfully
            console.log(result);
            const userData = result.records;
            // Save in state
            this.setState({ userData });
          },
          (error) => {
            // Users failed to read
            alert("Users failed to load! Error: " + error.message);
          }
        );
      },
      (error) => {
        // Data failed to read
        alert("Noodles failed to load! Error: " + error.message);
      }
    );
  }
  render() {
    if (this.state && this.state.noodleData && this.state.userData) {
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
            userData={this.state.userData}
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
