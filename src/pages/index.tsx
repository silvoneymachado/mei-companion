import React from "react";
import AuthRenderer from "../components/authRenderer";
import Home from "./home";
import Dashboard from "./dashboard";
import AlertComponent from "../components/alert";

const IndexPage: React.FC = () => { 
  return (
    <>
      <AlertComponent />
      <AuthRenderer
        protectedComponent={<Dashboard />}
        fallBackComponent={<Home />}
      />
    </>
  );
};

export default IndexPage;
