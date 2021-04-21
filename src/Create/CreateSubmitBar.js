// React
import React from "react";

// React router
import { Link } from "react-router-dom";

// CSS
import "./CreateSubmitBar.css";

// The button bar shown on the bottom of the create page
class CreateSubmitBar extends React.Component {
  render() {
    const {
      sections,
      noodleStatus,
      createMode,
      setMode,
      onSubmit,
      noodleID,
    } = this.props;
    // Create the cancel button based on current status
    // If there is a status then we are editing so show the cancel button
    const cancelButton = () => {
      if (noodleStatus) {
        return (
          <Link
            id="edit_cancel_button"
            className={`noodle_button ${noodleStatus}`}
            to={`/details/${noodleID}`}
          >
            Cancel Editing
          </Link>
        );
      } else {
        return <></>;
      }
    };
    // Create the create dream button based on status
    // If the status is not already an event show the option to save as a dream
    const createDreamButton = () => {
      if (noodleStatus !== "event") {
        return (
          <button
            id="create_dream_button"
            className={`noodle_button ${
              sections[1 - 1].className === "finished" &&
              sections[2 - 1].className === "finished"
                ? "finished"
                : "unfinished"
            }`}
            name="create_dream"
            type="button"
            onClick={() => onSubmit("dream")}
          >
            Save as Dream
          </button>
        );
      } else {
        return <></>;
      }
    };
    // Create the create event button based on mode
    // If the mode is event show make it happen button
    // If the mode is dream show the show all button
    const createEventButton = () => {
      if (createMode === "event") {
        return (
          <button
            id="create_event_button"
            className={`noodle_button ${
              sections[1 - 1].className === "finished" &&
              sections[2 - 1].className === "finished" &&
              sections[3 - 1].className === "finished" &&
              sections[4 - 1].className === "finished" &&
              sections[5 - 1].className === "finished" &&
              sections[6 - 1].className === "finished" &&
              sections[7 - 1].className === "finished"
                ? "finished"
                : "unfinished"
            }`}
            name="create_event"
            type="button"
            onClick={() => onSubmit("event")}
          >
            Make it Happen
          </button>
        );
      } else {
        return (
          <button
            id="create_event_button"
            className="noodle_button"
            name="create_event"
            type="button"
            onClick={() => setMode("event")}
          >
            Show All
          </button>
        );
      }
    };
    // Return the submit bar
    return (
      <div
        id="create_submit_bar"
        className={
          this.state && this.state.minimized ? "minimized" : "maximized"
        }
      >
        {cancelButton()}
        {createDreamButton()}
        {createEventButton()}
        <button
          type="button"
          id="create_submit_bar_mimimize"
          className="create_submit_bar_toggle"
          onClick={() => this.setState({ minimized: true })}
        >
          -
        </button>
        <button
          type="button"
          id="create_submit_bar_maximize"
          className="create_submit_bar_toggle"
          onClick={() => this.setState({ minimized: false })}
        >
          +
        </button>
      </div>
    );
  }
}

export default CreateSubmitBar;
