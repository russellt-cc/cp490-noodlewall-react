// React
import React from "react";

// CSS
import "./CreateOrEditNoodle.css";

// Progress Bar
import CreateNavProgressBar from "./CreateNavProgressBar";

// Create Form Sections
import CreateSection1 from "./CreateSection1";
import CreateSection2 from "./CreateSection2";
import CreateSection3 from "./CreateSection3";
import CreateSection4 from "./CreateSection4";
import CreateSection5 from "./CreateSection5/CreateSection5";
import CreateSection6 from "./CreateSection6";
import CreateSection7 from "./CreateSection7";

// Submit Bar
import CreateSubmitBar from "./CreateSubmitBar";

// API Functions and Configuration
import uploadNoodleOrUserImage from "../Data/uploadNoodleOrUserImage";
import deleteNoodleOrUserImage from "../Data/deleteNoodleOrUserImage";
import apiConfig from "../Data/apiConfig";
import readNoodleOrUserByID from "../Data/readNoodleOrUserByID";

// The create dream / event page
class CreateOrEditNoodle extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    // Initialize state
    const noodleTags = [];
    const noodleImages = [];
    const noodleImageText = [];
    this.state = { noodleTags, noodleImages, noodleImageText };
  }
  // Component did mount
  componentDidMount() {
    // Check to see if user is logged in
    const { currentUser } = this.props;
    if (currentUser.userID) {
      // User is logged in
      // Get the type of noodle we are creating
      let { type: noodleStatus } = this.props.match.params;
      // Check validity of the status
      // Set default status
      if (noodleStatus !== "dream" && noodleStatus !== "event") {
        noodleStatus = "dream";
      }
      // Get current user data to pre fill the form
      const { userName, userBio, userBioLong } = currentUser;
      // Check if we are editing an existing entry
      const { id: noodleID } = this.props.match.params;
      if (noodleID) {
        // Get current noodle data to pre fill the form
        readNoodleOrUserByID("noodle", noodleID).then(
          (result) => {
            // Data read successfully
            const thisNoodle = result;
            // Put data in state for editing
            this.setState({
              noodleID,
              createMode: thisNoodle.noodleStatus,
              noodleStatus: thisNoodle.noodleStatus,
              userName: userName ? userName : "User Name",
              userBio: userBio ? userBio : "User Bio",
              userBioLong: userBioLong ? userBioLong : "User Bio Long",
              noodleTitle: thisNoodle.noodleTitle,
              noodleSummary: thisNoodle.noodleSummary
                ? thisNoodle.noodleSummary
                : thisNoodle.noodleTitle,
              noodleDescription: thisNoodle.noodleDescription,
              noodleLocation: thisNoodle.noodleLocation
                ? thisNoodle.noodleLocation
                : undefined,
              noodleDirections: thisNoodle.noodleDirections
                ? thisNoodle.noodleDirections
                : undefined,
              noodleDate: thisNoodle.noodleDate,
              noodleTime: thisNoodle.noodleTime,
              noodleTags: thisNoodle.noodleTags,
              noodleCoverImage: thisNoodle.noodleCoverImage,
              noodleImages:
                thisNoodle.noodleImages && thisNoodle.noodleImages[0]
                  ? thisNoodle.noodleImages
                  : thisNoodle.noodleCoverImage
                  ? [thisNoodle.noodleCoverImage]
                  : [],
              noodleImagesOld:
                thisNoodle.noodleImages && thisNoodle.noodleImages[0]
                  ? thisNoodle.noodleImages
                  : thisNoodle.noodleCoverImage
                  ? [thisNoodle.noodleCoverImage]
                  : [],
              noodleImageText:
                thisNoodle.noodleImageText && thisNoodle.noodleImageText[0]
                  ? thisNoodle.noodleImageText.map((text, index) => {
                      // Decode the text
                      return unescape(text);
                    })
                  : thisNoodle.noodleCoverImage
                  ? [""]
                  : [],
              noodlePrice: thisNoodle.noodlePrice,
              noodleMinTickets: thisNoodle.noodleMinTickets,
              noodleMaxTickets: thisNoodle.noodleMaxTickets,
              noodleCutoff: thisNoodle.noodleCutoff,
              noodleTicketsSold: thisNoodle.noodleTicketsSold,
            });
          },
          (error) => {
            // Data failed to read
            console.log(error);
            this.setState({ error });
          }
        );
      } else {
        // Put default data in state for testing
        this.setState({
          createMode: noodleStatus,
          userName: userName ? userName : "User Name",
          userBio: userBio ? userBio : "User Bio",
          userBioLong: userBioLong ? userBioLong : "User Bio Long",
          noodleTags: [],
          noodleImages: [],
          noodleImageText: [],
          noodleID: null,
        });
      }
    }
  }
  // Method to handle change in html input elements
  handleChange = (event) => {
    const target = event.target;
    let value = undefined;
    switch (target.type) {
      case "checkbox":
        value = target.checked;
        break;
      case "file":
        value = URL.createObjectURL(target.files[0]);
        break;
      default:
        value = target.value;
        break;
    }
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  // Method to upload images
  // Checks if there are any images that need to be uploaded
  // Return a Promise.all
  uploadImages = (status) => {
    // Get image list from state
    let { noodleImages } = this.state;
    // Check for local images
    if (noodleImages && noodleImages[0]) {
      if (noodleImages.some((image) => typeof image === "object")) {
        return Promise.all(
          noodleImages.map((image, index) => {
            // Check if object
            // If object then image is a file object and needs to be uploaded
            if (typeof image === "object") {
              // Upload the image and get the address back as a promise
              const uploadedImagePromise = uploadNoodleOrUserImage(
                status,
                image
              );
              return uploadedImagePromise.then(
                (result) => {
                  // Set the link in state to be the uploaded image
                  let { noodleCoverImage } = this.state;
                  // Compare the cover image with this image
                  if (noodleCoverImage === image) {
                    // Set the cover image to the uploaded file url
                    noodleCoverImage = result.imageAddress;
                  }
                  // Set the image to the uploaded file url
                  noodleImages[index] = result.imageAddress;
                  // Update state
                  this.setState({ noodleImages, noodleCoverImage });
                  // return Promise.resolve({
                  //   message: "Image Uploaded Successfully!",
                  // });
                  return result;
                },
                (error) => {
                  // Upload failed
                  return error;
                }
              );
            } else {
              return Promise.resolve({
                message: "Image Not Hosted.",
                imageAddress: image,
              });
            }
          })
        );
      } else {
        return Promise.resolve({ message: "No Images to Upload." });
      }
    } else {
      return Promise.resolve({ message: "No Images Found." });
    }
  };
  // Method to see which images can be deleted
  // Return a Promise.all
  deleteImages = (status) => {
    // Get the old list of images from state
    const { noodleImagesOld } = this.state;
    // Check if there were any images
    if (noodleImagesOld && noodleImagesOld[0]) {
      // Get the new list of images from state
      const { noodleImages: noodleImagesNew } = this.state;
      // Go through the list of old images
      return Promise.all(
        noodleImagesOld.map((image, index) => {
          // See if the image is hosted on the api
          const { apiURL } = apiConfig();
          const decodedImage = decodeURIComponent(image);
          if (image && decodedImage.substring(0, apiURL.length) === apiURL) {
            // Check to see if it is in the new list of images
            if (!noodleImagesNew.includes(image)) {
              // Delete the image from the server
              const splitImageAddress = decodedImage.split("/");
              const imageAddress =
                splitImageAddress[splitImageAddress.length - 1];
              const data = { imageAddress };
              const deletedImagePromise = deleteNoodleOrUserImage(status, data);
              return deletedImagePromise.then(
                (result) => {
                  // Delete succeeded
                  return result;
                },
                (error) => {
                  // Delete failed
                  return error;
                }
              );
            } else {
              return Promise.resolve({
                message: "Image Not Deleted.",
                imageAddress: image,
              });
            }
          } else {
            return Promise.resolve({
              message: "Image Not Hosted.",
              imageAddress: image,
            });
          }
        })
      );
    } else {
      return Promise.resolve({ message: "No Images to Delete." });
    }
  };
  // Method to create or update a noodle
  submit = (status) => {
    switch (status) {
      case "dream":
        // Validate the required data
        if (
          this.state.noodleTitle &&
          this.state.noodleDescription &&
          this.state.noodleTags.length &&
          this.props.currentUser.userID
        ) {
          this.createOrUpdateNoodle(status);
        } else {
          alert("You must fill in the basic information to save as a dream!");
        }
        break;
      case "event":
        // Validate the required data
        if (
          this.state.noodleTitle &&
          this.state.noodleDescription &&
          this.state.noodleTags.length &&
          this.props.currentUser.userID &&
          this.state.noodleSummary &&
          this.state.noodleLocation &&
          this.state.noodleDirections &&
          this.state.noodleDate &&
          this.state.noodleTime &&
          this.state.noodleCoverImage &&
          this.state.noodlePrice &&
          this.state.noodleMinTickets &&
          this.state.noodleMaxTickets &&
          this.state.noodleCutoff
        ) {
          if (this.state.noodleMinTickets <= this.state.noodleMaxTickets) {
            if (this.state.noodleCutoff <= this.state.noodleDate) {
              this.createOrUpdateNoodle(status);
            } else {
              alert("The cutoff date cannot be after the event date!");
            }
          } else {
            alert(
              "The minimum number of tickets cannot be more than the maximum!"
            );
          }
        } else {
          alert("You must fill in all of the information to save as an event!");
        }
        break;
      default:
        alert("Error: Invalid Type");
        break;
    }
  };
  // Method to create or update a noodle
  createOrUpdateNoodle = (status) => {
    // Check mode
    // Send the data to the main update or create function
    if (this.state.noodleID) {
      // Edit
      // Use chained promises to keep synchronized
      // First delete all deleted images from server
      this.deleteImages(status).then(
        (deleteImagesResult) => {
          // Deletion completed successfully
          // Then once deletion is completed upload all new images
          this.uploadImages(status).then(
            (uploadImagesResult) => {
              // Upload completed successfully
              // Then once upload is completed get the noodleData object from state and props
              const noodleData = this.noodleData(status);
              // Update the entry in the database with the new data
              this.props.onUpdate(status, noodleData).then(
                (updateNoodleResult) => {
                  // Update completed successfully
                },
                (updateNoodleError) => {
                  // Update failed
                  console.log(updateNoodleError);
                  alert("Update Failed! Error: " + updateNoodleError.message);
                }
              );
            },
            (uploadImagesError) => {
              // Upload failed
              console.log(uploadImagesError);
              alert("Image Upload Failed! Error: " + uploadImagesError.message);
            }
          );
        },
        (deleteImagesError) => {
          // Deletion failed
          console.log(deleteImagesError);
          alert("Image Deletion Failed! Error: " + deleteImagesError.message);
        }
      );
    } else {
      // Create
      // Use chained promises to keep synchronized
      // First upload all images to server
      this.uploadImages(status).then(
        (uploadImagesResult) => {
          // Upload completed successfully
          // Then once upload is completed get the noodleData object from state and props
          const noodleData = this.noodleData(status);
          // Create a new entry in the database
          this.props.onCreate(status, noodleData).then(
            (createNoodleResult) => {
              // Create completed successfully
            },
            (createNoodleError) => {
              // Create failed
              console.log(createNoodleError);
              alert("Creation Failed! Error: " + createNoodleError.message);
            }
          );
        },
        (uploadImagesError) => {
          // Upload failed
          console.log(uploadImagesError);
          alert("Image Upload Failed! Error: " + uploadImagesError.message);
        }
      );
    }
  };
  // Method to get data for a noodle
  noodleData = (status) => {
    // Get the required data
    // Create the object to be sent to the API
    const noodleData = {
      noodleTitle: this.state.noodleTitle,
      userID: this.props.currentUser.userID,
      noodleStatus: status,
      noodleDescription: this.state.noodleDescription,
      noodleTags: this.state.noodleTags,
      noodleSummary: this.state.noodleSummary ? this.state.noodleSummary : null,
      noodleLocation: this.state.noodleLocation
        ? this.state.noodleLocation
        : null,
      noodleDirections: this.state.noodleDirections
        ? this.state.noodleDirections
        : null,
      noodleDate: this.state.noodleDate ? this.state.noodleDate : null,
      noodleTime: this.state.noodleTime ? this.state.noodleTime : null,
      noodleCoverImage:
        this.state.noodleImages && this.state.noodleImages.length
          ? this.state.noodleCoverImage
          : null,
      noodleImages: this.state.noodleImages,
      noodleImageText: this.state.noodleImageText.map((text, index) => {
        // Encode noodle image text so it can be stored as CSV
        return escape(text);
      }),
      noodlePrice:
        this.state.noodlePrice !== undefined && this.state.noodlePrice !== null
          ? this.state.noodlePrice
          : null,
      noodleMinTickets:
        this.state.noodleMinTickets !== undefined &&
        this.state.noodleMinTickets !== null
          ? this.state.noodleMinTickets
          : null,
      noodleMaxTickets:
        this.state.noodleMaxTickets !== undefined &&
        this.state.noodleMaxTickets !== null
          ? this.state.noodleMaxTickets
          : null,
      noodleCutoff: this.state.noodleCutoff ? this.state.noodleCutoff : null,
      noodleID: this.state.noodleID ? this.state.noodleID : null,
      noodleTicketsSold:
        this.state.noodleTicketsSold !== undefined &&
        this.state.noodleTicketsSold !== null
          ? this.state.noodleTicketsSold
          : null,
    };
    return noodleData;
  };
  // Methods to update state based on child components
  // Pass these methods as props to child components
  changeTags = (noodleTags) => {
    this.setState({ noodleTags });
  };
  changeImage = (noodleCoverImage) => {
    this.setState({ noodleCoverImage });
  };
  changeImages = (noodleImages) => {
    this.setState({ noodleImages });
  };
  changeImagesText = (noodleImageText) => {
    this.setState({ noodleImageText });
  };
  setMode = (createMode) => {
    this.setState({ createMode });
  };
  // Get Derived State From Props lifecycle method
  static getDerivedStateFromProps(props, state) {
    // Set create mode to event if user selects create event in the navbar while already creating a dream
    const { type: createMode } = props.match.params;
    if (state && createMode === "event" && createMode !== state.createMode) {
      state.createMode = createMode;
    }
    return state;
  }
  // Render method
  render() {
    // Check if user is logged in
    if (this.props.currentUser.userID) {
      // Check if we are loaded
      if (this.state) {
        // Check for error
        if (!this.state.error) {
          // Create an array to store data about the sections
          let sections = [];
          // Set data for the sections
          // Classes are based on the status of entered data and are used in CSS to change the appearance of finished vs unfinished sections
          sections[1 - 1] = {
            name: "Organizer Information",
            className:
              this.state.userName &&
              this.state.userBio &&
              this.state.userBioLong
                ? "finished"
                : "unfinished",
          };
          sections[2 - 1] = {
            name: "Basic Info",
            className:
              this.state.noodleTitle &&
              this.state.noodleSummary &&
              this.state.noodleDescription &&
              this.state.noodleTags.length
                ? "finished"
                : "unfinished",
          };
          sections[3 - 1] = {
            name: "Location",
            className:
              this.state.noodleLocation && this.state.noodleDirections
                ? "finished"
                : "unfinished",
          };
          sections[4 - 1] = {
            name: "Date and Time",
            className:
              this.state.noodleDate && this.state.noodleTime
                ? "finished"
                : "unfinished",
          };
          sections[5 - 1] = {
            name: "Upload Images",
            className: this.state.noodleCoverImage ? "finished" : "unfinished",
          };
          sections[6 - 1] = {
            name: "Create Tickets",
            className: this.state.noodlePrice ? "finished" : "unfinished",
          };
          sections[7 - 1] = {
            name: "Make It Happen",
            className:
              this.state.noodleMinTickets &&
              this.state.noodleMaxTickets &&
              this.state.noodleCutoff
                ? "finished"
                : "unfinished",
          };
          // The sections that are only shown when creating an event instead of a dream
          const eventDetails = () => {
            const { createMode } = this.state;
            if (createMode === "event") {
              return (
                <>
                  <CreateSection3
                    sections={sections}
                    noodleLocation={this.state.noodleLocation}
                    noodleDirections={this.state.noodleDirections}
                    onChange={this.handleChange}
                  ></CreateSection3>
                  <CreateSection4
                    sections={sections}
                    noodleDate={this.state.noodleDate}
                    noodleTime={this.state.noodleTime}
                    onChange={this.handleChange}
                  ></CreateSection4>
                  <CreateSection5
                    sections={sections}
                    noodleTags={this.state.noodleTags}
                    noodleCoverImage={this.state.noodleCoverImage}
                    noodleImages={this.state.noodleImages}
                    noodleImageText={this.state.noodleImageText}
                    onChangeImage={this.changeImage}
                    onChangeImages={this.changeImages}
                    onChangeImagesText={this.changeImagesText}
                  ></CreateSection5>
                  <CreateSection6
                    sections={sections}
                    noodlePrice={this.state.noodlePrice}
                    onChange={this.handleChange}
                  ></CreateSection6>
                  <CreateSection7
                    sections={sections}
                    noodleMinTickets={this.state.noodleMinTickets}
                    noodleMaxTickets={this.state.noodleMaxTickets}
                    noodleCutoff={this.state.noodleCutoff}
                    onChange={this.handleChange}
                  ></CreateSection7>
                  <section>
                    <h1>Development Only</h1>
                    <div>
                      <label htmlFor="noodleTicketsSold">
                        Set Tickets Sold
                      </label>
                      <input
                        type="number"
                        name="noodleTicketsSold"
                        value={this.state.noodleTicketsSold}
                        min="0"
                        step="1"
                        onChange={(event) =>
                          this.setState({
                            noodleTicketsSold: parseInt(event.target.value),
                          })
                        }
                      ></input>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="dev_button"
                        id="forceNotHappeningButton"
                        onClick={() => this.setState({ noodleTicketsSold: 0 })}
                      >
                        Set Tickets to Not Happening
                      </button>
                      <button
                        type="button"
                        className="dev_button"
                        id="forceHappeningButton"
                        onClick={() =>
                          this.setState({
                            noodleTicketsSold: this.state.noodleMinTickets,
                          })
                        }
                      >
                        Set Tickets to Happening
                      </button>
                      <button
                        type="button"
                        className="dev_button"
                        id="forceHappeningButton"
                        onClick={() =>
                          this.setState({
                            noodleTicketsSold: this.state.noodleMaxTickets,
                          })
                        }
                      >
                        Set Tickets to Sold Out
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="dev_button"
                        id="resetStatusButton"
                        onClick={() => this.setState({ noodleStatus: "dream" })}
                      >
                        Reset Status to Dream
                      </button>
                      <button
                        type="button"
                        className="dev_button"
                        id="forceStatusButton"
                        onClick={() => this.setState({ noodleStatus: "event" })}
                      >
                        Force Status to Event
                      </button>
                    </div>
                  </section>
                </>
              );
            }
          };
          // Return the create page
          return (
            <main id="create" className={this.state.createMode}>
              <form id="create_form" onSubmit={this.handleSubmit}>
                <CreateNavProgressBar
                  createMode={this.state.createMode}
                  sections={sections}
                />
                <CreateSection1
                  sections={sections}
                  userName={this.state.userName}
                  userBio={this.state.userBio}
                  userBioLong={this.state.userBioLong}
                  onChange={this.handleChange}
                />
                <CreateSection2
                  sections={sections}
                  noodleTitle={this.state.noodleTitle}
                  noodleSummary={this.state.noodleSummary}
                  noodleDescription={this.state.noodleDescription}
                  noodleTags={this.state.noodleTags}
                  onChange={this.handleChange}
                  onChangeTags={this.changeTags}
                />
                {eventDetails()}
                <CreateSubmitBar
                  sections={sections}
                  noodleStatus={this.state.noodleStatus}
                  createMode={this.state.createMode}
                  setMode={this.setMode}
                  onSubmit={this.submit}
                  onUploadImages={this.uploadImages}
                  noodleID={this.state.noodleID}
                />
              </form>
            </main>
          );
        } else {
          // Show error
          return (
            <main>
              <p>Noodle failed to load! Error: {this.state.error.message}</p>
            </main>
          );
        }
      } else {
        // Show loading
        return (
          <main>
            <p>Loading...</p>
          </main>
        );
      }
    } else {
      // Return error message
      return (
        <main>
          <p>You must login to create a dream or event!</p>
        </main>
      );
    }
  }
}

export default CreateOrEditNoodle;
