import { Container, Grid, Divider, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import SignIn from "../signin";
import SignUp from "../signup";

// import { Container } from './styles';

const Home: React.FC = () => {
  const [isSignin, setIsSignin] = useState(true);
  return (
    <>
      <Container maxWidth="sm">
        <Grid container direction="column" maxWidth="sm" marginTop={20}>
          <Grid item>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              MEI Companion
            </Typography>
            <Typography
              variant="body1"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Não perca o controle de suas notas emitidas
            </Typography>
          {/* </Grid>
          <Grid item> */}
          </Grid>
        </Grid>
      </Container>
      {isSignin ? (
        <SignIn />
      ) : (
        <SignUp changeIsLogin={() => setIsSignin(!isSignin)} />
      )}
      <Container maxWidth="sm">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Divider
              variant="fullWidth"
              style={{ marginTop: 20, marginBottom: 20 }}
            />
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
};

export default Home;
