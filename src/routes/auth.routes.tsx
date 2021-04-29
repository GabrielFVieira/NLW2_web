import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Recovery from '../pages/Recovery';
import ResetPassword from '../pages/ResetPassword';
import Page404 from '../pages/Page404';

function AuthRoutes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/recovery" exact component={Recovery} />
				<Route path="/recovery/:token" exact component={ResetPassword} />
				<Route component={Page404} />
			</Switch>
		</BrowserRouter>
	);
}

export default AuthRoutes;
