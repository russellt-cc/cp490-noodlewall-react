import React from "react";
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

import getRandomImageFromPicsum from "../../Images/getRandomImageFromPicsum";
import getRandomImageFromUnsplash from "../../Images/getRandomImageFromUnsplash";

class CreateImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noodleChangeImage: undefined,
      randomImageWidth: 1280,
      randomImageHeight: 720,
    };
  }

  changeImage = (noodleImage) => {
    const { onChangeImage, index } = this.props;
    onChangeImage(index, noodleImage);
  };

  changeImageText = (noodleImageText) => {
    const { onChangeImageText, index } = this.props;
    onChangeImageText(index, noodleImageText);
  };

  delete = () => {
    const { onRemoveImage, index } = this.props;
    onRemoveImage(index);
  };

  render() {
    const {
      noodleChangeImage,
      randomImageWidth,
      randomImageHeight,
    } = this.state;
    const { noodleImage, noodleImageText, index, noodleTags } = this.props;
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
        {/* <div className="noodle_image_file_upload">
          <label htmlFor="noodleImage">Upload an image from your device</label>
          <input
            type="file"
            accept="image/*"
            name="noodleImage"
            onChange={(event) => {
              this.changeImage(URL.createObjectURL(event.target.files[0]));
            }}
          ></input>
        </div> */}
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
                randomImage.then((randomImage) =>
                  this.changeImage(randomImage)
                );
              }}
            >
              Get a Random Image from Unsplash
            </button>
          </div>
        </div>
        <div className="noodle_image_preview_container">
          {noodleImage ? (
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
