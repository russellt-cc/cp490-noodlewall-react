//https://stackoverflow.com/questions/38869197/fetch-set-variable-with-fetch-response-and-return-from-function
//https://stackoverflow.com/questions/4651990/remove-url-parameters-with-javascript-or-jquery

function getRandomImageFromUnsplash(
  randomImageWidth,
  randomImageHeight,
  noodleTags
) {
  let randomImageRequest =
    "https://source.unsplash.com/random/" +
    randomImageWidth +
    "x" +
    randomImageHeight;
  // Check if we have tags
  if (noodleTags && noodleTags.length) {
    // Get images based on tags
    const tags = noodleTags.join();
    randomImageRequest = randomImageRequest + "/?" + tags;
  }
  // Get random image as a promise
  const randomImage = fetch(randomImageRequest).then((response) => {
    console.log("Request for random image succeeded");
    console.log("Outgoing Data");
    console.log(randomImageRequest);
    console.log("Incoming Data");
    console.log(response);
    console.log("Response URL");
    console.log(response.url);
    // Break down the URL so it fits in the database
    // Split URL into URL and parameters and store in an array
    const splitURL = response.url.split("?");
    // Split parameters and store in an array
    const splitParams = splitURL[1].split("&");
    // Split parameters into key and value and store in parallel arrays
    let paramKeys = [];
    let paramValues = [];
    splitParams.map((value, index) => {
      const split = value.split("=");
      paramKeys[index] = split[0];
      paramValues[index] = split[1];
    });
    // Rebuild the parameters
    let myParams =
      "w=" +
      randomImageWidth +
      "&h=" +
      randomImageHeight +
      "&fit=" +
      paramValues[paramKeys.indexOf("fit")] +
      "&crop=" +
      paramValues[paramKeys.indexOf("crop")];
    // Rebuild the URL
    const myURL = splitURL[0] + "?" + myParams;
    // Encode the URL so we can store in the database
    const encodedURL = encodeURIComponent(myURL);
    // Return the encoded URL
    return encodedURL;
  });
  // Return the promise
  return randomImage;
}

export default getRandomImageFromUnsplash;
