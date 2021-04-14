import "./css/Create.css";
import React from "react";

class Create extends React.Component {
  render() {
    // Get the type of noodle we are creating
    let { type: noodleStatus } = this.props.match.params;
    // Check validity of the status
    if (noodleStatus != "dream" && noodleStatus != "event") {
      noodleStatus = "event";
    }
    // Return the create page
    return (
      <main id="create">
        <form>
          <section id="organizer_information">
            <h1>Organizer Information</h1>
            <p>Enter some information about who is organizing the event.</p>
            <div>
              <label for="hostName">Organizer Name</label>
              <input type="text" name="hostName"></input>
            </div>
            <div>
              <label for="hostBioShort">Organizer Detail Short</label>
              <textarea name="hostBioShort" rows="2"></textarea>
            </div>
            <div>
              <label for="hostBioLong">Organizer Detail Long</label>
              <textarea name="hostBioLong" rows="5"></textarea>
            </div>
          </section>
          <section id="the_basics"></section>
          <section id="location"></section>
          <section id="date_time"></section>
          <section id="images"></section>
          <section id="tickets"></section>
          <section id="make_it_happen"></section>
        </form>
      </main>
    );
  }
}

export default Create;
