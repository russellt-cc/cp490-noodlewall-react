import React from "react";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

// The sixth create section which deals with tickets
// Need to add multiple ticket support here
class CreateSection6 extends React.Component {
  render() {
    const { sections, onChange, noodlePrice } = this.props;
    return (
      <section id="tickets" className={sections[6 - 1].className}>
        <h1 id="section6" className="create_section_heading">
          {sections[6 - 1].name}
        </h1>
        <p>Create ticket types available for the event.</p>
        <div>
          <label htmlFor="noodleTicketPrice">Ticket Price</label>
          <div id="noodle_ticket_price_container">
            <span>$</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              max="2500"
              name="noodlePrice"
              value={noodlePrice}
              onChange={(event) => onChange(event)}
            ></input>
          </div>
        </div>
      </section>
    );
  }
}

export default CreateSection6;
