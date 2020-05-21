import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Typography } from '@material-ui/core';

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import ContactsPage from "./ContactsPage";
import LoginPage from "./LoginPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Typography variant="h1">Mittere</Typography>
            <Typography variant="body1">
              Take control of your support pipeline so you can support the
              world.
            </Typography>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute exact path="/home">
            <Typography variant="h1">Welcome to Mittere!</Typography>
          </PrivateRoute>
          <PrivateRoute path="/contacts">
            <ContactsPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
