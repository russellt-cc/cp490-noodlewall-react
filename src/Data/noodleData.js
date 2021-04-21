//images
import fishing from "../Images/localData/fishing-crop.png";
import bowling from "../Images/localData/bowling-crop.png";
import cooking from "../Images/localData/cooking-crop.png";
import pewdiepie from "../Images/localData/pewdiepie.png";
import jamie_oliver from "../Images/localData/jamie-oliver.jpg";
import aimee_song from "../Images/localData/aimee-song.jpg";
import marques_brownlee from "../Images/localData/marques-brownlee.jpg";
import tfue from "../Images/localData/tfue.jpg";
//user images
import pam from "../Images/localData/user-pam.png";
import rogue from "../Images/localData/user-rogue.png";

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
    noodleCoverImage: fishing,
    noodleImages: [fishing],
    noodleImageText: ["Lorem ipsum."],
    noodleLocation: "Sydney, Ontario",
    noodleDate: "2021-05-15",
    noodleTime: "8:30AM-5:00PM",
    noodlePrice: "$17.00",
    noodleMinTickets: 5,
    noodleMaxTickets: 10,
    noodleTicketsSold: 0,
    noodleCutoff: "2021-04-30",
  },
  {
    noodleID: 2,
    noodleTitle: "Thursday Bowling Nights",
    userID: 2,
    noodleStatus: "dream",
    noodleDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum. Suspendisse pulvinar in ex a posuere.",
    noodleTags: ["bowling", "hobby", "sports"],
    noodleCoverImage: bowling,
  },
  {
    noodleID: 3,
    noodleTitle: "Cooking For Kids",
    userID: 1,
    noodleStatus: "dream",
    noodleDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sodales ex. Quisque vitae ultricies ipsum. Suspendisse pulvinar in ex a posuere.",
    noodleTags: ["cooking", "food", "hobby", "kids"],
    noodleCoverImage: cooking,
  },
  {
    noodleID: 4,
    noodleTitle: "PewDiePie Live Comedy",
    userID: 3,
    noodleStatus: "event",
    noodleDescription:
      "Felix Arvid Ulf Kjellberg, known online as PewDiePie, is a Swedish YouTuber and comedian, known primarily for his Let's Play videos and comedic formatted shows.",
    noodleTags: ["comedy", "youtube"],
    noodleCoverImage: pewdiepie,
    noodleLocation: "Sydney, Ontario",
    noodleDate: "2021-05-15",
    noodleTime: "8:30AM-5:00PM",
    noodlePrice: "$17.00",
    noodleMinTickets: 5,
    noodleMaxTickets: 10,
    noodleTicketsSold: 0,
    noodleCutoff: "2021-04-30",
  },
  {
    noodleID: 5,
    noodleTitle: "Jamie Oliver Cooks",
    userID: 3,
    noodleStatus: "event",
    noodleDescription:
      "Jamie Trevor Oliver MBE is a British chef and restaurateur. He is known for his approachable cuisine, which has led him to front numerous television shows and open many restaurants.",
    noodleTags: ["cooking", "food"],
    noodleCoverImage: jamie_oliver,
    noodleLocation: "Sydney, Ontario",
    noodleDate: "2021-05-15",
    noodleTime: "8:30AM-5:00PM",
    noodlePrice: "$17.00",
    noodleMinTickets: 5,
    noodleMaxTickets: 10,
    noodleTicketsSold: 0,
    noodleCutoff: "2021-04-30",
  },
  {
    noodleID: 6,
    noodleTitle: "Aimee Song Fashion Convention",
    userID: 3,
    noodleStatus: "event",
    noodleDescription:
      "Aimee Song is an American fashion blogger and fashion designer. She has over 2 million page views per month on her blog called Song of Style and five million Instagram followers. She started blogging in 2008 while studying Interior Architecture in San Francisco.",
    noodleTags: ["fashion", "instagram"],
    noodleCoverImage: aimee_song,
    noodleLocation: "Sydney, Ontario",
    noodleDate: "2021-05-15",
    noodleTime: "8:30AM-5:00PM",
    noodlePrice: "$17.00",
    noodleMinTickets: 5,
    noodleMaxTickets: 10,
    noodleTicketsSold: 0,
    noodleCutoff: "2021-04-30",
  },
  {
    noodleID: 7,
    noodleTitle: "Marques Brownlee Tech Convention",
    userID: 3,
    noodleStatus: "event",
    noodleDescription:
      "Marques Keith Brownlee, also known professionally as MKBHD, is an American YouTuber and professional ultimate frisbee player, best known for his technology-focused videos as well as his podcast, Waveform: The MKBHD Podcast. The name of his YouTube channel is a concatenation of MKB and HD.",
    noodleTags: ["tech", "youtube"],
    noodleCoverImage: marques_brownlee,
    noodleLocation: "Sydney, Ontario",
    noodleDate: "2021-05-15",
    noodleTime: "8:30AM-5:00PM",
    noodlePrice: "$17.00",
    noodleMinTickets: 5000,
    noodleMaxTickets: 10000,
    noodleTicketsSold: 2500,
    noodleCutoff: "2021-04-30",
  },
  {
    noodleID: 8,
    noodleTitle: "Tfue Fortnite Tournament",
    userID: 3,
    noodleStatus: "event",
    noodleDescription:
      "Turner Tenney, better known by his online alias Tfue, is an American streamer and esports player, best known for playing Fortnite.",
    noodleTags: ["gaming", "esports", "fortnite", "twitch"],
    noodleCoverImage: tfue,
    noodleLocation: "Sydney, Ontario",
    noodleDate: "2021-05-15",
    noodleTime: "8:30AM-5:00PM",
    noodlePrice: "$17.00",
    noodleMinTickets: 5,
    noodleMaxTickets: 10,
    noodleTicketsSold: 0,
    noodleCutoff: "2021-04-30",
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
  {
    userID: 3,
    userName: "Rogue Rocket",
    userFirstName: "Philip",
    userLastName: "DeFranco",
    userRating: 5,
    userBio:
      "Production Company founded by online entrepreneur Philip DeFranco in 2017 that is working to create an independent news network. Welcome to your new go-to place for all of the news, information, entertainment, and pop culture you need in your life! When in doubt... GO ROGUE.",
    userBioLong:
      "Production Company founded by online entrepreneur Philip DeFranco in 2017 that is working to create an independent news network. Welcome to your new go-to place for all of the news, information, entertainment, and pop culture you need in your life! When in doubt... GO ROGUE. Our mission is to start a conversation about this crazy world we live in, in the most inviting way possible. We aim to bring various, vibrant voices, and stories to the forefront as we strive to contribute to the new-age way in which we as a society consume news and spread information.",
    userImage: rogue,
  },
];
