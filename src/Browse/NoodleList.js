//https://www.pluralsight.com/guides/load-and-render-json-data-into-react-components

//https://www.pluralsight.com/guides/convert-a-json-file-to-an-array-in-react

// Get local JSON file
import {noodleData, userData} from "../noodleData.js"
import React from 'react';
import NoodleCard from "./NoodleCard.js"

// The list of noodles from the JSON data
// Could be modified to pull data from a database
class NoodleList extends React.Component {
    render() {
        // Function to determine if the noodle matches the filters
        function filterNoodles (item, filters) {
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
        // Create the noodle list and start looping through entries
        return(
            // div for the list of dreams and events
            <div className="noodle_list">
                {/* Mapping array of objects.
                Send the data to filter noodles function
                to return the data or not
                depending on filters. */}
                {noodleData.map ((item, i) => {
                    // If the filters match, return the data
                    if (filterNoodles(item, this.props)){
                        return <NoodleCard data={item} index={i}/>
                    }
                })}
            </div>
        )
    }
}

export default NoodleList;
