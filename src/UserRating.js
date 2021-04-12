import React from "react"

// Class to generate the rating elements
class UserRating extends React.Component {
  constructor(props) {
    // Function to take in a numeric rating
    // and then generate an array of strings
    // to determine whether the star should
    // be filled or not using html classes
    function setRatingClasses(userRating) {
      // Make an array to store the star classes
      var star_classes = ["", "", "", "", ""]
      // Determine which ones are checked based on the rating    
      switch (userRating) {
        case 5:
          star_classes[5] = "checked"
          star_classes[4] = "checked"
          star_classes[3] = "checked"
          star_classes[2] = "checked"
          star_classes[1] = "checked"
          break
        case 4:
          star_classes[4] = "checked"
          star_classes[3] = "checked"
          star_classes[2] = "checked"
          star_classes[1] = "checked"
          break
        case 3:
          star_classes[3] = "checked"
          star_classes[2] = "checked"
          star_classes[1] = "checked"
          break
        case 2:
          star_classes[2] = "checked"
          star_classes[1] = "checked"
          break
        case 1:
        default:
          star_classes[1] = "checked"
          break
      }
      // Return the classes as an array of strings
      return star_classes
    }
    super(props)
    // Get the star classes using the function and save in state
    // Use the set rating classes function
    this.state = {star_classes: setRatingClasses(this.props.rating)}
  }
  render() {
    // Get the star classes from state as a constant
    const star_classes = this.state.star_classes
    // Return the rating element
    return(
      <p class="user_rating">
        <span className={`fa fa-star ${star_classes[1]}`}></span>
        <span className={`fa fa-star ${star_classes[2]}`}></span>
        <span className={`fa fa-star ${star_classes[3]}`}></span>
        <span className={`fa fa-star ${star_classes[4]}`}></span>
        <span className={`fa fa-star ${star_classes[5]}`}></span>
      </p>
    )
  }
}

export default UserRating
