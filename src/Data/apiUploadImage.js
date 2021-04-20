import apiConfig from "./apiConfig";

// Function to upload an image to api
// Returns a promise with the image URL
function apiUploadImage(type, imageFile) {
  const {
    useAPI,
    apiURL,
    apiNoodlePath,
    apiUserPath,
    apiNoodleUploadImage,
    apiUserUploadImage,
  } = apiConfig();
  if (useAPI) {
    let apiPath;
    let apiFile;
    switch (type) {
      case "dream":
      case "event":
        apiPath = apiNoodlePath;
        apiFile = apiNoodleUploadImage;
        break;
      case "user":
        apiPath = apiUserPath;
        apiFile = apiUserUploadImage;
        break;
      default:
        return Promise.reject({ message: "Unknown Type!" });
    }
    const formData = new FormData();
    formData.append("image", imageFile);
    return fetch(apiURL + apiPath + apiFile, {
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
