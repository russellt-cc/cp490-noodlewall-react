import apiConfig from "./apiConfig";

// Function to upload an image to api
// Returns a promise with the image URL
function uploadNoodleOrUserImage(type, imageFile) {
  // Get paths from the api configuration
  const {
    apiURL,
    apiNoodlePath,
    apiUserPath,
    apiNoodleUploadImage,
    apiUserUploadImage,
  } = apiConfig();
  let apiPath;
  let apiFile;
  // Check the type
  switch (type) {
    case "noodle":
    case "dream":
    case "event":
      // Set path to noodles
      apiPath = apiNoodlePath;
      apiFile = apiNoodleUploadImage;
      break;
    case "user":
      // Set path to users
      apiPath = apiUserPath;
      apiFile = apiUserUploadImage;
      break;
    default:
      // Reject the request
      return Promise.reject({ message: "Unknown Type!" });
  }
  // Create a formData object to store the image data
  const formData = new FormData();
  // Append the image to the formData
  formData.append("image", imageFile);
  // Fetch request to PHP server and return the response
  // Use JSON parse to convert the response to an object
  return fetch(apiURL + apiPath + apiFile, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
}

export default uploadNoodleOrUserImage;
