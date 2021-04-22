import apiConfig from "./apiConfig";

// Function to handle updating data using API
// Return response as a promise
function updateNoodleOrUser(type, data, returnState, currentUser) {
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
  const { apiURL, apiUpdate } = apiConfig();
  // Fetch request to PHP server and return the response
  // Use JSON stringify to convert the data object to a string
  // Use JSON parse to convert the response to an object
  return fetch(apiURL + apiPath + apiUpdate, {
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
            redirectPath = "/details/" + data.noodleID;
            break;
          case "user":
            // Redirect to user page
            redirectPath = "/user";
            // Update user info
            currentUser = data;
            break;
          default:
            redirectPath = "/";
            break;
        }
        // Use return state method to redirect and change current user data in state
        returnState({ redirectPath, currentUser });
        return result;
      },
      (error) => {
        return error;
      }
    );
}

export default updateNoodleOrUser;
