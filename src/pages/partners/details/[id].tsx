import { Container, Typography } from "@mui/material";
import React from "react";
import Layout from "../../../components/layout";
import { NextApplicationPage } from "../../../types/types";

const Details: NextApplicationPage<React.FC> = () => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h2">Partners details</Typography>
      </Container>
    </Layout>
  );
};

Details.auth = true;

export default Details;
