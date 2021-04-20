import React from "react";
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

import getRandomImageFromPicsum from "../../Images/getRandomImageFromPicsum";
import getRandomImageFromUnsplash from "../../Images/getRandomImageFromUnsplash";

// Class to structure the upload noodle image objects
// Import into image list on create page
class CreateImage extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    // Initialize change image to undefined and configure the size of random images
    this.state = {
      noodleChangeImage: undefined,
      randomImageWidth: 1280,
      randomImageHeight: 720,
    };
    // Check to see if we have an image already
    if (!this.props.noodleImage) {
      // We don't have an image
      // Get a random image from unsplash
      const randomImage = getRandomImageFromUnsplash(
        this.state.randomImageWidth,
        this.state.randomImageHeight,
        this.props.noodleTags
      );
      randomImage.then(
        (result) => {
          // Got random image
          // console.log(result);
          this.changeImage(result.encodedURL);
        },
        (error) => {
          // Random image failed
          // console.log(error);
        }
      );
    }
  }

  // Method to change this images URL
  changeImage = (noodleImage) => {
    const { onChangeImage, index } = this.props;
    onChangeImage(index, noodleImage);
    // console.log(typeof noodleImage);
  };

  // Method to change the text associated with this image
  changeImageText = (noodleImageText) => {
    const { onChangeImageText, index } = this.props;
    onChangeImageText(index, noodleImageText);
  };

  // Method to delete this image
  delete = () => {
    const { onRemoveImage, index } = this.props;
    onRemoveImage(index);
  };

  // Render method
  render() {
    // Destructure state to get configuration
    const {
      noodleChangeImage,
      randomImageWidth,
      randomImageHeight,
    } = this.state;
    // Destructure props to get data
    const { noodleImage, noodleImageText, index, noodleTags } = this.props;
    // Return the image component
    return (
      <div className="noodle_image_container">
        <div className="noodle_image_header_container">
          <label>Event Image {index + 1}</label>
          <button
            type="button"
            className="noodleImageRemoveButton"
            onClick={() => this.delete()}
          >
            X
          </button>
        </div>
        <div className="noodle_image_file_upload">
          <label htmlFor="noodleImageUpload">
            Upload an image from your device
          </label>
          <input
            type="file"
            accept="image/*"
            name="noodleImageUpload"
            onChange={(event) => {
              this.changeImage(event.target.files[0]);
            }}
          ></input>
        </div>
        <div className="noodle_image_set_url">
          <label htmlFor="noodleImageLink">
            Get an image from the internet
          </label>
          <Textbox
            attributesInput={{
              name: "noodleImageLink",
            }}
            value={noodleChangeImage}
            onChange={(value, event) => {
              this.setState({ noodleChangeImage: value });
            }}
          />
          <div className="noodle_image_button_container">
            <button
              type="button"
              className="noodleImageButton"
              onClick={() => {
                this.changeImage(noodleChangeImage);
                this.setState({
                  noodleChangeImage: undefined,
                });
              }}
            >
              Get Image from URL
            </button>
            <button
              type="button"
              className="noodleImageButton"
              onClick={() => {
                const randomImage = getRandomImageFromPicsum(
                  randomImageWidth,
                  randomImageHeight
                );
                this.changeImage(randomImage);
              }}
            >
              Get a Random Image from Picsum
            </button>
            <button
              type="button"
              className="noodleImageButton"
              onClick={() => {
                const randomImage = getRandomImageFromUnsplash(
                  randomImageWidth,
                  randomImageHeight,
                  noodleTags
                );
                randomImage.then(
                  (result) => {
                    // Got random image
                    // console.log(result);
                    this.changeImage(result.encodedURL);
                  },
                  (error) => {
                    // Random image failed
                    // console.log(error);
                  }
                );
              }}
            >
              Get a Random Image from Unsplash
            </button>
          </div>
        </div>
        <div className="noodle_image_preview_container">
          {noodleImage && typeof noodleImage === "object" ? (
            <img src={URL.createObjectURL(noodleImage)} alt="Noodle" />
          ) : noodleImage ? (
            <img src={decodeURIComponent(noodleImage)} alt="Noodle" />
          ) : (
            <></>
          )}
        </div>
        <div className="noodle_image_text_container">
          <label htmlFor="noodleImageText">
            Enter some text to go along with the image
          </label>
          <Textarea
            attributesInput={{ name: "noodleImageText", rows: 5 }}
            value={noodleImageText}
            onChange={(value, event) => {
              this.changeImageText(value);
            }}
          />
        </div>
      </div>
    );
  }
}

export default CreateImage;
