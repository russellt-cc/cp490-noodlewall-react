import apiConfig from "./apiConfig";

// Function to delete a hosted image
// Return result as a promise
function apiDeleteImage(imageAddress) {
  const { useAPI, apiURL, apiNoodlePath, apiNoodleDeleteImage } = apiConfig();
  if (useAPI) {
    return fetch(apiURL + apiNoodlePath + apiNoodleDeleteImage, {
      method: "POST",
      body: { imageAddress },
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
