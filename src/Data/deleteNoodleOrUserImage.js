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
  switch (type) {
    case "dream":
    case "event":
      apiPath = apiNoodlePath;
      apiFile = apiNoodleDeleteImage;
      break;
    case "user":
      apiPath = apiUserPath;
      apiFile = apiUserDeleteImage;
      break;
    default:
      return Promise.reject({ message: "Unknown Type!" });
  }
  return fetch(apiURL + apiPath + apiFile, {
    method: "POST",
    body: JSON.stringify(data),
  })
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

export default deleteNoodleOrUserImage;
