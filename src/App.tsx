import React from 'react';

import './assets/styles/global.css';
import Routes from './routes/index';
import { AuthProvider } from './contexts/auth';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LoadingPage from './pages/LoadingPage';

function App() {
	return (
		<AuthProvider>
			<HelmetProvider>
				<Helmet titleTemplate="Proffy - %s" defaultTitle="Proffy">
					<meta name="theme-color" content="#8257E5" />
				</Helmet>

				<Routes />
				<LoadingPage />
			</HelmetProvider>
		</AuthProvider>
	);
}

export default App;
