import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import * as RemoteData from "@devexperts/remote-data-ts";

import { Button, CircularProgress, Typography } from "@material-ui/core";

import { AuthContext, signIn } from "./Auth";

const renderLoginMessage = () => (
  <>
    <Typography variant="h1">Mittere</Typography>
    <Typography variant="body1">
      Take control of your support pipeline so you can support the world.
      <Button onClick={signIn}>Login</Button>
    </Typography>
  </>
);

function LoginPage() {
  const currentUser = useContext(AuthContext);

  return pipe(
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
  );
}

export default LoginPage;
