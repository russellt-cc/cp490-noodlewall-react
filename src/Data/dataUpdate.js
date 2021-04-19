// Function to handle updating data using API
function dataUpdate(
  type,
  data,
  apiConfig,
  returnState,
  refresh,
  currentUserID
) {
  // Check whether we are using the API for data
  const { useAPI, apiNoodlePath, apiUserPath } = apiConfig;
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
        return;
    }
    // AJAX request to PHP server
    const { apiURL, apiUpdate } = apiConfig;
    fetch(apiURL + apiPath + apiUpdate, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // Log data to console
          console.log("Update Succeeded");
          console.log("Outgoing Data:");
          console.log(data);
          console.log("Incoming Data:");
          console.log(result);
          // Reload data
          refresh();
          // Handle redirect
          let redirect;
          switch (type) {
            case "dream":
            case "event":
              // Redirect to noodle page
              redirect = "/details/" + data.noodleID;
              break;
            case "user":
              // Redirect to user page
              redirect = "/user/" + currentUserID;
              break;
            default:
              redirect = "/";
              break;
          }
          returnState({ redirect });
        },
        (error) => {
          console.log("Update Failed");
          console.log("Incoming Data:");
          console.log(error);
          alert(error.message);
        }
      );
  } else {
    // Just show a message
    alert("You can't update data when using the static JSON data.");
  }
}

export default dataUpdate;
