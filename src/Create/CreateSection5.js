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
    const index = noodleImages.length;
    let splicedImages = [...noodleImages];
    splicedImages.splice(index, 0, undefined);
    onChangeImages(splicedImages);
    let splicedImagesText = [...noodleImagesText];
    splicedImagesText.splice(index, 0, undefined);
    onChangeImagesText(splicedImagesText);
  };

  changeImage = (image) => {
    this.props.onChangeImage(image);
  };

  changeImages = (index, value) => {
    const { noodleImages, onChangeImages } = this.props;
    let changedNoodleImages = [...noodleImages];
    changedNoodleImages[index] = value;
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

  render() {
    const { sections, noodleImages, noodleImagesText, noodleTags } = this.props;
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
        {noodleImages.map((item, index) => {
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
        })}
      </section>
    );
  }
}

export default CreateSection5;
