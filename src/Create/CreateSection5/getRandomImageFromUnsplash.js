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
  if (noodleTags.length) {
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
    const encodedURL = encodeURIComponent(response.url);
    console.log("Encoded URI");
    console.log(encodedURL);
    return encodedURL;
  });
  // Return the promise
  return randomImage;
}

export default getRandomImageFromUnsplash;
