import apiConfig from "./apiConfig";

// Function to delete a hosted image
// Return result as a promise
function apiDeleteImage(type, imageAddress) {
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
    const splitImageAddress = imageAddress.split("/");
    const fileName = splitImageAddress[splitImageAddress.length - 1];
    return fetch(apiURL + apiPath + apiFile, {
      method: "POST",
      body: { fileName },
    }).then(
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
