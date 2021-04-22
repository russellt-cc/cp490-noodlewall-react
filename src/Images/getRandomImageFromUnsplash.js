//https://stackoverflow.com/questions/38869197/fetch-set-variable-with-fetch-response-and-return-from-function
//https://stackoverflow.com/questions/4651990/remove-url-parameters-with-javascript-or-jquery

// Function to get a random image from unsplash
function getRandomImageFromUnsplash(
  randomImageWidth,
  randomImageHeight,
  noodleTags
) {
  // Start building the request URL using parameters
  let randomImageRequest =
    "https://source.unsplash.com/random/" +
    randomImageWidth +
    "x" +
    randomImageHeight;
  // Check if we have tags
  if (noodleTags && noodleTags.length) {
    // Get images based on tags
    const tags = noodleTags.join();
    // Append the tags to the request URL
    randomImageRequest = randomImageRequest + "/?" + tags;
  }
  // Get random image as a promise
  return fetch(randomImageRequest).then((response) => {
    // We got a response
    // Get the response URL
    const url = response.url;
    // Break down the URL so it fits in the database
    // Split URL into URL and parameters and store in an array
    const splitURL = url.split("?");
    // Split parameters and store in an array
    const splitParams = splitURL[1].split("&");
    // Split parameters into key and value and store in parallel arrays
    let paramKeys = [];
    let paramValues = [];
    splitParams.map((value, index) => {
      const split = value.split("=");
      paramKeys[index] = split[0];
      paramValues[index] = split[1];
      return true;
    });
    // Rebuild the parameters
    let myParams =
      "w=" +
      randomImageWidth +
      "&h=" +
      randomImageHeight +
      "&fit=" +
      paramValues[paramKeys.indexOf("fit")] +
      // "crop" +
      "&crop=" +
      paramValues[paramKeys.indexOf("crop")];
    // "entropy";
    // Rebuild the URL
    const myURL = splitURL[0] + "?" + myParams;
    // Encode the URL so we can store in the database
    const encodedURL = encodeURIComponent(myURL);
    // Return the encoded URL
    return Promise.resolve({ url, encodedURL });
  });
}

export default getRandomImageFromUnsplash;
