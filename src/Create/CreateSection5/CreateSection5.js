//https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa
//https://stackoverflow.com/questions/60797390/generate-random-image-by-url
//https://source.unsplash.com/
//https://allegra9.medium.com/unsplash-without-api-ab2dcdb503a0
//https://stackoverflow.com/questions/15130091/amp-character-from-api-url-not-saved-to-mysql-database

import React from "react";
import CreateImage from "./CreateImage";

// The fifth create section which deals with images
class CreateSection5 extends React.Component {
  // Method to add a new empty image object
  addImage = () => {
    // Get exisiting data from props
    const {
      noodleImages,
      noodleImageText,
      onChangeImages,
      onChangeImagesText,
    } = this.props;
    // Get the index to insert the new object
    const index = noodleImages ? noodleImages.length : 0;
    // Make a copy of the images array
    let splicedImages = noodleImages ? [...noodleImages] : [];
    // Add a new object to the images array
    splicedImages.splice(index, 0, undefined);
    // Update the images array
    onChangeImages(splicedImages);
    // Make a copy of the images text array
    let splicedImagesText = noodleImageText ? [...noodleImageText] : [];
    // Add a new object to the array
    splicedImagesText.splice(index, 0, undefined);
    // Update the text array
    onChangeImagesText(splicedImagesText);
  };

  // Method to change an image
  changeImages = (index, value) => {
    // Get method and existing data from props
    const { noodleImages, onChangeImages, noodleCoverImage } = this.props;
    // Check if we have a gallery image
    if (!noodleCoverImage) {
      // Set gallery to the image
      this.changeImage(value);
    } else if (noodleCoverImage === noodleImages[index]) {
      // Set the gallery to the new image
      this.changeImage(value);
    }
    // Copy the array of images
    let changedNoodleImages = [...noodleImages];
    // Change the image in the new array
    changedNoodleImages[index] = value;
    // Send the new array to change function
    onChangeImages(changedNoodleImages);
  };

  // Method to change an images text
  changeImagesText = (index, value) => {
    // Get method and existing data from props
    const { noodleImageText, onChangeImagesText } = this.props;
    // Make a copy of the images text array
    let changednoodleImageText = [...noodleImageText];
    // Update the text in the copied array
    changednoodleImageText[index] = value;
    // Update the array
    onChangeImagesText(changednoodleImageText);
  };

  // Method to remove an image
  removeImage = (index) => {
    // Get methods and existing data from props
    const {
      noodleImages,
      noodleImageText,
      onChangeImages,
      onChangeImagesText,
    } = this.props;
    // Make a copy of the images array
    let splicedImages = [...noodleImages];
    // Remove the specified image
    splicedImages.splice(index, 1);
    // Update the images array
    onChangeImages(splicedImages);
    // Make a copy of the images text array
    let splicedImagesText = [...noodleImageText];
    // Remove the specified text
    splicedImagesText.splice(index, 1);
    // Update the text array
    onChangeImagesText(splicedImagesText);
  };

  // Method to change the gallery image based on value
  changeImage = (image) => {
    this.props.onChangeImage(image);
  };

  // Method to change the gallery image based on index
  changeGalleryImage = (index) => {
    const { onChangeImage, noodleImages } = this.props;
    onChangeImage(noodleImages[index]);
  };

  // Render method
  render() {
    // Get data from props
    const {
      sections,
      noodleCoverImage,
      noodleImages,
      noodleImageText,
      noodleTags,
    } = this.props;

    // Create the image list by mapping the noodleImages array to CreateImage objects
    // Get text data from parallel noodleImageText array
    // Send in methods as props to change images, change text, or remove the image
    const noodleImageList =
      noodleImages && noodleImages[0] !== null ? (
        noodleImages.map((item, index) => {
          return (
            <CreateImage
              key={index}
              index={index}
              noodleImage={item}
              noodleImageText={noodleImageText[index]}
              noodleTags={noodleTags}
              onChangeImage={this.changeImages}
              onChangeImageText={this.changeImagesText}
              onRemoveImage={this.removeImage}
            />
          );
        })
      ) : (
        <></>
      );

    // Create the gallery component by mapping the noodleImages array to button objects
    const noodleImageGallery =
      noodleImages && noodleImages.length && noodleImages[0] !== null ? (
        <div id="noodle_image_gallery_container">
          <label>Select the gallery image</label>
          <div id="noodle_image_gallery">
            {noodleImages.map((item, index) => {
              if (item) {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`noodle_image_selector ${
                      item === noodleCoverImage ? "selected" : "unselected"
                    }`}
                    onClick={() => this.changeGalleryImage(index)}
                  >
                    <img src={decodeURIComponent(item)} alt={index}></img>
                  </button>
                );
              } else {
                return <div key={index}></div>;
              }
            })}
          </div>
        </div>
      ) : (
        <></>
      );

    // Return the images section
    return (
      <section id="images" className={sections[5 - 1].className}>
        <h1 id="section5" className={"create_section_heading"}>
          {sections[5 - 1].name}
        </h1>
        <p>
          Upload as many images as you would like to be displayed on the event
          page.
        </p>
        <button
          type="button"
          id="noodleAddImageButton"
          onClick={() => {
            this.addImage();
          }}
        >
          Add Image
        </button>
        {noodleImageList}
        {noodleImageGallery}
      </section>
    );
  }
}

export default CreateSection5;
