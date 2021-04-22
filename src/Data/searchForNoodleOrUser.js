import apiConfig from "./apiConfig";

// Function to handle searching for a noodle or user
// Return response as a promise
function searchForNoodleOrUser(type, query) {
  // Get paths from the api configuration
  const { apiURL, apiNoodlePath, apiUserPath, apiSearch } = apiConfig();
  let apiPath;
  // Check the type
  switch (type) {
    case "noodles":
    case "events":
    case "dreams":
      // Get noodles
      apiPath = apiNoodlePath;
      break;
    case "users":
      // Get users
      apiPath = apiUserPath;
      break;
    default:
      // Reject the request
      return Promise.reject({ message: "Unknown Type!" });
  }
  // Fetch request to PHP server and return the response
  // Use JSON parse to convert the response to an object
  return fetch(apiURL + apiPath + apiSearch + query).then((res) => res.json());
}

export default searchForNoodleOrUser;
