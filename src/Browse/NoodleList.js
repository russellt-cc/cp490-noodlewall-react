//https://www.pluralsight.com/guides/load-and-render-json-data-into-react-components

//https://www.pluralsight.com/guides/convert-a-json-file-to-an-array-in-react

// Get local JSON file
import { noodleData } from "../noodleData.js"
import React from 'react'
import NoodleCard from "./NoodleCard.js"

// The list of noodles from the JSON data
// Could be modified to pull data from a database
class NoodleList extends React.Component {
  constructor(props) {
    super(props)
    // Get the JSON data from file
    // Replace with database query
    this.state = {data: noodleData}
  }
  // Method to determine if the noodle matches the filters
  filterNoodles = (item, filters) => {
      // Return false if the type doesn't match
      switch (filters.type) {
        case "dreams":
          if (item.noodleStatus !== "dream") {
            return false
          }
          break
        case "events":
          if (item.noodleStatus !== "event") {
            return false
          }
          break
        default:
          break
      }
      // If the filters match, return the data
      return true
  }
  render() {
    // Create the noodle list and start looping through entries
    // Return the list of noodles that match filters
    return (
      // div for the list of dreams and events
      <div className="noodle_list">
        {/* Mapping array of objects.
                Send the data to filter noodles function
                to return the data or not
                depending on filters. */}
        {this.state.data.map((item, i) => {
          // If the filters match, return the data
          if (this.filterNoodles(item, this.props)) {
            return <NoodleCard data={item} index={i} />
          } else {
            return null
          }
        })}
      </div>
    )
  }
}

export default NoodleList
