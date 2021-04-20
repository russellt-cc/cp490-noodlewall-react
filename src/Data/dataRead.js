import apiConfig from "./apiConfig";

// Get local JSON file
import { noodleData, userData } from "./noodleData";

// Function to handle reading data from API or local JSON
// Return response as a promise
function dataRead(type) {
  const { useAPI, apiURL, apiRead } = apiConfig();
  switch (type) {
    case "noodles":
      // Check whether we are using the API for data
      if (useAPI) {
        // AJAX request to PHP server
        // Get noodles
        const apiPath = "event/";
        return fetch(apiURL + apiPath + apiRead)
          .then((res) => res.json())
          .then(
            (result) => {
              // console.log(result);
              return result;
            },
            (error) => {
              // console.log(error);
              return error;
            }
          );
      } else {
        // Get the JSON data and put in state
        return Promise.resolve({
          message: "Noodles loaded from local JSON.",
          records: noodleData,
        });
      }
    case "users":
      // Check whether we are using the API for data
      if (useAPI) {
        // AJAX request to PHP server
        // Get users
        const apiPath = "user/";
        return fetch(apiURL + apiPath + apiRead)
          .then((res) => res.json())
          .then(
            (result) => {
              // console.log(result);
              return result;
            },
            (error) => {
              // console.log(error);
              return error;
            }
          );
      } else {
        // Get the JSON data and put in state
        return Promise.resolve({
          message: "Users loaded from local JSON.",
          records: userData,
        });
      }
    default:
      return Promise.reject({ message: "Unknown Type!" });
  }
}

export default dataRead;
