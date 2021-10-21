import { Container, Typography } from "@mui/material";
import React from "react";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";

// import { Container } from './styles';

const Dashboard: NextApplicationPage<React.FC> = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography variant="h2">DashBoard</Typography>
      </Container>
    </Layout>
  );
};

Dashboard.auth = true;

export default Dashboard;
