import apiConfig from "./apiConfig";

// Function to delete a hosted image
function apiDeleteImage(imageAddress) {
  const { apiURL, apiNoodlePath, apiNoodleDeleteImage } = apiConfig();
  fetch(apiURL + apiNoodlePath + apiNoodleDeleteImage, {
    method: "POST",
    body: { imageAddress },
  }).then(
    (result) => {
      // console.log(result);
    },
    (error) => {
      // console.log(error);
      alert("Error deleting image! Response from server: " + error.message);
    }
  );
}

export default apiDeleteImage;
