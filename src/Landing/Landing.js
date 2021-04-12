import intro_video from '../videos/NoodleWall.mp4'
import intro_poster from '../images/noodlewall-video-poster-384p.png'
import facebook_logo from '../images/Facebook-share-50p.png'
import linkedin_logo from '../images/linkedin-share-50p.png'
import pinterest_logo from '../images/Pinterest-share-50p.png'
import reddit_logo from '../images/reddit-share-50p.png'
import './css/Landing.css'
import React from 'react'
import { Link } from 'react-router-dom'

class Landing extends React.Component {
  render() {
    // Return the landing page
    return (
      <main>
        {/* intro section is the top of the page with the intro text and video */}
        <section id="intro">
          {/* left div has the text and browse button */}
          <div id="intro_left" className="intro_column">
            <h1>Take a <span className="dreams_color_text">dream</span> and <span className="events_color_text">make it happen!</span></h1>
            <p>Have a dream worth sharing? Make it reality with <span className="dreams_color_text">Noodlewall</span>.</p>
            <p><span className="events_color_text">You're an influencer</span>, a person who makes events happen. <span className="dreams_color_text">Make your life easier</span> and <span className="events_color_text">risk free!</span></p>
            <Link to="/browse">Browse</Link>
          </div>
          {/* right div has the video */}
          <div id="intro_right" className="intro_column">
            <video controls name="media" poster={intro_poster} width="384px">
              <source src={intro_video} type="video/mp4" />
            </video>
            <div>
              <p>Create revenue, No overhead.</p>
              <p><span className="events_color_text">Risk Free!</span></p>
            </div>
            <div id="intro_share">
              <h4>Share</h4>
              <ul id="share_buttons">
                <li className="share_button">
                  <a href="/#"><img alt="Facebook" src={facebook_logo} /></a>
                </li>
                <li className="share_button">
                  <a href="/#"><img alt="LinkedIn" src={linkedin_logo} /></a>
                </li>
                <li className="share_button">
                  <a href="/#"><img alt="Pinterest" src={pinterest_logo} /></a>
                </li>
                <li className="share_button">
                  <a href="/#"><img alt="Reddit" src={reddit_logo} /></a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default Landing
