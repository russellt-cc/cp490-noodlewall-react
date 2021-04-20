import apiConfig from "./apiConfig";

// Function to upload an image to api
// Returns a promise with the image URL
function apiUploadImage(imageFile) {
  const { apiURL, apiNoodlePath, apiNoodleUploadImage } = apiConfig();
  const formData = new FormData();
  formData.append("image", imageFile);
  return fetch(apiURL + apiNoodlePath + apiNoodleUploadImage, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then(
      (result) => {
        // console.log(result);
        return result.imageAddress;
      },
      (error) => {
        // console.log(error);
        alert("Error uploading image! Response from server: " + error.message);
        return error.message;
      }
    );
}

export default apiUploadImage;
