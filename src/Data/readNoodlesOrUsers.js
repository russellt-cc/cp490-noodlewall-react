import apiConfig from "./apiConfig";

// Function to handle reading data from API
// Return response as a promise
function readNoodlesOrUsers(type) {
  // Get paths from the api configuration
  const { apiURL, apiNoodlePath, apiUserPath, apiRead } = apiConfig();
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
  // AJAX request to PHP server
  return fetch(apiURL + apiPath + apiRead).then((res) => res.json());
}

export default readNoodlesOrUsers;
