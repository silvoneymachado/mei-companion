import { AddCircle, Receipt, Description } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";

const Dashboard: NextApplicationPage<React.FC> = () => {
  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <CardHeader
            title="DashBoard"
            action={
              <Grid container spacing={2} justifyContent="row">
                <Grid item>
                  <Link href="/invoices/[pid]" as="/invoices/new">
                    <Button variant="outlined" startIcon={<Receipt />}>
                      Nova NF-e
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/expenses/[pid]" as="/expenses/new">
                    <Button variant="outlined" startIcon={<Description />}>
                      Nova Despesa
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            }
          />
          <CardContent></CardContent>
        </Container>
      </Card>
    </Layout>
  );
};

Dashboard.auth = true;

export default Dashboard;
