import apiConfig from "./apiConfig";

// Function to handle creating data using API
// Return response as a promise
function dataCreate(type, data, returnState, refresh, login) {
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
        // alert("Error: Unknown Type");
        return Promise.reject({ message: "Unknown Type!" });
    }
    // AJAX request to PHP server
    const { apiURL, apiCreate } = apiConfig();
    return fetch(apiURL + apiPath + apiCreate, {
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
          let redirectPath;
          switch (type) {
            case "dream":
            case "event":
              // Redirect to noodle page
              redirectPath = "/details/" + result.noodleID;
              break;
            case "user":
              // Login to new account
              login(result.userID);
              // Redirect to user page
              redirectPath = "/user/" + result.userID;
              break;
            default:
              redirectPath = "/";
              break;
          }
          returnState({ redirectPath });
          return result;
        },
        (error) => {
          // console.log("Create Failed");
          // console.log("Outgoing data:");
          // console.log(data);
          // console.log("Incoming data:");
          // console.log(error);
          // alert(
          //   "Failed to create " +
          //     type +
          //     "! Response from server: " +
          //     error.message +
          //     "."
          // );
          return error;
        }
      );
  } else {
    // Just show a message
    // alert("You can't create data when using the static JSON data.");
    return Promise.reject({ message: "Can't create when not using API!" });
  }
}

export default dataCreate;
