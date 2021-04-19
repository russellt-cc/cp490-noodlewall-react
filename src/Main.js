import React from "react";

// React Router
import { Switch, Route } from "react-router-dom";

// Noodlewall pages as React components
import Landing from "./Landing/Landing";
// User Story 1: Login
import LoginUser from "./User/LoginUser";
// User Story 2: Register and Edit Own Profile
import RegisterOrEditUser from "./User/RegisterOrEditUser";
// User Stories 3 and 9: Browse Events and Dreams
import BrowseNoodles from "./Browse/BrowseNoodles";
// User Stories 4 and 8: View Event or Dream Details
import NoodleDetails from "./Details/NoodleDetails";
// User Story 5: Buy Ticket
// buy goes here
// User Stories 6, 7, 10, and 13: Create Event, Create Dream, Edit Event, Edit Dream
import CreateOrEditNoodle from "./Create/CreateOrEditNoodle";
// User Stories 11 and 12: View Other Profile, View Own Profile
import UserProfile from "./User/UserProfile";

// The main section of the app
class Main extends React.Component {
  render() {
    const { error, noodlesAreCooked, noodlersAreLoaded } = this.props;
    // Check for error
    if (error) {
      // Show error message
      return (
        <main>
          <p>Error: {error.message} noodles</p>
        </main>
      );
    } else if (!noodlesAreCooked) {
      // Show loading message
      return (
        <main>
          <p>Cooking Noodles...</p>
        </main>
      );
    } else if (!noodlersAreLoaded) {
      // Show loading message
      return (
        <main>
          <div>
            <p>Cooking Noodles...</p>
            <p>Searching for Noodlers...</p>
          </div>
        </main>
      );
    } else {
      const {
        userData,
        currentUserID,
        noodleData,
        onCreate,
        onUpdate,
        onDelete,
        onLogin,
      } = this.props;
      // Switch the main component based on the url
      return (
        <Switch>
          {/* ------------------------------------------------------------ */}
          {/* Registration or Edit User Module */}
          <Route
            path="/register"
            render={(props) => (
              <RegisterOrEditUser
                {...props}
                currentUserID={undefined}
                onCreate={onCreate}
              />
            )}
          />
          <Route
            path="/user/edit"
            render={(props) => (
              <RegisterOrEditUser
                {...props}
                userData={userData}
                currentUserID={currentUserID}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            )}
          />
          {/* ------------------------------------------------------------ */}
          {/* Login User Module */}
          <Route
            path="/login"
            render={(props) => (
              <LoginUser {...props} userData={userData} onLogin={onLogin} />
            )}
          />
          {/* ------------------------------------------------------------ */}
          {/* Create or Edit Noodle Module */}
          <Route
            path="/details/:id/edit"
            render={(props) => (
              <CreateOrEditNoodle
                {...props}
                userData={userData}
                currentUserID={currentUserID}
                onUpdate={onUpdate}
                noodleData={noodleData}
              />
            )}
          />
          <Route
            path="/create/:type"
            render={(props) => (
              <CreateOrEditNoodle
                {...props}
                userData={userData}
                currentUserID={currentUserID}
                onCreate={onCreate}
              />
            )}
          />
          <Route
            path="/create"
            render={(props) => (
              <CreateOrEditNoodle
                {...props}
                userData={userData}
                currentUserID={currentUserID}
                onCreate={onCreate}
              />
            )}
          />
          {/* ------------------------------------------------------------ */}
          {/* User Profile Module */}
          <Route
            path="/user/:id/:action"
            render={(props) => (
              <UserProfile
                {...props}
                noodleData={noodleData}
                userData={userData}
                currentUserID={currentUserID}
              />
            )}
          />
          <Route
            path="/user/:id"
            render={(props) => (
              <UserProfile
                {...props}
                noodleData={noodleData}
                userData={userData}
                currentUserID={currentUserID}
              />
            )}
          />
          <Route
            path="/user"
            render={(props) => (
              <UserProfile
                {...props}
                noodleData={noodleData}
                userData={userData}
                currentUserID={currentUserID}
              />
            )}
          />
          {/* ------------------------------------------------------------ */}
          {/* Noodle Details Module */}
          <Route
            path="/details/:filterType/:id"
            render={(props) => (
              <NoodleDetails
                {...props}
                noodleData={noodleData}
                userData={userData}
                currentUserID={currentUserID}
                onDelete={onDelete}
              />
            )}
          />
          <Route
            path="/details/:id"
            render={(props) => (
              <NoodleDetails
                {...props}
                noodleData={noodleData}
                userData={userData}
                currentUserID={currentUserID}
                onDelete={onDelete}
              />
            )}
          />
          {/* ------------------------------------------------------------ */}
          {/* Browse Noodles Module */}
          <Route
            path="/browse/:type/:tag"
            render={(props) => (
              <BrowseNoodles
                {...props}
                noodleData={noodleData}
                userData={userData}
              />
            )}
          />
          <Route
            path="/browse/:type"
            render={(props) => (
              <BrowseNoodles
                {...props}
                noodleData={noodleData}
                userData={userData}
              />
            )}
          />
          <Route
            path="/browse"
            render={(props) => (
              <BrowseNoodles
                {...props}
                noodleData={noodleData}
                userData={userData}
              />
            )}
          />
          {/* ------------------------------------------------------------ */}
          {/* Landing Module */}
          <Route path="/">
            <Landing />
          </Route>
          {/* ------------------------------------------------------------ */}
        </Switch>
      );
    }
  }
}

export default Main;
