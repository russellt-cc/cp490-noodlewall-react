// React
import React from "react";

// Noodlewall Components
import NoodleOverlay from "../../Common/NoodleOverlay";
import DetailsProgress from "./DetailsProgress";

// Luxon
// https://moment.github.io/luxon/
// https://www.npmjs.com/package/luxon
import { DateTime, Interval } from "luxon";

// React Image Gallery
// https://www.npmjs.com/package/react-image-gallery
// https://www.linxtion.com/demo/react-image-gallery/
import ImageGallery from "react-image-gallery";

// The left column of the details intro
class DetailsIntroLeft extends React.Component {
  // Method to determine the days left
  getDaysLeft = () => {
    const {
      noodleStatus,
      noodleTicketsSold,
      noodleMinTickets,
      noodleCutoff,
      noodleDate,
    } = this.props.thisNoodle;
    let wholeDaysLeft = 0;
    if (
      noodleStatus === "event" &&
      parseInt(noodleTicketsSold) < parseInt(noodleMinTickets)
    ) {
      // Determine the days left to make it happen
      const now = DateTime.now();
      const cutoff = DateTime.fromFormat(noodleCutoff, "yyyy-MM-dd");
      const interval = Interval.fromDateTimes(now, cutoff);
      const daysLeft = interval.length("days");
      wholeDaysLeft = parseInt(daysLeft);
    } else if (noodleStatus === "event") {
      // Determine the days left until the event
      const now = DateTime.now();
      const event = DateTime.fromFormat(noodleDate, "yyyy-MM-dd");
      const interval = Interval.fromDateTimes(now, event);
      const daysLeft = interval.length("days");
      wholeDaysLeft = parseInt(daysLeft);
    }
    return wholeDaysLeft;
  };
  // Render method
  render() {
    // Get data from props
    const { element_classes, status_classes } = this.props;
    // Determine the days left
    const wholeDaysLeft = this.getDaysLeft();
    // Destructure the props to get our data
    const {
      noodleTitle,
      noodleTicketsSold,
      noodleMinTickets,
      noodleCoverImage,
      noodleStatus,
      noodleImages,
    } = this.props.thisNoodle;

    // Images for image gallery
    const getImages = () => {
      const images = noodleImages.map((image, index) => {
        return { original: decodeURIComponent(image) };
      });
      return images;
    };

    return (
      <div id="details_intro_left" className="details_column left">
        <h1>{noodleTitle}</h1>
        <p
          className={
            wholeDaysLeft > 0 ? element_classes.noodleDaysLeft : "hidden"
          }
        >
          {parseInt(noodleTicketsSold) < parseInt(noodleMinTickets)
            ? "Days Left to Make it Happen"
            : "Days Left Until The Event"}
          :{" "}
          <span
            className={
              parseInt(noodleTicketsSold) < parseInt(noodleMinTickets)
                ? "dreams_color_text"
                : "events_color_text"
            }
          >
            <strong>{wholeDaysLeft}</strong>
          </span>
        </p>
        {/* {noodleCoverImage ? (
          <div id="details_image_container">
            <img src={decodeURIComponent(noodleCoverImage)} alt="Noodle"></img>
            {NoodleOverlay(noodleStatus)}
          </div>
        ) : (
          <></>
        )} */}
        <div id="details_image_container">
          <ImageGallery
            items={getImages()}
            showThumbnails={false}
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={noodleImages[1] ? true : false}
            showNav={noodleImages[1] ? true : false}
            onErrorImageURL={
              "http://gatkinson.site/noodlewall/images/site/noodlewall-video-poster-384p.png"
            }
            startIndex={noodleImages.indexOf(noodleCoverImage)}
            autoPlay={false}
            lazyLoad={true}
          />
          {NoodleOverlay(noodleStatus)}
        </div>
        <DetailsProgress
          thisNoodle={this.props.thisNoodle}
          status_classes={status_classes}
        />
      </div>
    );
  }
}

export default DetailsIntroLeft;
