import { Container, Typography } from "@mui/material";
import React from "react";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";

const Partners: NextApplicationPage<React.FC> = () => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h2">Partners</Typography>
      </Container>
    </Layout>
  );
};

Partners.auth = true;

export default Partners;
