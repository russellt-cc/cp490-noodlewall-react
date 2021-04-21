// This doc contains example(template) api calls

//         interacting with events

// create
//     http://www.gatkinson.site/noodlewall/event/create.php
//     http://localhost/noodlewall/event/create.php
// {
//     "noodleID" : null,
//     "noodleTitle" : "event title",
//     "userID" : 1,
//     "noodleStatus" : "event",
//     "noodleDescription" : "super great event description",
//     "noodleSummary" : "super great event summary",
//     "noodleTags" : ["fishing", "food", "hobby", "friends", "sports"],
//     "noodleCoverImage" : null,
//     "noodleImages" : [],
//     "noodleImageText" : [],
//     "noodleLocation" : null,
//     "noodleDirections" : null,
//     "noodleDate" : null,
//     "noodleTime" : null,
//     "noodlePrice" : null,
//     "noodleMinTickets" : null,
//     "noodleMaxTickets" : null,
//     "noodleTicketsSold" : null,
//     "noodleCutoff" : null
// }

// read
//     http://www.gatkinson.site/noodlewall/event/read.php
//     http://localhost/noodlewall/event/read.php

// update
//     http://www.gatkinson.site/noodlewall/event/update.php
//     http://localhost/noodlewall/event/update.php
// {
//     "noodleID" : 3,
//     "noodleTitle" : "new event title",
//     "userID" : 1,
//     "noodleStatus" : "event",
//     "noodleDescription" : "even better event description",
//     "noodleSummary" : "even better event summary",
//     "noodleTags" : ["fishing", "food", "hobby", "friends", "sports"],
//     "noodleCoverImage" : null,
//     "noodleImages" : [],
//     "noodleImageText" : [],
//     "noodleLocation" : null,
//     "noodleDirections" : null,
//     "noodleDate" : null,
//     "noodleTime" : null,
//     "noodlePrice" : null,
//     "noodleMinTickets" : null,
//     "noodleMaxTickets" : null,
//     "noodleTicketsSold" : null,
//     "noodleCutoff" : null
// }

// delete
//     http://www.gatkinson.site/noodlewall/event/delete.php
//     http://localhost/noodlewall/event/delete.php
// {
//     "noodleID" : 3
// }

// search
//     http://www.gatkinson.site/noodlewall/event/search.php?s=fishing
//     http://localhost/noodlewall/event/search.php?s=fishing

// getByID
//     http://www.gatkinson.site/noodlewall/event/getByID.php?id=1
//     http://localhost/noodlewall/event/getByID.php?id=1

// getEventsByUserID
//     http://www.gatkinson.site/noodlewall/event/getEventsByUserID.php?id=2
//     http://localhost/noodlewall/event/getEventsByUserID.php?id=2

// uploadEventImage
//     http://www.gatkinson.site/noodlewall/event/uploadEventImage.php
//     http://www.localhost/noodlewall/event/uploadEventImage.php
// {
//     "image" : file
// }

// deleteEventImage
//     http://www.gatkinson.site/noodlewall/event/deleteEventImage.php
//     http://www.localhost/noodlewall/event/deleteEventImage.php
// {
//     "imageAddress" : "http://gatkinson.site/noodlewall/images/events/example.png"
// }

//         interacting with users

// create
//     http://www.gatkinson.site/noodlewall/user/create.php
//     http://localhost/noodlewall/user/create.php
// {
//     "userID" : null,
//     "userName" : "username1",
//     "userFirstName" : "john",
//     "userLastName" : "appleseed",
//     "userRating" : null,
//     "userBio" : null,
//     "userBioLong" : null,
//     "userImage" : null
// }

// read
//     http://www.gatkinson.site/noodlewall/user/read.php
//     http://localhost/noodlewall/user/read.php

// update
//     http://www.gatkinson.site/noodlewall/user/update.php
//     http://localhost/noodlewall/user/update.php
// {
//     "userID" : 21,
//     "userName" : "new username1",
//     "userFirstName" : "john",
//     "userLastName" : "appleseed",
//     "userRating" : null,
//     "userBio" : null,
//     "userBioLong" : null,
//     "userImage" : null
// }

// delete
//     http://www.gatkinson.site/noodlewall/user/delete.php
//     http://localhost/noodlewall/user/delete.php
// {
//     "noodleID" : 3
// }

// search
//     http://www.gatkinson.site/noodlewall/user/search.php?s=fishing
//     http://localhost/noodlewall/user/search.php?s=fishing

// getByID
//     http://www.gatkinson.site/noodlewall/user/getByID.php?id=1
//     http://localhost/noodlewall/user/getByID.php?id=1

// getUserByEventID
//     http://www.gatkinson.site/noodlewall/user/getUserByEventID.php?id=2
//     http://localhost/noodlewall/user/getUserByEventID.php?id=2

// UploadUserIcon
//     http://www.gatkinson.site/noodlewall/user/uploadUserIcon.php
//     http://www.localhost/noodlewall/user/uploadUserIcon.php
// {
//     "image" : file
// }

// deleteUserIcon
//     http://www.gatkinson.site/noodlewall/user/deleteUserIcon.php
//     http://www.localhost/noodlewall/user/deleteUserIcon.php
// {
//     "iconAddress" : "http://gatkinson.site/noodlewall/images/events/example.png"
// }

// Configure API calls

function apiConfig() {
  return {
    apiURL: "http://gatkinson.site/noodlewall/",
    // apiURL: "http://www.localhost/noodlewall/",
    apiCreate: "create.php",
    apiRead: "read.php",
    apiUpdate: "update.php",
    apiDelete: "delete.php",
    apiSearch: "search.php?s=",
    apiNoodlePath: "event/",
    apiUserPath: "user/",
    apiNoodleUploadImage: "uploadEventImage.php",
    apiNoodleDeleteImage: "deleteEventImage.php",
    apiUserUploadImage: "uploadUserIcon.php",
    apiUserDeleteImage: "deleteUserIcon.php",
    apiReadByID: "getByID.php?id=",
    apiReadNoodlesByUserID: "getEventsByUserID.php?id=",
    apiReadUserByNoodleID: "getUserByEventID.php?id=",
  };
}

export default apiConfig;
