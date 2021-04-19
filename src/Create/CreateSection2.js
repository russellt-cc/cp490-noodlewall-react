import React from "react";
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

// The second create section which deals with basics of the noodle
class CreateSection2 extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    // Initialize the noodle add tag in state
    this.state = { noodleAddTag: undefined };
  }

  // Method to add a new tag
  addNoodleTag = (noodleAddTag) => {
    // Get method and data from props
    const { onChangeTags, noodleTags } = this.props;
    // Check if the tag is alreay added
    if (!noodleTags.includes(noodleAddTag)) {
      // Add the tag to the end of the tags object
      const index = noodleTags.length;
      let splicedNoodles = [...noodleTags];
      splicedNoodles.splice(index, 0, noodleAddTag);
      onChangeTags(splicedNoodles);
    }
  };

  // Method to remove a tag
  removeNoodleTag = (index) => {
    // Get method and data from props
    const { onChangeTags, noodleTags } = this.props;
    // Remove the tag from the tags object
    let splicedNoodles = [...noodleTags];
    splicedNoodles.splice(index, 1);
    onChangeTags(splicedNoodles);
  };

  // Render method
  render() {
    // Destructure the props to get existing data
    const {
      sections,
      onChange,
      noodleTitle,
      noodleSummary,
      noodleDescription,
      noodleTags,
    } = this.props;
    // Destructure the state to get the new tag entered
    const { noodleAddTag } = this.state;
    // Return the section
    return (
      <section id="the_basics" className={sections[2 - 1].className}>
        <h1 id="section2" className="create_section_heading">
          {sections[2 - 1].name}
        </h1>
        <p>Enter the name of the event and some essential details about it.</p>
        <div>
          <label htmlFor="noodleTitle">Event Name</label>
          <Textbox
            attributesInput={{ name: "noodleTitle" }}
            value={noodleTitle}
            onChange={(value, event) => {
              onChange(event);
            }}
          />
        </div>
        <div>
          <label htmlFor="noodleSummary">Event Summary</label>
          <Textarea
            attributesInput={{ name: "noodleSummary", rows: 3 }}
            value={noodleSummary}
            onChange={(value, event) => {
              onChange(event);
            }}
          />
        </div>
        <div>
          <label htmlFor="noodleDescription">Event Description</label>
          <Textarea
            attributesInput={{ name: "noodleDescription", rows: 5 }}
            value={noodleDescription}
            onChange={(value, event) => {
              onChange(event);
            }}
          />
        </div>
        <div id="noodle_tags_container">
          <label htmlFor="noodleAddTag">Event Tags</label>
          <div id="noodle_add_tags">
            <Textbox
              attributesInput={{
                name: "noodleAddTag",
                id: "noodleAddTagInput",
              }}
              value={noodleAddTag}
              onChange={(noodleAddTag, e) => {
                this.setState({ noodleAddTag });
              }}
            />
            <button
              type="button"
              id="noodleAddTagButton"
              onClick={() => {
                this.addNoodleTag(noodleAddTag);
              }}
            >
              Add Tag
            </button>
          </div>
          <ul id="noodleTagsList">
            {noodleTags.map((item, index) => {
              return (
                <li key={index}>
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => {
                      this.removeNoodleTag(index);
                    }}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default CreateSection2;
