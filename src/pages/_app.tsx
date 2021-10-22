import { AppProps } from "next/app";
import React, { useEffect } from "react";
import theme from "../theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthGuard from "../services/auth/authGuard";
import { NextApplicationPage } from "../types/types";
import { AlertProvider } from "../contexts/alertContext";
import { AuthProvider } from "../contexts/authContext";
import { PartnerProvider } from "../contexts/partnerContext";
import { InvoiceProvider } from "../contexts/invoiceContext";
import { CategoryProvider } from "../contexts/categoryContext";

const App = (props: AppProps) => {
  const {
    Component,
    pageProps: { ...pageProps },
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
      <AlertProvider>
        <CssBaseline />
        <AuthProvider>
          {Component.auth ? (
            <AuthGuard>
              <PartnerProvider>
                <InvoiceProvider>
                  <CategoryProvider>
                    <Component {...pageProps} />
                  </CategoryProvider>
                </InvoiceProvider>
              </PartnerProvider>
            </AuthGuard>
          ) : (
            // public page
            <Component {...pageProps} />
          )}
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};

export default App;
