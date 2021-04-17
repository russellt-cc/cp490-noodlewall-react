import React from "react";
import { Textbox, Textarea } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

class CreateSection2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { noodleAddTag: undefined };
  }
  render() {
    const {
      sections,
      onChange,
      onAddTag,
      onRemoveTag,
      noodleTitle,
      noodleSummary,
      noodleDescription,
      noodleTags,
    } = this.props;
    const { noodleAddTag } = this.state;
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
                onAddTag(noodleAddTag);
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
                      onRemoveTag(index);
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
