import React from "react";
import { Link } from "react-router-dom";

class CreateSubmitBar extends React.Component {
  render() {
    const {
      sections,
      noodleStatus,
      createMode,
      setMode,
      onCreate,
      noodleID,
    } = this.props;

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
            onClick={() => onCreate("dream")}
          >
            Save as Dream
          </button>
        );
      } else {
        return <></>;
      }
    };

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
            onClick={() => onCreate("event")}
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

    return (
      <div id="create_submit_bar">
        {cancelButton()}
        {createDreamButton()}
        {createEventButton()}
      </div>
    );
  }
}

export default CreateSubmitBar;
