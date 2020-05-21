import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import * as RemoteData from "@devexperts/remote-data-ts";

import {
  makeStyles,
  Button,
  Box,
  Paper,
  CircularProgress,
  Typography
} from "@material-ui/core";

import { AuthContext, signIn } from "./Auth";

const renderLoginMessage = () => (
  <Paper elevation={4}>
    <Box
      padding={8}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h1" align="center">
        Mittere
      </Typography>
      <Typography variant="subtitle1" align="center">
        Take control of your support pipeline so you can support the world.
      </Typography>
      <Box m={2}>
        <Button variant="contained" color="primary" onClick={signIn}>
          Login
        </Button>
      </Box>
    </Box>
  </Paper>
);

function LandingPage() {
  const currentUser = useContext(AuthContext);

  return (
    <Box p={16}>
      {pipe(
        currentUser,
        RemoteData.fold(
          () => null,
          () => <CircularProgress />,
          () => (
            <Typography>'There is an error with authentication.'</Typography>
          ),
          user =>
            pipe(
              user,
              O.fold(renderLoginMessage, () => <Redirect to="/home" />)
            )
        )
      )}
    </Box>
  );
}

export default LandingPage;
