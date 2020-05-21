import React from "react";

import { Grid, Container, Typography } from "@material-ui/core";

function HomePage() {
  return (
    <Container>
      <Grid container>
        <Typography variant="h1">Welcome to Mittere!</Typography>
        <Typography variant="body1">
          Soon this page will have all kinds of wizz-bang tools to help you
          build a network or supporters and raise money foryour missions!
        </Typography>
      </Grid>
    </Container>
  );
}

export default HomePage;
