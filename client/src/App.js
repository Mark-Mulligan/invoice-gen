import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import blueBackground from "./images/blueBackground.jpg";
import InvoicePage from "./pages/InvoicePage";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./App.css";

class App extends React.Component {
  state = {
    isSignedIn: null,
    userId: null,
    name: null,
    imageURL: null,
    email: null,
    showStudentModal: false,
  };

  hideModal = () => {
    this.setState({ showStudentModal: false });
  };

  showModal = () => {
    this.setState({ showStudentModal: true });
  };

  setAuth = () => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          console.log("loaded auth");
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({
            isSignedIn: this.auth.isSignedIn.get(),
            userId: this.auth.currentUser.get().getId(),
          });

          if (this.auth.currentUser.get().getBasicProfile()) {
            const profile = this.auth.currentUser.get().getBasicProfile();
            this.setState({
              name: profile.getName(),
              imageURL: profile.getImageUrl(),
              email: profile.getEmail(),
            });
          }

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  };

  componentDidMount() {
    this.setAuth();
  }

  onAuthChange = () => {
    this.setState({
      isSignedIn: this.auth.isSignedIn.get(),
      userId: this.auth.currentUser.get().getId(),
    });
  };

  onSignIn = (history) => {
    this.auth.signIn().then(() => {
      this.setState({ isSignedIn: true });
      this.createNewUser(history);
    });
  };

  createNewUser(history) {
    const profile = this.auth.currentUser.get().getBasicProfile();
    const userInfo = {
      name: profile.getName(),
      email: profile.getEmail(),
      googleId: profile.getId(),
    };

    axios
      .post("/api/user", userInfo)
      .then((data) => {
        console.log(data);
        history.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onSignOut = (history) => {
    this.auth.signOut().then(() => {
      //history.push("/");
    });
  };

  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${blueBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          overflow: "scroll",
        }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BrowserRouter>
            <Route
              path="/"
              render={(props) => (
                <Navbar
                  {...props}
                  userId={this.state.userId}
                  isSignedIn={this.state.isSignedIn}
                  onSignOutClick={this.onSignOut}
                  showModal={this.showModal}
                />
              )}
            />

            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <LoginPage
                    {...props}
                    isSignedIn={this.state.isSignedIn}
                    onSignInClick={this.onSignIn}
                  />
                )}
              />
              <Route
                exact
                path="/dashboard"
                render={(props) => (
                  <DashboardPage
                    {...props}
                    isSignedIn={this.state.isSignedIn}
                    userId={this.state.userId}
                    googleName={this.state.name}
                    imageURL={this.state.imageURL}
                    email={this.state.email}
                    onSignOutClick={this.onSignOut}
                    showStudentModal={this.state.showStudentModal}
                    hideModal={this.hideModal}
                  />
                )}
              />
              <Route
                exact
                path="/createinvoice"
                render={(props) => (
                  <InvoicePage
                    {...props}
                    isSignedIn={this.state.isSignedIn}
                    userId={this.state.userId}
                    onSignOutClick={this.onSignOut}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default App;
