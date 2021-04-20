import React from "react";

import "./CreateNavProgressBar.css";

// The nav / progress bar shown on top of the create page
class CreateNavProgressBar extends React.Component {
  render() {
    const { createMode, sections } = this.props;
    if (createMode === "event") {
      return (
        <div
          id="create_nav_progress_bar"
          className={
            this.state && this.state.minimized ? "minimized" : "maximized"
          }
        >
          <div
            id="create_nav_progress_bar_line"
            className={`${
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
          ></div>
          <div id="create_nav_progress_bar_buttons">
            <div>
              <a href="#section1" className={sections[1 - 1].className}>
                1
              </a>
              <p>{sections[1 - 1].name}</p>
            </div>
            <div>
              <a href="#section2" className={sections[2 - 1].className}>
                2
              </a>
              <p>{sections[2 - 1].name}</p>
            </div>
            <div>
              <a href="#section3" className={sections[3 - 1].className}>
                3
              </a>
              <p>{sections[3 - 1].name}</p>
            </div>
            <div>
              <a href="#section4" className={sections[4 - 1].className}>
                4
              </a>
              <p>{sections[4 - 1].name}</p>
            </div>
            <div>
              <a href="#section5" className={sections[5 - 1].className}>
                5
              </a>
              <p>{sections[5 - 1].name}</p>
            </div>
            <div>
              <a href="#section6" className={sections[6 - 1].className}>
                6
              </a>
              <p>{sections[6 - 1].name}</p>
            </div>
            <div>
              <a href="#section7" className={sections[7 - 1].className}>
                7
              </a>
              <p>{sections[7 - 1].name}</p>
            </div>
          </div>
          <button
            type="button"
            id="create_nav_progress_bar_mimimize"
            className="create_nav_progress_bar_toggle"
            onClick={() => this.setState({ minimized: true })}
          >
            -
          </button>
          <button
            type="button"
            id="create_nav_progress_bar_maximize"
            className="create_nav_progress_bar_toggle"
            onClick={() => this.setState({ minimized: false })}
          >
            +
          </button>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default CreateNavProgressBar;
