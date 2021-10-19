import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { Provider as SessionProvider } from "next-auth/client";
import guard from 'next-auth';
import theme from "../theme";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { NextPage } from "next";
import AuthGuard from "../services/auth/authGuard";
import { NextApplicationPage } from "../types/types";

const App = (props: AppProps) => {
  const {
    Component,
    pageProps: { session, ...pageProps },
  }: { Component: NextApplicationPage; pageProps: any } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider
       options={{
        clientMaxAge: 60,     // Re-fetch session if cache is older than 60 seconds
        keepAlive:5 * 60, // Send keepAlive message every 5 minutes
      }}
        session={session}
      >
        {Component.auth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          // public page
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
