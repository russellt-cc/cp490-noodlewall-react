//images
import fishing from "./images/fishing-crop.png"
import bowlingDream from "./images/bowling-crop-dream.png"
import cookingDream from "./images/cooking-crop-dream.png"

// The noodle data
// Replace with database
export const noodleData = [
  {
    "noodleID": 1,
    "noodleTitle": "Fishing with Friends",
    "userID": 1,
    "noodleStatus": "event",
    "noodleDescription": "Hey, I am Pam! I love fishing but none of my friends do! I have a boat, and all the gear you could possibly need. Fish is on the menu but if we get skunked, I have food available as well.",
    "noodleTags": ["fishing", "food", "hobby", "friends", "sports"],
    "noodleImage": fishing,
    "noodleLocation": "Sydney, Ontario",
    "noodleDate": "2021-04-01",
    "noodleTime": "8:30AM-5:00PM",
    "noodlePrice": "$17.00",
    "noodleMinTickets": 2,
    "noodleMaxTickets": 3,
    "noodleTicketsSold": 1,
  },
  {
    "noodleID": 2,
    "noodleTitle": "Thursday Bowling Nights",
    "userID": 2,
    "noodleStatus": "dream",
    "noodleDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum. Suspendisse pulvinar in ex a posuere.",
    "noodleTags": ["fishing", "food", "hobby", "friends", "sports"],
    "noodleImage": bowlingDream
  },
  {
    "noodleID": 3,
    "noodleTitle": "Cooking For Kids",
    "userID": 1,
    "noodleStatus": "dream",
    "noodleDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum. Suspendisse pulvinar in ex a posuere.",
    "noodleTags": ["fishing", "food", "hobby", "friends", "sports"],
    "noodleImage": cookingDream
  }
]

// User data
// Replace with database
export const userData = [
  {
    "userID": 1,
    "userName": "Pam's Fishing",
    "userFirstName": "Pam",
    "userLastName": "Poovey",
    "userRating": 4,
    "userBio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum.",
    "userImage": "pam"
  },
  {
    "userID": 2,
    "userName": "Krieger's Bowling Team",
    "userFirstName": "Krieger's",
    "userLastName": "Bowling Team",
    "userRating": 4,
    "userBio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum.",
    "userImage": "pam"
  }
]
