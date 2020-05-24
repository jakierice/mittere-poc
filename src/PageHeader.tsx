import React from "react";

import { Typography, Divider } from "@material-ui/core";

const PageHeader: React.FC<{ children: string }> = props => {
  return (
    <>
      <Typography variant="h4" component="h1">
        {props.children}
      </Typography>
      <Divider />
    </>
  );
};

export default PageHeader;
