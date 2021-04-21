import apiConfig from "./apiConfig";

// Function to handle creating data using API
// Return response as a promise
function createNoodleOrUser(type, data, returnState, login) {
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
  const { apiURL, apiCreate } = apiConfig();
  return fetch(apiURL + apiPath + apiCreate, {
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
        returnState({ redirectPath });
        return result;
      },
      (error) => {
        return error;
      }
    );
}

export default createNoodleOrUser;
