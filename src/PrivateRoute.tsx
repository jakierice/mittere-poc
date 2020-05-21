import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import * as RemoteData from "@devexperts/remote-data-ts";

import { CircularProgress } from "@material-ui/core";

import { AuthContext } from "./Auth";
import AppLayout from "./AppLayout";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute(props: any) {
  const { children, ...rest } = props;

  const currentUser = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        pipe(
          currentUser,
          RemoteData.fold(
            // INITIAL
            () => null,
            // PENDING
            () => (
              <div
                style={{
                  height: "100vh",
                  width: "100vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <CircularProgress />
              </div>
            ),
            // FAILURE
            () => (
              <div
                style={{
                  height: "100vh",
                  width: "100vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                'There is an error with authentication.'
              </div>
            ),
            // SUCCESS
            user =>
              pipe(
                user,
                O.fold(
                  () => (
                    <Redirect
                      to={{ pathname: "/login", state: { from: location } }}
                    />
                  ),
                  () => <AppLayout>{children}</AppLayout>
                )
              )
          )
        )
      }
    />
  );
}

export default PrivateRoute;
