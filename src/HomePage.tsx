import React from "react";

import { Container, Typography } from "@material-ui/core";

import PageHeader from "./PageHeader";

function HomePage() {
  return (
    <Container>
      <PageHeader>Mission Control</PageHeader>
      <Typography variant="subtitle1">
        Soon this page will have all kinds of wizz-bang tools to help you build
        a network or supporters and raise money foryour missions!
      </Typography>
    </Container>
  );
}

export default HomePage;
