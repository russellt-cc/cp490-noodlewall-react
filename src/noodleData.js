//images
import fishing from "./images/fishing-crop.png";
import bowling from "./images/bowling-crop.png";
import cooking from "./images/cooking-crop.png";
//user images
import pam from "./images/user-pam.png";

// The noodle data
// Replace with database
export const noodleData = [
  {
    noodleID: 1,
    noodleTitle: "Fishing with Friends",
    userID: 1,
    noodleStatus: "event",
    noodleDescription:
      "Hey, I am Pam! I love fishing but none of my friends do! I have a boat, and all the gear you could possibly need. Fish is on the menu but if we get skunked, I have food available as well.",
    noodleTags: ["fishing", "food", "hobby", "friends", "sports"],
    noodleImage: fishing,
    noodleLocation: "Sydney, Ontario",
    noodleDate: "2021-04-01",
    noodleTime: "8:30AM-5:00PM",
    noodlePrice: "$17.00",
    noodleMinTickets: 2,
    noodleMaxTickets: 3,
    noodleTicketsSold: 1,
  },
  {
    noodleID: 2,
    noodleTitle: "Thursday Bowling Nights",
    userID: 2,
    noodleStatus: "dream",
    noodleDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum. Suspendisse pulvinar in ex a posuere.",
    noodleTags: ["bowling", "hobby", "sports"],
    noodleImage: bowling,
  },
  {
    noodleID: 3,
    noodleTitle: "Cooking For Kids",
    userID: 1,
    noodleStatus: "dream",
    noodleDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum. Suspendisse pulvinar in ex a posuere.",
    noodleTags: ["cooking", "food", "hobby", "kids"],
    noodleImage: cooking,
  },
];

// User data
// Replace with database
export const userData = [
  {
    userID: 1,
    userName: "Pam's Fishing",
    userFirstName: "Pam",
    userLastName: "Poovey",
    userRating: 4,
    userBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum.",
    userBioLong:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum. Suspendisse pulvinar in ex a posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras varius arcu tellus, et eleifend turpis porta id. Aliquam commodo leo leo, eget rhoncus enim dictum nec. Morbi porta elementum ex sollicitudin porttitor.",
    userImage: pam,
  },
  {
    userID: 2,
    userName: "Krieger's Bowling Team",
    userFirstName: "Krieger's",
    userLastName: "Bowling Team",
    userRating: 3,
    userBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum.",
    userBioLong:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum. Suspendisse pulvinar in ex a posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras varius arcu tellus, et eleifend turpis porta id. Aliquam commodo leo leo, eget rhoncus enim dictum nec. Morbi porta elementum ex sollicitudin porttitor.",
    userImage: bowling,
  },
];
