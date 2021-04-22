import apiConfig from "./apiConfig";

// Function to delete a hosted image
// Return result as a promise
function deleteNoodleOrUserImage(type, data) {
  // Get paths from the api configuration
  const {
    apiURL,
    apiNoodlePath,
    apiUserPath,
    apiNoodleDeleteImage,
    apiUserDeleteImage,
  } = apiConfig();
  let apiPath;
  let apiFile;
  // Check the type
  switch (type) {
    case "noodle":
    case "dream":
    case "event":
      // Set path to noodles
      apiPath = apiNoodlePath;
      apiFile = apiNoodleDeleteImage;
      break;
    case "user":
      // Set path to users
      apiPath = apiUserPath;
      apiFile = apiUserDeleteImage;
      break;
    default:
      // Reject the request
      return Promise.reject({ message: "Unknown Type!" });
  }
  // Fetch request to PHP server and return the response
  // Use JSON stringify to convert the data object to a string
  // Use JSON parse to convert the response to an object
  return fetch(apiURL + apiPath + apiFile, {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export default deleteNoodleOrUserImage;
