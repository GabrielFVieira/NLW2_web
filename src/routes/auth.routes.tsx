import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import RegisterRealized from '../pages/RegisterRealized';
import Recovery from '../pages/Recovery';
import ResetPassword from '../pages/ResetPassword';

function AuthRoutes() {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/register-success" component={RegisterRealized} />
			<Route path="/recovery" exact component={Recovery} />
			<Route path="/recovery/:token" exact component={ResetPassword} />
		</BrowserRouter>
	);
}

export default AuthRoutes;
