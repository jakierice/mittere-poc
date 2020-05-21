import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";
import ContactsPage from "./ContactsPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <PrivateRoute exact path="/home">
            <HomePage />
          </PrivateRoute>
          <PrivateRoute path="/contacts">
            <ContactsPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
