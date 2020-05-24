import React from "react";

import { Box, Container, Typography, makeStyles } from "@material-ui/core";

import PageHeader from "./PageHeader";
import underConstructionImage from "./assets/under-construction.svg";

const useStyles = makeStyles({
  underConstructionImage: {
    maxWidth: "45vw"
  }
});

function HomePage() {
  const classes = useStyles();

  return (
    <>
      <PageHeader>Mission Control</PageHeader>
      <Container maxWidth="sm">
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          py={4}
        >
          <img
            src={underConstructionImage}
            alt="building under construction."
            className={classes.underConstructionImage}
          />
          <Typography align="center" variant="h2">
            Coming soon!
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
