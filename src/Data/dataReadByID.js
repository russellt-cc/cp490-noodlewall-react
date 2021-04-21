import apiConfig from "./apiConfig";

// Function to read data by ID
// Return response as a promise
function dataReadByID(type, id) {
  const {
    useAPI,
    apiURL,
    apiNoodlePath,
    apiUserPath,
    apiReadByID,
  } = apiConfig();
  if (useAPI) {
    let apiPath;
    switch (type) {
      case "noodle":
      case "event":
      case "dream":
        // Load noodle from API
        apiPath = apiNoodlePath;
        break;
      case "user":
      case "host":
      case "organizer":
        // Load user from API
        apiPath = apiUserPath;
        break;
      default:
        return Promise.reject({ message: "Unknown Type" });
    }
    // Load data from API
    return fetch(apiURL + apiPath + apiReadByID + id).then((res) => res.json());
  } else {
    return Promise.reject({ message: "Not Implemented" });
  }
}

export default dataReadByID;
