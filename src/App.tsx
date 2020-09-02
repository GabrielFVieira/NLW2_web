import React from 'react';

import './assets/styles/global.css';
import Routes from './routes/index';
import { AuthProvider } from './contexts/auth';
import { Helmet } from 'react-helmet';


function App() {
  return (
    <AuthProvider>
      <Helmet>
        <title>Proffy</title>
        <meta name="theme-color" content="#8257E5" />
      </Helmet>
      
      <Routes />
    </AuthProvider>
  );
}

export default App;
