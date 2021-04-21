import apiConfig from "./apiConfig";

// Function to handle updating data using API
// Return response as a promise
function updateNoodleOrUser(type, data, returnState, currentUser) {
  const { apiNoodlePath, apiUserPath } = apiConfig();
  let apiPath = "product";
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
  const { apiURL, apiUpdate } = apiConfig();
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
        returnState({ redirectPath, currentUser });
        return result;
      },
      (error) => {
        return error;
      }
    );
}

export default updateNoodleOrUser;
