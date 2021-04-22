import apiConfig from "./apiConfig";

// Function to read data by ID
// Return response as a promise
function readNoodleOrUserByID(type, id) {
  // Get paths from the api configuration
  const { apiURL, apiNoodlePath, apiUserPath, apiReadByID } = apiConfig();
  let apiPath;
  // Check the type
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
      // Reject the request
      return Promise.reject({ message: "Unknown Type" });
  }
  // Fetch request to PHP server and return the response
  // Use JSON parse to convert the response to an object
  return fetch(apiURL + apiPath + apiReadByID + "?id=" + id).then((res) =>
    res.json()
  );
}

export default readNoodleOrUserByID;
