// https://thefaze87.medium.com/build-a-capitalize-first-letter-component-for-reactjs-7ea4e7f799df
// https://github.com/thefaze87/CapitalizedText

import React from "react";

class CapitalizedText extends React.Component {
  render() {
    return jsUcfirst(this.props.text);
  }
}

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default CapitalizedText;
