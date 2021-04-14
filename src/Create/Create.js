import "./css/Create.css";
import React from "react";

// The create dream / event page
class Create extends React.Component {
  render() {
    // Get the type of noodle we are creating
    let { type: noodleStatus } = this.props.match.params;
    // Check validity of the status
    if (noodleStatus !== "dream" && noodleStatus !== "event") {
      noodleStatus = "event";
    }
    // Get current user data to pre fill the form
    const { userData, currentUserID } = this.props;
    const thisUser = userData.filter((user) => {
      return parseInt(user.userID) === parseInt(currentUserID);
    })[0];
    const { userName, userBio, userBioLong } = thisUser;

    // Set data for the sections
    const section1 = { name: "Organizer Information" };
    const section2 = { name: "Basic Info" };
    const section3 = { name: "Location" };
    const section4 = { name: "Date and Time" };
    const section5 = { name: "Upload Images" };
    const section6 = { name: "Create Tickets" };
    const section7 = { name: "Make It Happen" };

    // Return the create page
    return (
      <main id="create">
        <form id="create_form">
          <div id="create_nav_progress_bar">
            <div id="create_nav_progress_bar_line"></div>
            <div id="create_nav_progress_bar_buttons">
              <div>
                <a href="#1">1</a>
                <p>{section1.name}</p>
              </div>
              <div>
                <a href="#2">2</a>
                <p>{section2.name}</p>
              </div>
              <div>
                <a href="#3">3</a>
                <p>{section3.name}</p>
              </div>
              <div>
                <a href="#4">4</a>
                <p>{section4.name}</p>
              </div>
              <div>
                <a href="#5">5</a>
                <p>{section5.name}</p>
              </div>
              <div>
                <a href="#6">6</a>
                <p>{section6.name}</p>
              </div>
              <div>
                <a href="#7">7</a>
                <p>{section7.name}</p>
              </div>
            </div>
          </div>
          <section id="organizer_information">
            <a name="1">
              <h1>{section1.name}</h1>
            </a>
            <p>Enter some information about who is organizing the event.</p>
            <div>
              <label for="hostName">Organizer Name</label>
              <input type="text" name="hostName" value={userName}></input>
            </div>
            <div>
              <label for="hostBioShort">Organizer Detail Short</label>
              <textarea name="hostBioShort" rows="2" value={userBio}></textarea>
            </div>
            <div>
              <label for="hostBioLong">Organizer Detail Long</label>
              <textarea
                name="hostBioLong"
                rows="5"
                value={userBioLong}
              ></textarea>
            </div>
          </section>
          <section id="the_basics">
            <a name="2">
              <h1>{section2.name}</h1>
            </a>
            <p>
              Enter the name of the event and some essential details about it.
            </p>
            <div>
              <label for="eventName">Event Name</label>
              <input type="text" name="eventName"></input>
            </div>
            <div>
              <label for="eventBioShort">Event Summary</label>
              <textarea name="eventBioShort" rows="2"></textarea>
            </div>
            <div>
              <label for="eventBioLong">Event Description</label>
              <textarea name="eventBioLong" rows="5"></textarea>
            </div>
          </section>
          <section id="location">
            <a name="3">
              <h1>{section3.name}</h1>
            </a>
            <p>Where is your event located?</p>
            <div>
              <label for="eventLocation">Event Location</label>
              <input type="text" name="eventLocation"></input>
            </div>
          </section>
          <section id="date_time">
            <a name="4">
              <h1>{section4.name}</h1>
            </a>
            <p>Set the date and time of the event.</p>
            <div>
              <label for="eventDate">Event Date</label>
              <input type="date" name="eventDate"></input>
            </div>
            <div>
              <label for="eventTime">Event Time</label>
              <input type="time" name="eventTime"></input>
            </div>
          </section>
          <section id="images">
            <a name="5">
              <h1>{section5.name}</h1>
            </a>
            <p>
              Upload as many images as you would like to be displayed on the
              event page.
            </p>
            <div>
              <label for="eventImage">Event Image</label>
              <input type="file" accept="image/*" name="eventImage"></input>
            </div>
          </section>
          <section id="tickets">
            <a name="6">
              <h1>{section6.name}</h1>
            </a>
            <p>Create ticket types available for the event.</p>
            <div>
              <label for="eventTicketPrice">Ticket Price</label>
              <input type="number" name="eventTicketPrice"></input>
            </div>
          </section>
          <section id="secret_sauce">
            <a name="7">
              <h1>{section7.name}</h1>
            </a>
            <p>Adjust the secret sauce details to make the noodle stick.</p>
            <div>
              <label for="eventMinTickets">Minimum Tickets Required</label>
              <input type="number" name="eventMinTickets"></input>
              <label for="eventMaxTickets">Maximum Tickets Available</label>
              <input type="number" name="eventMaxTickets"></input>
              <label for="eventCutoff">Cutoff Date</label>
              <input type="date" name="eventCutoff"></input>
            </div>
          </section>
          <div id="create_submit_bar">
            <button id="create_dream_button" class="noodle_button">
              Save as Dream
            </button>
            <button id="create_event_button" class="noodle_button">
              Make it Happen
            </button>
          </div>
        </form>
      </main>
    );
  }
}

export default Create;
