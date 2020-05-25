import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CssBaseline } from "@material-ui/core";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";
import ContactsPage from "./ContactsPage";
import UserAccountPage from './UserAccountPage';

import ThemeProvider from "./Theme";

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
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
            <PrivateRoute path="/account">
              <UserAccountPage />
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
