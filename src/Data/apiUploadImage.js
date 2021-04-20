import apiConfig from "./apiConfig";

// Function to upload an image to api
// Returns a promise with the image URL
function apiUploadImage(imageFile) {
  const { useAPI, apiURL, apiNoodlePath, apiNoodleUploadImage } = apiConfig();
  if (useAPI) {
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
          return result;
        },
        (error) => {
          // console.log(error);
          // alert(
          //   "Error uploading image! Response from server: " + error.message
          // );
          return error;
        }
      );
  } else {
    return Promise.reject({
      message: "Can't upload image when not using API!",
    });
  }
}

export default apiUploadImage;
