// Get local JSON file
import { noodleData, userData } from "./noodleData";

// Function to handle reading data from API or local JSON
function dataRead(apiConfig, returnState) {
  const { useAPI, apiURL, apiRead } = apiConfig;
  // Check whether we are using the API for data
  if (useAPI) {
    // AJAX request to PHP server
    // Get noodles
    let apiPath = "event/";
    fetch(apiURL + apiPath + apiRead)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Read Noodles Succeeded");
          console.log("Incoming data:");
          console.log(result);
          returnState({
            noodlesAreCooked: true,
            noodleData: result.records,
          });
        },
        (error) => {
          console.log("Read Noodles Failed");
          console.log("Incoming data:");
          console.log(error);
          returnState({
            noodlesAreCooked: true,
            error,
          });
        }
      );
    // Get users
    apiPath = "user/";
    fetch(apiURL + apiPath + apiRead)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Read Users Succeeded");
          console.log("Incoming data:");
          console.log(result);
          returnState({
            noodlersAreLoaded: true,
            userData: result.records,
          });
        },
        (error) => {
          console.log("Read Users Failed");
          console.log("Incoming data:");
          console.log(error);
          returnState({
            noodlersAreLoaded: true,
            error,
          });
        }
      );
  } else {
    // Get the JSON data and put in state
    returnState({
      noodleData: noodleData,
      userData: userData,
      noodlesAreCooked: true,
      noodlersAreLoaded: true,
    });
  }
}

export default dataRead;
