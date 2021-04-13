import noodleOverlay from "./images/dream_watermark_512.png"
  
// Function to return the overlay
function generateNoodleOverlay(noodleStatus) {
  if (noodleStatus == "dream") {
    return <img src={noodleOverlay} alt="Noodle" class="overlay"></img>
  } else {
    return null
  }
}

export default generateNoodleOverlay
