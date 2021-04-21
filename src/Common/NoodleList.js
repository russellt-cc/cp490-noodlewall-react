import React from "react";
import NoodleCard from "./NoodleCard";
import "./NoodleList.css";

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
    // Filter by user
    if (filters.userID !== undefined) {
      if (parseInt(item.userID) !== parseInt(filters.userID)) {
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
    // Let to count our filtered noodles
    let noodleCount = 0;
    // Create the noodle list and start looping through entries
    // Create the list of noodles that match filters
    const noodleList = (
      <div className="noodle_list">
        {/* Mapping array of objects.
      Send the data to filter noodles function
      to return the data or not
      depending on filters. */}
        {noodleData.map((item, i) => {
          // If the filters match, return the data
          if (this.filterNoodles(item, filters)) {
            // Get the right user details
            const hostData = userData.filter((user) => {
              return parseInt(user.userID) === parseInt(item.userID);
            })[0];
            // Increment our count
            noodleCount++;
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
    if (noodleCount > 0) {
      // Return the list if we have data
      return noodleList;
    } else {
      // Return empty element
      return <></>;
    }
  }
}

export default NoodleList;
