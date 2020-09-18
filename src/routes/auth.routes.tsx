import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import RegisterRealized from '../pages/RegisterRealized';
import Recovery from '../pages/Recovery';

function AuthRoutes() {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/register-success" component={RegisterRealized} />
			<Route path="/recovery" component={Recovery} />
		</BrowserRouter>
	);
}

export default AuthRoutes;
