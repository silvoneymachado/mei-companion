import { Receipt, Description } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { useAuth } from "../../contexts/authContext";
import { useUser } from "../../contexts/userContext";
import { NextApplicationPage } from "../../types/types";

const Dashboard: NextApplicationPage<React.FC> = () => {
  const { user } = useAuth();
  const { getById } = useUser();

  useEffect(() => {
    if (user && user.id) {
      getById(user.id);
    }
  }, [user]);

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item flexGrow={1}>
              <CardHeader title="DashBoard" />
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
          <CardContent></CardContent>
        </Container>
      </Card>
    </Layout>
  );
};

Dashboard.auth = true;

export default Dashboard;
