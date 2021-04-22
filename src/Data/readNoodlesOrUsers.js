import apiConfig from "./apiConfig";

// Function to handle reading data from API
// Return response as a promise
function readNoodlesOrUsers(type) {
  // Get paths from the api configuration
  const { apiURL, apiNoodlePath, apiUserPath, apiRead } = apiConfig();
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
  return fetch(apiURL + apiPath + apiRead).then((res) => res.json());
}

export default readNoodlesOrUsers;
