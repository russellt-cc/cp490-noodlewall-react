// React
import React from "react";

// React inputs validation
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

// The first create section which deals with organizer information
class CreateSection1 extends React.Component {
  render() {
    const { sections, onChange, userName, userBio, userBioLong } = this.props;
    return (
      <section id="organizer_information" className={sections[1 - 1].className}>
        <h1 id="section1" className="create_section_heading">
          {sections[1 - 1].name}
        </h1>
        <p>Edit your profile to change this information.</p>
        <div>
          <label htmlFor="userName">Organizer Name</label>
          <Textbox
            attributesInput={{ name: "userName" }}
            value={userName}
            onChange={(value, event) => {
              onChange(event);
            }}
          />
        </div>
        <div>
          <label htmlFor="userBio">Organizer Detail Short</label>
          <Textarea
            attributesInput={{ name: "userBio", rows: 3 }}
            value={userBio}
            onChange={(value, event) => {
              onChange(event);
            }}
          />
        </div>
        <div>
          <label htmlFor="userBioLong">Organizer Detail Long</label>
          <Textarea
            attributesInput={{ name: "userBioLong", rows: 5 }}
            value={userBioLong}
            onChange={(value, event) => {
              onChange(event);
            }}
          />
        </div>
      </section>
    );
  }
}

export default CreateSection1;
