# Noodlewall Web App React Prototype

### Dependencies

##### Noodlewall React Prototype is developed with the React javascript library. In order to get the prototype webapp running, you'll need to have node.js and react js installed on your machine.

### Authors

- Noodlewall React Prototype - Russell Tennant (https://github.com/russellt-cc)
- README - Griffin Atkinson (https://github.com/griffthegrouch)

## Intro

- This frontend web app was developed by Russell Tennant, April 2021, in order to prototype the Noodlewall project, as part of a coop placement at FRMH at Confederation College.
- This web app can be used locally, or deployed to a remote server. The details for deploying locally are covered in this document.
- Currently there is an existing remote API that this web app utilizes, although it is personally hosted and will likely be unavailable shortly after the coop placement ends. The details for exclusively using local data are included in this document.

# Description

> This web app's functionality is to prototype the visual layout and main functions of the Noodlewall project, this includes: a landing page with an intuitive introduction to the project, a simple yet powerful navigation bar, a browsing events+dreams page where all events are displayed, Login+Logout+Register+Edit user account functionality, individual event page display, individual user profile page display, and ability to create and edit events, and the overall look and feel of the project as defined thus far.

## Key Features

- Browsing:
  Browse all events, dreams, or both, and view individual event’s pages, and organizer’s pages too.
- User Accounts:
  Login, logout, create, and edit user accounts, and manage their profile information and associated events.
- Events/Dreams:
  Create and manage events and dreams by going through a form and providing as many or few details as desired, by default events are considered dreams, if full details are provided, the dream can become an event.

# Getting Started

### Installation

##### 1 install repo

###### download code from github

##### 2 move video to videos folder

###### download NoodleWall.mp4 and navigate to Cp490-noodlewall-react/src/videos/videos.txt and replace it with NoodleWall.mp4

##### 3 npm init

###### assuming you have node.js and react installed on your machine, opend command prompt and navigate to the repository root folder and run "npm init"

##### 4 npm install react-scripts

###### run "npm install react-scripts" in the command prompt

##### 5 modify CP490-NOODLEWALL-REACT/package.json

###### assuming the initialization process was performed regularly and successfully, the homepage is automatically set to the wrong directory, open up Cp490-noodlewall-react/Package.json

> change ->
> "homepage": "https://github.com/russellt-cc/cp490-noodlewall-react#readme"
> to ->
> "homepage": "/"

# File Structure

    Cp490-noodlewall-react/
        /node_modules
    	/public
    	/.gitignore
    	/Package.json
    	/Package-lock.json
    	/README.md
        /src/       -contains all react javascript files and css styling files for react components
            /bak/        - contains unused react js files
            /Browse/     - contains react js files and css files for event browsing page
            /Common/     - contains react js files and css files for components used in most pages
            /Create/     - contains react js files and css files for event creation
            /Data/       - contains react js files used for pushing and pulling data from the API
            /Details/    - contains react js files and css files for viewing event details page
            /Images/     - contains subfolder socialMedia/ and holds all image resources
            /Landing/    - contains react js files and css files for landing page
            /User/       - contains react js files and css files for user login/register/edit and profile viewing page
            /videos/     - holds the intro video displayed on the landing page
                /videos.txt  **replace this file with NoodleWall.mp4**
            /App.css     - styling for App.js
            /App.js      - the root react component that contains all pages and holds states
            /index.css   - styling for index.js
            /index.js    - the initial page that is opened by the react server and opens the root component App.js
            /Main.js     - the handler react component that directly holds pages

# React Structure -- how the react components are layed out, and roughly what each one accomplishes

    <Index>	    The initial component that renders the App component into the root of the HTML document.
         <App>	    The main App component that contains the Noodlewall application.
            <Router>	    The BrowserRouter from React Router that allows for us to
                            build a multi page application using React.
                <Navbar/>	    The navigation bar that is shown at the top of every page.
                <Main>	        The component that is rendered as the main element of the page.
                    <Switch>	    The React Router component that switches the page based on URL.
                        <Landing>	                The landing page as a React component.
                        <BrowseNoodles>	            The page for browsing events and dream events.
                        <NoodleDetails>	            The page that shows details for a specific event or dream event.
                        <CreateOrEditNoodle>	    The page that allows for creation of an event or dream event.
                                                    This component is also used to edit an existing event
                                                    or dream event.
                        <UserProfile>	            The page that shows the details for a specific user as well
                                                    as the events and dream events that they have created.
                        <LoginUser>	                This page is a placeholder for a login screen and
                                                    allows us to sign in as any user.
                        <RegisterOrEditUser>	    This page allows the creation of a new user account.
                                                    This component is also used when editing an existing user.
                    </Switch>
                </Main>
                <Footer/>       The footer that is shown at the bottom of every page.
            <Router>
        </App>
    </Index>

# Common Components

    <NoodleList/>       Displays a list of events and dream events based on given data.
                        Uses the NoodleCard component to show each entry.
    <NoodleCard/>       Displays a preview of an event or dream event based on given data.
                        Meant to be displayed in a NoodleList component.
    <NoodleOverlay/>    Displays an image to be overlayed on an image depending on the event status.
                        Currently used to denote a dream event from a standard event.
    <NoodlerSummary/>   Displays the name and rating of a host on a NoodleCard.
    <UserRating/>       Shows stars to display a user's rating.

# Functions Overview

Browse All
-Hover mouse pointer over the "Browse" button in the upper right corner of the browser window.
-Click on "Browse All".
-The Browse component will load. You can click on a card to view the details for a specific event or dream event, or click on a user to view their profile and created events and dream events.

Browse Events
-Hover mouse pointer over the "Browse" button in the upper right corner of the browser window.
-Click on "Browse Events".
-The Browse component will load. Only events with a status of "event" will be displayed.

Browse Dream Events
-Hover mouse pointer over the "Browse" button in the upper right corner of the browser window.
-Click on "Browse Dreams".
-The Browse component will load. Only events with a status of "dream" will be displayed.

Search for an Event or Dream Event
-Click on the search box at the top of the browser window.
-Enter a search query into the search box.
-Press enter to submit your query.
-Events and dream events that contain the given text will be displayed in the browse page.

User Registration
-Hover mouse pointer over the user icon in the upper right corner of the browser window.
-Click on "Register For Noodlewall"
-Enter the information for the new user account. A user image can be uploaded here or linked to an existing URL. A random image can be used by clicking on one of the random image buttons.
-The required fields are user name, first name, and last name.
-Scroll down to the bottom of the page and click Submit Registration when ready to submit.

Log Out
-Hover mouse pointer over the user icon in the upper right corner of the browser window.
-Click on "Sign Out" to log out of the account.

Log In
-Hover mouse pointer over the user icon in the upper right corner of the browser window.
-Click on "Login To Noodlewall".
-Click on any user account to log in as that user.

Edit User
-Sign in as a user by following the Login instructions above.
-Hover mouse pointer over the user icon in the upper right corner of the browser window.
-Click on the image for the current user to go to the profile page.
-Click on "Edit Profile".
-Make any desired changes to the user information.
-When complete, scroll to the bottom of the page and click on "Submit Changes."

Create Dream Event
-Sign in as a user by following the Login instructions above.
-Hover mouse pointer over the "Create" button in the upper right corner of the browser window.
-Click on "Create Dream".
-The Create component will load. If you don't have a user summary and bio created, you must follow the steps to edit your profile and then return here.
-You must fill in the Basic Info section.
-Once completed, click on "Save as Dream" at the bottom of the browser window to save as a dream. If you want to create an event, click on "Show All" and then fill in all the sections. After clicking "Show All" you can still save as a dream if desired.

Create Event
-Sign in as a user by following the Login instructions above.
-Hover mouse pointer over the "Create" button in the upper right corner of the browser window.
-Click on "Create Event".
-The Create component will load. You can click on the numbers in the navigation bar to jump to different sections.
-Once a section is filled in, the number in the navigation bar will light up.
-To add images, go to the Upload Images section. Clicking on "Add Image" will add a new image that is randomized by default. You can change it to a specific URL or upload an image. You can add as many images as you like.
-Once all information has been entered, click on the "Make it Happen" button on the bottom of the browser window. You can also choose to "Save as Dream" if you change your mind.

Edit Event or Dream Event
-Sign in as a user by following the Login instructions above.
-Hover mouse pointer over the user icon in the upper right corner of the browser window.
-Click on the image for the current user to go to the profile page.
-Scroll down to "Events by" or "Dreams by" sections to see the events and dream events created by the current user.
-Click on the image for an event to view the details page.
-On the right side, click on "Edit" button.
-The creation form will load to edit the event.
-If editing a dream event, you will need to click on "Show All" to see all of the sections.
-Make any changes and then click on "Save as Dream" to save as a dream event or "Make it Happen" to save as an event.

Delete Event or Dream Event
-Sign in as a user by following the Login instructions above.
-Hover mouse pointer over the user icon in the upper right corner of the browser window.
-Click on the image for the current user to go to the profile page.
-Scroll down to "Events by" or "Dreams by" sections to see the events and dream events created by the current user.
-Click on the image for an event to view the details page.
-On the right side, click on "Delete Button".
-Confirm the deletion to proceed.

# Pages Overview

- Landing (home) Page
  - displays:
    - Noodlewall landing page write-up
    - introductory noodlewall video
  - links:
    - browsing page (browse button)
- Browse Events/Dreams Page

  - displays:
    - card display of every dream and event
  - links:
    - dream and event cards contain links to the event's page
    - dream and event cards contain links to the event's organizer's profile page

- View Event/Dream Page

  - displays:
    - all event details: event name, images, location, date+time, ticket price, tickets sold, min+max tickets sold, event tags, event status, and description
    - organizer's name, short bio, and profile picture
  - links:
    - pruchase ticket (buy ticket button)
    - organizer profile page (contact button)
    - follow organizer (follow button)

- View User Profile Page

  - displays:
    - User's profile picture, full name, and rating
    - user's full bio
    - user's events and dreams in card display
  - links:
    - dream and event cards contain links to the event's page
    - follow organizer (follow button)
    - edit profile (if viewing user's logged in account's profile) (edit profile button)

- Nav Bar (available on every page)
  - displays:
    - Noodlewall Logo
    - sleek search, browse, create, and user profile icon dropdowns
    - tickets (if logged in) (user profile icon dropdown)
    - following (if logged in) (user profile icon dropdown)
  - links:
    - landing page (Noodlewall logo)
    - browse page (search bar, browse dropdown buttons)
    - create event/dream form (create dropdown)
    - user account login, logout, and register (user profile icon dropdown)

# Known Issues

    Issue #1 -> running npm start opens the app up to a blank screen
        the displayed address is -> http://localhost:3000/russellt-cc/cp490-noodlewall-reac
    Cause -> the homepage is not set to the project's root directory
    Fix -> see/redo Getting Started step 5

# Dillinger

## _The Last Markdown Editor, Ever_

[![Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,
AngularJS-powered HTML5 Markdown editor.

- Type some Markdown on the left
- See HTML in the right
- ✨Magic ✨

## Features

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.NOTES

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
