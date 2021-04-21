// React
import React from "react";

// The fourth create section which deals with date and time
class CreateSection4 extends React.Component {
  render() {
    const { sections, onChange, noodleDate, noodleTime } = this.props;
    return (
      <section id="date_time" className={sections[4 - 1].className}>
        <h1 id="section4" className="create_section_heading">
          {sections[4 - 1].name}
        </h1>
        <p>Set the date and time of the event.</p>
        <div>
          <label htmlFor="noodleDate">Event Date</label>
          <input
            type="date"
            name="noodleDate"
            value={noodleDate}
            onChange={(event) => onChange(event)}
          ></input>
        </div>
        <div>
          <label htmlFor="noodleTime">Event Time</label>
          <input
            type="time"
            name="noodleTime"
            value={noodleTime}
            onChange={(event) => onChange(event)}
          ></input>
        </div>
      </section>
    );
  }
}

export default CreateSection4;
