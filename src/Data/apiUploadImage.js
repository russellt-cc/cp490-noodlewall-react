import apiConfig from "./apiConfig";

// Function to upload an image to api
// Returns a promise with the image URL
function apiUploadImage(type, imageFile) {
  const {
    apiURL,
    apiNoodlePath,
    apiUserPath,
    apiNoodleUploadImage,
    apiUserUploadImage,
  } = apiConfig();
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
        return result;
      },
      (error) => {
        return error;
      }
    );
}

export default apiUploadImage;
