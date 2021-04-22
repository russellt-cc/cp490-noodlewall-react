import apiConfig from "./apiConfig";

// Function to return noodles from a user ID
// or read user from a noodle ID
// Return response as a promise
function readNoodleOrUserByOtherID(type, otherID) {
  // Get paths from the api configuration
  const {
    apiURL,
    apiNoodlePath,
    apiUserPath,
    apiReadNoodlesByUserID,
    apiReadUserByNoodleID,
  } = apiConfig();
  let apiPath;
  let apiFile;
  // Check the type
  switch (type) {
    case "noodles":
    case "events":
    case "dreams":
      // Load noodle from API
      apiPath = apiNoodlePath;
      apiFile = apiReadNoodlesByUserID;
      break;
    case "user":
    case "host":
    case "organizer":
      // Load user from API
      apiPath = apiUserPath;
      apiFile = apiReadUserByNoodleID;
      break;
    default:
      // Reject the request
      return Promise.reject({ message: "Unknown Type" });
  }
  // Fetch request to PHP server and return the response
  // Use JSON parse to convert the response to an object
  return fetch(apiURL + apiPath + apiFile + "?id=" + otherID).then((res) =>
    res.json()
  );
}

export default readNoodleOrUserByOtherID;
