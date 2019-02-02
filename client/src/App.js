import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import AddEducation from "./components/add-credentials/AddEducation";
import AddExperience from "./components/add-credentials/AddExperience";
import Profiles from "./components/dashboard/profiles/Profiles";
import Profile from "./components/profile/Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import {
  clearCurrentProfile,
  getCurrentProfile
} from "./actions/profileActions";
import attachTokenToAllRequestsHeader from "./utils/attachTokenToAllRequestsHeader";
import jwt_decode from "jwt-decode";
import EditProfile from "./components/edit-profile/EditProfile";
import Posts from "./components/posts/Posts";
import NotFound from "./components/not-found/NotFound";
import Post from "./components/post/Post";

//Each time the app is refreshed, it should maintain login state
const token = localStorage.getItem("jwt-token");
if (token) {
  //bind token to request headers
  attachTokenToAllRequestsHeader(token);

  // Set current user
  const decodedUser = jwt_decode(token);
  store.dispatch(setCurrentUser(decodedUser));
  store.dispatch(getCurrentProfile());
  //check for token expiration
  const currentTime = Date.now() / 1000;

  if (decodedUser.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/profile/:handle" exact component={Profile} />
              <Route path="/notfound" exact component={NotFound} />

              <PrivateRoute path="/dashboard" exact component={Dashboard} />

              <PrivateRoute
                path="/create-profile"
                exact
                component={CreateProfile}
              />

              <PrivateRoute
                path="/edit-profile"
                exact
                component={EditProfile}
              />

              <PrivateRoute
                path="/add-experience"
                exact
                component={AddExperience}
              />

              <PrivateRoute
                path="/add-education"
                exact
                component={AddEducation}
              />

              <PrivateRoute path="/feed" exact component={Posts} />

              <PrivateRoute path="/post/:id" exact component={Post} />
              <Route component={NotFound} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
