function apiConfig() {
  return {
    useAPI: true,
    apiURL: "http://gatkinson.site/noodlewall/",
    apiCreate: "create.php",
    apiRead: "read.php",
    apiUpdate: "update.php",
    apiDelete: "delete.php",
    apiNoodlePath: "event/",
    apiUserPath: "user/",
    apiNoodleUploadImage: "uploadEventImage.php",
    apiNoodleDeleteImage: "deleteEventImage.php",
  };
}

export default apiConfig;
