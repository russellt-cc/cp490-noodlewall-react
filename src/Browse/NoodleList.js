import React from "react";
import NoodleCard from "./NoodleCard.js";

// The list of noodles from the JSON data
class NoodleList extends React.Component {
  // Method to determine if the noodle matches the filters
  filterNoodles = (item, filters) => {
    // Return false if the type doesn't match
    switch (filters.type) {
      case "dreams":
        if (item.noodleStatus !== "dream") {
          return false;
        }
        break;
      case "events":
        if (item.noodleStatus !== "event") {
          return false;
        }
        break;
      default:
        break;
    }
    // Filter by tag
    if (filters.tag !== undefined) {
      const tagsMatch = (tag) => tag === filters.tag;
      if (!item.noodleTags.some(tagsMatch)) {
        return false;
      }
    }
    // If the filters match, return the data
    return true;
  };
  // Render
  render() {
    // Destructure the props
    const { filters, noodleData, userData } = this.props;
    // Create the noodle list and start looping through entries
    // Return the list of noodles that match filters
    return (
      // div for the list of dreams and events
      <div className="noodle_list">
        {/* Mapping array of objects.
          Send the data to filter noodles function
          to return the data or not
          depending on filters. */}
        {noodleData.map((item, i) => {
          // If the filters match, return the data
          if (this.filterNoodles(item, filters)) {
            // Get the user data
            // Covert to zero-based index
            const hostData = userData[item.userID - 1];
            return (
              <NoodleCard
                data={item}
                hostData={hostData}
                key={i}
                filterType={filters.type}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default NoodleList;
