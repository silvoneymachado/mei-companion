import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/layout";
import AuthRenderer from "../components/authRenderer";
import SignIn from "./signin";
import SignUp from "./signup";
import { Button, Container, Divider, Grid } from "@mui/material";
import AlertComponent from "../components/alert";
import { useAuth } from "../contexts/authContext";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: 1,
      title: "Prisma is the perfect ORM for Next.js",
      content:
        "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
      published: false,
      author: {
        name: "Nikolas Burk",
        email: "burk@prisma.io",
      },
    },
  ];
  return { props: { feed } };
};

type Props = {
  // feed: PostProps[]
};

const IndexPage: React.FC<Props> = (props) => {
  const [isSignin, setIsSignin] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const renderSignInOut = () => (
    <>
      {isSignin ? (
        <SignIn />
      ) : (
        <SignUp changeIsLogin={() => setIsSignin(!isSignin)} />
      )}
      <Container maxWidth="sm">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Divider variant="fullWidth" style={{ marginTop: 20, marginBottom: 20 }} />
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setIsSignin(!isSignin)}
            >
              {isSignin ? "Nova Conta" : "Login"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <Layout>
      <AlertComponent />
      <AuthRenderer
        protectedComponent={<></>}
        fallBackComponent={renderSignInOut()}
      />
    </Layout>
  );
};

export default IndexPage;
