import React from "react";
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

class CreateSection3 extends React.Component {
  render() {
    const { sections, onChange, noodleLocation, noodleDirections } = this.props;
    return (
      <section id="location" className={sections[3 - 1].className}>
        <h1 id="section3" className="create_section_heading">
          {sections[3 - 1].name}
        </h1>
        <p>Where is your event located?</p>
        <div>
          <label htmlFor="noodleLocation">Event Location</label>
          <Textbox
            attributesInput={{ name: "noodleLocation" }}
            value={noodleLocation}
            onChange={(value, event) => {
              onChange(event);
            }}
          />
          <label htmlFor="noodleDirections">Event Directions</label>
          <Textarea
            attributesInput={{ name: "noodleDirections", rows: 5 }}
            value={noodleDirections}
            onChange={(value, event) => {
              onChange(event);
            }}
          />
        </div>
      </section>
    );
  }
}

export default CreateSection3;
