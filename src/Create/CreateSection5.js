import React from "react";
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

class CreateSection5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noodleChangeImage: undefined,
      randomImageWidth: 1280,
      randomImageHeight: 720,
    };
  }

  changeImage = (image) => {
    this.props.onChangeImage(image);
  };

  getRandomImageFromPicsum = () => {
    const { randomImageWidth, randomImageHeight } = this.state;
    // Get a random number for our image seed
    const seed = Math.floor(Math.random() * 1000);
    const randomImage =
      "https://picsum.photos/seed/" +
      seed +
      "/" +
      randomImageWidth +
      "/" +
      randomImageHeight +
      "";
    this.changeImage(randomImage);
  };

  getRandomImageFromUnsplash = () => {
    const { randomImageWidth, randomImageHeight } = this.state;
    const { noodleTags } = this.props;
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
    // Get random image
    fetch(randomImageRequest).then((response) => {
      console.log("Request for random image succeeded");
      console.log("Outgoing Data");
      console.log(randomImageRequest);
      console.log("Incoming Data");
      console.log(response);
      const encodedURL = encodeURIComponent(response.url);
      console.log("Encoded URI");
      console.log(encodedURL);
      this.changeImage(encodedURL);
    });
  };

  render() {
    const { sections, onChange, noodleImage, noodleImageText } = this.props;
    const { noodleChangeImage } = this.state;
    return (
      <section id="images" className={sections[5 - 1].className}>
        <h1 id="section5" className={"create_section_heading"}>
          {sections[5 - 1].name}
        </h1>
        <p>
          Upload as many images as you would like to be displayed on the event
          page.
        </p>
        <div className="noodle_image_container">
          <div className="noodle_image_header_container">
            <label>Event Image</label>
            <button
              type="button"
              className="noodleImageRemoveButton"
              onClick={() => {
                this.changeImage(undefined);
                this.setState({
                  noodleChangeImage: undefined,
                });
              }}
            >
              X
            </button>
          </div>
          <div className="noodle_image_file_upload">
            <label htmlFor="noodleImage">
              Upload an image from your device
            </label>
            <input
              type="file"
              accept="image/*"
              name="noodleImage"
              onChange={(event) => {
                this.changeImage(URL.createObjectURL(event.target.files[0]));
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
              onChange={(value) => {
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
                  this.getRandomImageFromPicsum();
                }}
              >
                Get a Random Image from Picsum
              </button>
              <button
                type="button"
                className="noodleImageButton"
                onClick={() => this.getRandomImageFromUnsplash()}
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
                onChange(event);
              }}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default CreateSection5;
