//https://www.pluralsight.com/guides/load-and-render-json-data-into-react-components

//https://www.pluralsight.com/guides/convert-a-json-file-to-an-array-in-react

// Get local JSON file
import {noodleData} from "./noodleData.js";
import React from 'react';
import {Link} from "react-router-dom"

class NoodleList extends React.Component {
    render() {
        return(
            <div className="noodle_list">
                {/* Mapping array of objects */}
                {noodleData.map ((item, i) => (
                    <Noodle data={item} />
                ))}
            </div>
        )
    }
}

class Noodle extends React.Component {
    render() {
        return(
            <div className="noodle">
                <p className="noodle id">ID: {this.props.data.noodleID}</p>
                <p className="noodle title">Title: {this.props.data.noodleTitle}</p>
                <p className="noodle status">Status: {this.props.data.noodleStatus}</p>
                <p className="noodle noodler">Noodler: {this.props.data.noodlerName}</p>
                <p className="noodle description">Description: {this.props.data.noodleDescription}</p>
                <p className="noodle tags">Tags: {this.props.data.noodleTags.map(item => {
                    return <Link className="noodle tags tag" to={`/browse/${item}`}>#{item}</Link>
                })}</p>
            </div>
        )
    }
}

export default NoodleList;
