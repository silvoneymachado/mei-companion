import React from 'react';
import Layout from '../../components/layout';
import { NextApplicationPage } from '../../types/types';

// import { Container } from './styles';

const Dashboard: NextApplicationPage<React.FC> = () => {
  return(
      <Layout>
          <h1>Dashboard</h1>
      </Layout>
  );
}

Dashboard.auth = true;

export default Dashboard;