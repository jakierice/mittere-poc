import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import { AuthContext } from "./Auth";

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
          O.fold(
            () => (
              <Redirect
                to={{ pathname: "/login", state: { from: location } }}
              />
            ),
            () => children
          )
        )
      }
    />
  );
}

export default PrivateRoute;
