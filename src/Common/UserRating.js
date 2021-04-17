import React from "react";

// Class to generate the rating elements
class UserRating extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    // Get the star classes using the method and save in state
    this.state = {
      star_classes: this.setRatingClasses(parseInt(this.props.rating)),
    };
  }
  // Method to take in a numeric rating
  // and then generate an array of strings
  // to determine whether the star should
  // be filled or not using html classes
  setRatingClasses = (userRating) => {
    // Make an array to store the star classes
    let star_classes = ["", "", "", "", ""];
    // Determine which ones are checked based on the rating
    switch (userRating) {
      case 5:
        star_classes[5] = "checked";
        star_classes[4] = "checked";
        star_classes[3] = "checked";
        star_classes[2] = "checked";
        star_classes[1] = "checked";
        break;
      case 4:
        star_classes[4] = "checked";
        star_classes[3] = "checked";
        star_classes[2] = "checked";
        star_classes[1] = "checked";
        break;
      case 3:
        star_classes[3] = "checked";
        star_classes[2] = "checked";
        star_classes[1] = "checked";
        break;
      case 2:
        star_classes[2] = "checked";
        star_classes[1] = "checked";
        break;
      case 1:
      default:
        star_classes[1] = "checked";
        break;
    }
    // Return the classes as an array of strings
    return star_classes;
  };
  // Render method
  render() {
    // Return the rating element
    return (
      <p className="user_rating">
        <span className={`fa fa-star ${this.state.star_classes[1]}`}></span>
        <span className={`fa fa-star ${this.state.star_classes[2]}`}></span>
        <span className={`fa fa-star ${this.state.star_classes[3]}`}></span>
        <span className={`fa fa-star ${this.state.star_classes[4]}`}></span>
        <span className={`fa fa-star ${this.state.star_classes[5]}`}></span>
      </p>
    );
  }
}

export default UserRating;
