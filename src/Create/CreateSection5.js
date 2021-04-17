import React from "react";
import CreateImage from "./CreateImage";

class CreateSection5 extends React.Component {
  changeImage = (image) => {
    this.props.onChangeImage(image);
  };

  render() {
    const {
      sections,
      onChange,
      noodleImage,
      noodleImageText,
      noodleImages,
      noodleImagesText,
      noodleTags,
    } = this.props;
    return (
      <section id="images" className={sections[5 - 1].className}>
        <h1 id="section5" className={"create_section_heading"}>
          {sections[5 - 1].name}
        </h1>
        <p>
          Upload as many images as you would like to be displayed on the event
          page.
        </p>
        <CreateImage noodleTags={noodleTags} />
      </section>
    );
  }
}

export default CreateSection5;
