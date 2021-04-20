import apiConfig from "./apiConfig";

// Function to delete a hosted image
// Return result as a promise
function apiDeleteImage(imageAddress) {
  const { apiURL, apiNoodlePath, apiNoodleDeleteImage } = apiConfig();
  return fetch(apiURL + apiNoodlePath + apiNoodleDeleteImage, {
    method: "POST",
    body: { imageAddress },
  }).then(
    (result) => {
      // console.log(result);
      return "Image Deleted";
    },
    (error) => {
      // console.log(error);
      alert("Error deleting image! Response from server: " + error.message);
      return error.message;
    }
  );
}

export default apiDeleteImage;
