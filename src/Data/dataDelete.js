// Function to handle deleting data using API
function dataDelete(
  type,
  data,
  apiConfig,
  returnState,
  refresh,
  logout,
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
    const { apiURL, apiDelete } = apiConfig;
    fetch(apiURL + apiPath + apiDelete, {
      method: "POST",
      body: JSON.stringify(data),
    }).then(
      (result) => {
        console.log("Delete Succeeded");
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
            // Redirect to user page
            redirect = "/user/" + currentUserID;
            break;
          case "user":
            // Logout
            logout();
            // Redirect to login
            redirect = "/login";
            break;
          default:
            redirect = "/";
            break;
        }
        returnState({ redirect });
      },
      (error) => {
        console.log("Delete Failed");
        console.log("Incoming Data:");
        console.log(error);
        alert(error.message);
      }
    );
  } else {
    // Just show a message
    alert("You can't delete data when using the static JSON data.");
  }
}

export default dataDelete;
