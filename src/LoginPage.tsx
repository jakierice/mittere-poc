import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import * as RemoteData from "@devexperts/remote-data-ts";

import { Button, CircularProgress } from "@material-ui/core";

import { AuthContext, signIn } from "./Auth";

const renderLoginMessage = () => (
  <>
    <p>Please log in to access your account.</p>
    <Button onClick={signIn}>Sign in</Button>
  </>
);

function LoginPage() {
  const currentUser = useContext(AuthContext);

  return (
    <>
      <h1>Login Page</h1>
      <div>
        {pipe(
          currentUser,
          RemoteData.fold(
            () => null,
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
            user =>
              pipe(
                user,
                O.fold(renderLoginMessage, () => <Redirect to="/home" />)
              )
          )
        )}
      </div>
    </>
  );
}

export default LoginPage;
