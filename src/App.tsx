import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Navigation from "./Navigation";
import LoginPage from "./LoginPage";

function PublicPage() {
  return (
    <div>
      <h1>Publicly accessible page</h1>
      <p>
        Everything on this page can be accessed by the public. Login is not
        required.
      </p>
    </div>
  );
}

function ProtectedPage() {
  return (
    <div>
      <h1>Protected</h1>
      <p>
        You have to be logged in to see this page! This is where all of the good
        stuff happens. Rock your world and raise support with{" "}
        <strong>Mittere</strong>!
      </p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div>
          <hr />

          <Switch>
            <Route exact path="/">
              <h1>Welcome to Mittere!</h1>
            </Route>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}
