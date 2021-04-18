import noodleOverlay from "../Images/dream_watermark_512.png";

// Functional Stateless Component
// Function to return the overlay
const NoodleOverlay = (noodleStatus) => {
  if (noodleStatus === "dream") {
    return <img src={noodleOverlay} alt="Noodle" className="overlay"></img>;
  } else {
    return null;
  }
};

export default NoodleOverlay;
