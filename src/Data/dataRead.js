import apiConfig from "./apiConfig";

// Function to handle reading data from API
// Return response as a promise
function dataRead(type) {
  const { apiURL, apiRead } = apiConfig();
  let apiPath;
  switch (type) {
    case "noodles":
      // Get noodles
      apiPath = "event/";
      break;
    case "users":
      // Get users
      apiPath = "user/";
      break;
    default:
      return Promise.reject({ message: "Unknown Type!" });
  }
  // AJAX request to PHP server
  return fetch(apiURL + apiPath + apiRead)
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    );
}

export default dataRead;
