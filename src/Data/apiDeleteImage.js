import apiConfig from "./apiConfig";

// Function to delete a hosted image
// Return result as a promise
function apiDeleteImage(type, data) {
  const {
    useAPI,
    apiURL,
    apiNoodlePath,
    apiUserPath,
    apiNoodleDeleteImage,
    apiUserDeleteImage,
  } = apiConfig();
  if (useAPI) {
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
          // console.log(result);
          return result;
        },
        (error) => {
          // console.log(error);
          // alert("Error deleting image! Response from server: " + error.message);
          return error;
        }
      );
  } else {
    return Promise.reject({
      message: "Can't delete image when not using API!",
    });
  }
}

export default apiDeleteImage;
