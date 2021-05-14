import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

import './styles.css';

function LoadingPage() {
	const { promiseInProgress } = usePromiseTracker({ delay: 400 });

	return promiseInProgress ? (
		<div id="loading-page">
			<Loader type="Bars" color="var(--color-secondary)" height="100" width="100" />
		</div>
	) : null;
}

export default LoadingPage;
