// Function to handle creating data using API
function dataCreate(type, data, apiConfig, returnState, refresh, login) {
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
    const { apiURL, apiCreate } = apiConfig;
    fetch(apiURL + apiPath + apiCreate, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log("Create Succeeded");
          // console.log("Outgoing data:");
          // console.log(data);
          // console.log("Incoming data:");
          // console.log(result);
          // Reload data
          refresh();
          // Handle redirect
          let redirect;
          switch (type) {
            case "dream":
            case "event":
              // Redirect to noodle page
              redirect = "/details/" + result.noodleID;
              break;
            case "user":
              // Login to new account
              login(result.userID);
              // Redirect to user page
              redirect = "/user/" + result.userID;
              break;
            default:
              redirect = "/";
              break;
          }
          returnState({ redirect });
        },
        (error) => {
          // console.log("Create Failed");
          // console.log("Outgoing data:");
          // console.log(data);
          // console.log("Incoming data:");
          // console.log(error);
          alert(
            "Failed to create " +
              type +
              "! Response from server: " +
              error.message +
              "."
          );
        }
      );
  } else {
    // Just show a message
    alert("You can't create data when using the static JSON data.");
  }
}

export default dataCreate;
