import apiConfig from "./apiConfig";

// Function to handle searching for a noodle or user
// Return response as a promise
function searchForNoodleOrUser(type, query) {
  // Get paths from the api configuration
  const { apiURL, apiNoodlePath, apiUserPath, apiSearch } = apiConfig();
  let apiPath;
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
      return Promise.reject({ message: "Unknown Type!" });
  }
  // Load data from API
  return fetch(apiURL + apiPath + apiSearch + query).then((res) => res.json());
}

export default searchForNoodleOrUser;
