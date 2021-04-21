import apiConfig from "./apiConfig";

// Function to return noodles from a user ID
// or read user from a noodle ID
// Return response as a promise
function dataReadByOtherID(type, otherID) {
  const {
    apiURL,
    apiNoodlePath,
    apiUserPath,
    apiReadNoodlesByUserID,
    apiReadUserByNoodleID,
  } = apiConfig();
  let apiPath;
  let apiFile;
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
      return Promise.reject({ message: "Unknown Type" });
  }
  // Load data from API
  return fetch(apiURL + apiPath + apiFile + otherID).then((res) => res.json());
}

export default dataReadByOtherID;
