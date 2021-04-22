import apiConfig from "./apiConfig";

// Function to handle deleting data using API
// Return response as a promise
function deleteNoodleOrUser(type, data, returnState, logout, currentUser) {
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
  const { apiURL, apiDelete } = apiConfig();
  // Fetch request to PHP server and return the response
  // Use JSON stringify to convert the data object to a string
  // Use JSON parse to convert the response to an object
  return fetch(apiURL + apiPath + apiDelete, {
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
            // Redirect to user page
            redirectPath = "/user/" + currentUser.userID;
            break;
          case "user":
            // Logout
            logout();
            // Redirect to login
            redirectPath = "/login";
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

export default deleteNoodleOrUser;
