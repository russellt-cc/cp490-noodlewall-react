import './css/Create.css';
import React from 'react';

class Create extends React.Component {
  render() {
    return (
      <main>
        testing creating {this.props.match.params.type}
      </main>
    );
  }
}

export default Create;
