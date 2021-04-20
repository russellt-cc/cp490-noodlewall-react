import apiConfig from "./apiConfig";

// Function to handle updating data using API
// Return response as a promise
function dataUpdate(type, data, returnState, refresh, currentUserID) {
  // Check whether we are using the API for data
  const { useAPI, apiNoodlePath, apiUserPath } = apiConfig();
  if (useAPI) {
    let apiPath = "product";
    // Check the type
    switch (type) {
      case "dream":
      case "event":
        apiPath = apiNoodlePath;
        break;
      case "user":
        apiPath = apiUserPath;
        break;
      default:
        alert("Error: Unknown Type");
        return false;
    }
    // AJAX request to PHP server
    const { apiURL, apiUpdate } = apiConfig();
    return fetch(apiURL + apiPath + apiUpdate, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // Log data to console
          // console.log("Update Succeeded");
          // console.log("Outgoing Data:");
          // console.log(data);
          // console.log("Incoming Data:");
          // console.log(result);
          // Reload data
          refresh();
          // Handle redirect
          let redirectPath;
          switch (type) {
            case "dream":
            case "event":
              // Redirect to noodle page
              redirectPath = "/details/" + data.noodleID;
              break;
            case "user":
              // Redirect to user page
              redirectPath = "/user/" + currentUserID;
              break;
            default:
              redirectPath = "/";
              break;
          }
          returnState({ redirectPath });
          return result;
        },
        (error) => {
          // console.log("Update Failed");
          // console.log("Incoming Data:");
          // console.log(error);
          alert(
            "Failed to update " +
              type +
              "! Response from server: " +
              error.message +
              "."
          );
          return error;
        }
      );
  } else {
    // Just show a message
    alert("You can't update data when using the static JSON data.");
    return false;
  }
}

export default dataUpdate;
