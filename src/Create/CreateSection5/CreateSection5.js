//https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa
//https://stackoverflow.com/questions/60797390/generate-random-image-by-url
//https://source.unsplash.com/
//https://allegra9.medium.com/unsplash-without-api-ab2dcdb503a0
//https://stackoverflow.com/questions/15130091/amp-character-from-api-url-not-saved-to-mysql-database

import React from "react";
import CreateImage from "./CreateImage";

class CreateSection5 extends React.Component {
  addImage = () => {
    const {
      noodleImages,
      noodleImagesText,
      onChangeImages,
      onChangeImagesText,
    } = this.props;
    const index = noodleImages ? noodleImages.length : 0;
    let splicedImages = noodleImages ? [...noodleImages] : [];
    splicedImages.splice(index, 0, undefined);
    onChangeImages(splicedImages);
    let splicedImagesText = noodleImagesText ? [...noodleImagesText] : [];
    splicedImagesText.splice(index, 0, undefined);
    onChangeImagesText(splicedImagesText);
  };

  changeImage = (image) => {
    this.props.onChangeImage(image);
  };

  changeImages = (index, value) => {
    const { noodleImages, onChangeImages, noodleImage } = this.props;
    // Check if we have a gallery image
    if (!noodleImage) {
      // Set gallery to the image
      this.changeImage(value);
    } else if (noodleImage === noodleImages[index]) {
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

  changeImagesText = (index, value) => {
    const { noodleImagesText, onChangeImagesText } = this.props;
    let changedNoodleImagesText = [...noodleImagesText];
    changedNoodleImagesText[index] = value;
    onChangeImagesText(changedNoodleImagesText);
  };

  removeImage = (index) => {
    const {
      noodleImages,
      noodleImagesText,
      onChangeImages,
      onChangeImagesText,
    } = this.props;
    let splicedImages = [...noodleImages];
    splicedImages.splice(index, 1);
    onChangeImages(splicedImages);
    let splicedImagesText = [...noodleImagesText];
    splicedImagesText.splice(index, 1);
    onChangeImagesText(splicedImagesText);
  };

  changeGalleryImage = (index) => {
    const { onChangeImage, noodleImages } = this.props;
    onChangeImage(noodleImages[index]);
  };

  render() {
    const {
      sections,
      noodleImage,
      noodleImages,
      noodleImagesText,
      noodleTags,
    } = this.props;

    const noodleImageList = noodleImages ? (
      noodleImages.map((item, index) => {
        return (
          <CreateImage
            key={index}
            index={index}
            noodleImage={item}
            noodleImageText={noodleImagesText[index]}
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

    const noodleImageGallery =
      noodleImages && noodleImages.length ? (
        <div id="noodle_image_gallery_container">
          <label>Select the gallery image</label>
          <div id="noodle_image_gallery">
            {noodleImages.map((item, index) => {
              if (item) {
                return (
                  <button
                    key={index}
                    type="button"
                    class={`noodle_image_selector ${
                      item === noodleImage ? "selected" : "unselected"
                    }`}
                    onClick={() => this.changeGalleryImage(index)}
                  >
                    <img src={decodeURIComponent(item)} alt={index}></img>
                  </button>
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
      ) : (
        <></>
      );

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
