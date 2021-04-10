import './css/Landing.css';
import React from 'react';

class Landing extends React.Component {
  render() {
    return (
      <main>
        {/* intro section is the top of the page with the intro text and video */}
        <section id="intro">
          {/* left div has the text and browse button */}
          <div id="intro_left">
            <h1>Take a <span class="dreams_color_text">dream</span> and <span class="events_color_text">make it happen!</span></h1>
            <p>Have a dream worth sharing? Make it reality with <span class="dreams_color_text">Noodlewall</span>.</p>
            <p><span class="events_color_text">You're an influencer</span>, a person who makes events happen. <span class="dreams_color_text">Make your life easier</span> and <span class="events_color_text">risk free!</span></p>
                    <a href="browse.html">Browse</a>
          </div>
          {/* right div has the video */}
          <div id="intro_right">
            <video controls name="media" poster="images/noodlewall-video-poster-384p.png" width="384px">
              <source src="videos/NoodleWall.mp4" type="video/mp4"/>
            </video>
            <div>
              <p>Create revenue, No overhead.</p>
              <p><span class="events_color_text">Risk Free!</span></p>
            </div>
            <div id="intro_share">
              <h4>Share</h4>
              <ul id="share_buttons">
                <li class="share_button">
                  <a href="#"><img alt="Facebook" src="images/Facebook-share-50p.png"/></a>
                </li>
                <li class="share_button">
                  <a href="#"><img alt="LinkedIn" src="images/linkedin-share-50p.png"/></a>
                </li>
                <li class="share_button">
                  <a href="#"><img alt="Pinterest" src="images/pinterest-share-50p.png"/></a>
                </li>
                <li class="share_button">
                  <a href="#"><img alt="Reddit" src="images/reddit-share-50p.png"/></a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Landing;
