import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";

class App extends React.Component {
  state = { isSignedIn: null, userId: null };

  setAuth = () => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "email",
        }).then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({
            isSignedIn: this.auth.isSignedIn.get(),
            userId: this.auth.currentUser.get().getId(),
          });
          this.auth.isSignedIn.listen(this.onAuthChange);
        }); 
    });
  }

  componentDidMount() {
    console.log(process.env.REACT_APP_CLIENT_ID);
    console.log('this ran');
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
      history.push("/dashboard");
    });
  };

  onSignOut = (history) => {
    this.auth.signOut().then(() => {
      history.push("/");
    });
  };

  render() {
    return (
      <div style={{minHeight: "100vh",
      backgroundImage: `url()`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      overflow: 'scroll'}}>
        <BrowserRouter>
          <Route
            path="/"
            render={(props) => (
              <Navbar
                {...props}
                isSignedIn={this.state.isSignedIn}
                onSignOutClick={this.onSignOut}
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
                  onSignOutClick={this.onSignOut}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;