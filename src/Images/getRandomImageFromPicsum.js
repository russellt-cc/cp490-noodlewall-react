// Function to get a random image from lorem picsum
function getRandomImageFromPicsum(randomImageWidth, randomImageHeight) {
  // Get a random number for our image seed
  const seed = Math.floor(Math.random() * 1000000);
  // Build the URL using seed and parameters
  const randomImage =
    "https://picsum.photos/seed/" +
    seed +
    "/" +
    randomImageWidth +
    "/" +
    randomImageHeight +
    "";
  // Return the url
  return randomImage;
}

export default getRandomImageFromPicsum;
