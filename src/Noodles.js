//https://www.pluralsight.com/guides/load-and-render-json-data-into-react-components

//https://www.pluralsight.com/guides/convert-a-json-file-to-an-array-in-react

// Get local JSON file
import {noodleData} from "./noodleData.js"
import React from 'react';
import {Link} from "react-router-dom"
import fishing from "./images/fishing-crop.png"

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
                    <Noodle data={item} />
                ))}
            </div>
        )
    }
}

// Class to structure the data for each noodle
class Noodle extends React.Component {
    render() {
        // Get the noodle data from the props
        const data = this.props.data
        const noodleID = data.noodleID
        const userID = data.userID
        const status = data.noodleStatus
        const userRating = data.userRating
        // Make an array to store the star classes
        var star_classes = ["", "", "", "", ""]
        // Determine which ones are checked based on the rating
        switch (userRating) {
            case 5:
                star_classes[5] = "checked"
                star_classes[4] = "checked"
                star_classes[3] = "checked"
                star_classes[2] = "checked"
                star_classes[1] = "checked"
                break
            case 4:
                star_classes[4] = "checked"
                star_classes[3] = "checked"
                star_classes[2] = "checked"
                star_classes[1] = "checked"
                break
            case 3:
                star_classes[3] = "checked"
                star_classes[2] = "checked"
                star_classes[1] = "checked"
                break
            case 2:
                star_classes[2] = "checked"
                star_classes[1] = "checked"
                break
            case 1:
            default:
                star_classes[1] = "checked"
                break
        }
        return(
            // div for each noodle
            <div className={`noodle ${status}`}>
                <Link class="noodle_image_link" to={`/details/${noodleID}`}><img src={fishing} alt="Noodle"></img></Link>
                <p className={`noodle_id`}><span className="noodle_label">ID: </span>{noodleID}</p>
                <p className={`noodle_title`}><span className="noodle_label">Title: </span><Link to={`/details/${noodleID}`}>{data.noodleTitle}</Link></p>
                <p className={`noodle_status`}><span className="noodle_label">Status: </span>{status}</p>
                <div className={`noodle_userinfo`}>
                    <p className={`noodle_userid`}><span className="noodle_label">User ID: </span>{userID}</p>
                    <p className={`noodle_noodler`}><span className="noodle_label">Noodler: </span><Link to={`/user/${userID}`}>{data.userName}</Link></p>
                    <p class="user_rating">
                        <span className={`fa fa-star ${star_classes[1]}`}></span>
                        <span className={`fa fa-star ${star_classes[2]}`}></span>
                        <span className={`fa fa-star ${star_classes[3]}`}></span>
                        <span className={`fa fa-star ${star_classes[4]}`}></span>
                        <span className={`fa fa-star ${star_classes[5]}`}></span>
                    </p>
                </div>
                <p className={`noodle_description`}><span className="noodle_label">Description: </span>{data.noodleDescription}</p>
                <div className={`noodle_tags_section`}>
                    <p className="noodle_label">Tags:</p>
                    <div className={`noodle_tag_list`}>
                        {data.noodleTags.map(item => {
                            // create a link for each tag
                            return <Link className={`noodle_tag ${status}_tag`} to={`/browse/${item}`}>#{item}</Link>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default NoodleList;
