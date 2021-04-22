import apiConfig from "./apiConfig";

// Function to handle creating data using API
// Return response as a promise
function createNoodleOrUser(type, data, returnState, login) {
  // Get paths from the api configuration
  const { apiNoodlePath, apiUserPath } = apiConfig();
  let apiPath;
  // Check the type
  switch (type) {
    case "noodle":
    case "dream":
    case "event":
      // Set path to noodles
      apiPath = apiNoodlePath;
      break;
    case "user":
      // Set path to users
      apiPath = apiUserPath;
      break;
    default:
      // Reject the request
      return Promise.reject({ message: "Unknown Type!" });
  }
  // Get URL from api config
  const { apiURL, apiCreate } = apiConfig();
  // Fetch request to PHP server and return the response
  // Use JSON stringify to convert the data object to a string
  // Use JSON parse to convert the response to an object
  return fetch(apiURL + apiPath + apiCreate, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        // Handle redirect
        let redirectPath;
        switch (type) {
          case "dream":
          case "event":
            // Redirect to noodle page
            redirectPath = "/details/" + result.noodleID;
            break;
          case "user":
            // Login to new account
            login(result);
            // Redirect to user page
            redirectPath = "/user";
            break;
          default:
            redirectPath = "/";
            break;
        }
        // Use return state method to redirect
        returnState({ redirectPath });
        return result;
      },
      (error) => {
        return error;
      }
    );
}

export default createNoodleOrUser;
