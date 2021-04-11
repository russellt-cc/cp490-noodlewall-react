import './css/Details.css';
import React from 'react';
import { noodleData } from "../noodleData.js"

class Details extends React.Component {
  render() {
    // Get the JSON from the file
    // Replace with database query
    const noodle = noodleData[this.props.match.params.id - 1]
    // Return the details page
    return (
      <main>

        <section id="intro">
          <h1>{noodle.noodleTitle}</h1>

        </section>

        <section id="details">

        </section>

      </main>
    );
  }
}

export default Details;
