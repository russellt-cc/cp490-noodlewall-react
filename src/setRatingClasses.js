// Function to take in a numeric rating
// and then generate an array of strings
// to determine whether the star should
// be filled or not using html classes

function setRatingClasses (userRating) {
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
    return star_classes
}

export default setRatingClasses
