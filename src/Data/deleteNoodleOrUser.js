import apiConfig from "./apiConfig";

// Function to handle deleting data using API
// Return response as a promise
function deleteNoodleOrUser(type, data, returnState, logout, currentUser) {
  // Get paths from the api configuration
  const { apiNoodlePath, apiUserPath } = apiConfig();
  let apiPath;
  // Check the type
  switch (type) {
    case "dream":
    case "event":
      apiPath = apiNoodlePath;
      break;
    case "user":
      apiPath = apiUserPath;
      break;
    default:
      // alert("Error: Unknown Type");
      return Promise.reject({ message: "Unknown Type!" });
  }
  // AJAX request to PHP server
  const { apiURL, apiDelete } = apiConfig();
  return fetch(apiURL + apiPath + apiDelete, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        // console.log(result);
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
        returnState({ redirectPath });
        return result;
      },
      (error) => {
        return error;
      }
    );
}

export default deleteNoodleOrUser;
