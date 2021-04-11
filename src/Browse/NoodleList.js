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
        return(
            // div for the list of dreams and events
            <div className="noodle_list">
                {/* Mapping array of objects */}
                {noodleData.map ((item, i) => (
                    // create a noodle object for each JSON item
                    <NoodleCard data={item} />
                ))}
            </div>
        )
    }
}

export default NoodleList;
