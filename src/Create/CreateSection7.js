// React
import React from "react";

// The seventh create section which deals with Noodlewall specific information
class CreateSection7 extends React.Component {
  render() {
    const {
      sections,
      onChange,
      noodleMinTickets,
      noodleMaxTickets,
      noodleCutoff,
    } = this.props;
    return (
      <section id="secret_sauce" className={sections[7 - 1].className}>
        <h1 id="section7" className="create_section_heading">
          {sections[7 - 1].name}
        </h1>
        <p>Adjust the secret sauce details to make the noodle stick.</p>
        <div>
          <label htmlFor="noodleMinTickets">Minimum Tickets Required</label>
          <input
            type="number"
            min="1"
            step="1"
            max="2500"
            name="noodleMinTickets"
            value={noodleMinTickets}
            onChange={(event) => onChange(event)}
          ></input>
          <label htmlFor="noodleMaxTickets">Maximum Tickets Available</label>
          <input
            type="number"
            min="1"
            step="1"
            max="2500"
            name="noodleMaxTickets"
            value={noodleMaxTickets}
            onChange={(event) => onChange(event)}
          ></input>
          <label htmlFor="noodleCutoff">Cutoff Date</label>
          <input
            type="date"
            name="noodleCutoff"
            value={noodleCutoff}
            onChange={(event) => onChange(event)}
          ></input>
        </div>
      </section>
    );
  }
}

export default CreateSection7;
