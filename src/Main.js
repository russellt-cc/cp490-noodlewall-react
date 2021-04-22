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
    const { currentUser, onCreate, onUpdate, onDelete, onLogin } = this.props;
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
              currentUser={currentUser}
              onCreate={onCreate}
            />
          )}
        />
        <Route
          path="/user/edit"
          render={(props) => (
            <RegisterOrEditUser
              {...props}
              currentUser={currentUser}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          )}
        />
        {/* ------------------------------------------------------------ */}
        {/* Login User Module */}
        <Route
          path="/login/:redirect/:id"
          render={(props) => <LoginUser {...props} onLogin={onLogin} />}
        />
        <Route
          path="/login/:redirect"
          render={(props) => <LoginUser {...props} onLogin={onLogin} />}
        />
        <Route
          path="/login"
          render={(props) => <LoginUser {...props} onLogin={onLogin} />}
        />
        {/* ------------------------------------------------------------ */}
        {/* Create or Edit Noodle Module */}
        <Route
          path="/details/:id/edit"
          render={(props) => (
            <CreateOrEditNoodle
              {...props}
              currentUser={currentUser}
              onUpdate={onUpdate}
            />
          )}
        />
        <Route
          path="/create/:type"
          render={(props) => (
            <CreateOrEditNoodle
              {...props}
              currentUser={currentUser}
              onCreate={onCreate}
            />
          )}
        />
        <Route
          path="/create"
          render={(props) => (
            <CreateOrEditNoodle
              {...props}
              currentUser={currentUser}
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
              currentUser={currentUser}
              onLogout={this.props.onLogout}
            />
          )}
        />
        <Route
          path="/user/:id"
          render={(props) => (
            <UserProfile
              {...props}
              currentUser={currentUser}
              onLogout={this.props.onLogout}
            />
          )}
        />
        <Route
          path="/user"
          render={(props) => (
            <UserProfile
              {...props}
              currentUser={currentUser}
              onLogout={this.props.onLogout}
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
              currentUser={currentUser}
              onDelete={onDelete}
            />
          )}
        />
        <Route
          path="/details/:id"
          render={(props) => (
            <NoodleDetails
              {...props}
              currentUser={currentUser}
              onDelete={onDelete}
            />
          )}
        />
        {/* ------------------------------------------------------------ */}
        {/* Browse Noodles Module */}
        <Route
          path="/browse/:type/:tag"
          render={(props) => <BrowseNoodles {...props} />}
        />
        <Route
          path="/browse/:type"
          render={(props) => <BrowseNoodles {...props} />}
        />
        <Route
          path="/browse"
          render={(props) => <BrowseNoodles {...props} />}
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

export default Main;
