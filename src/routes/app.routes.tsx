import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';
import UserPerfil from '../pages/UserPerfil';
import Page404 from '../pages/Page404';

function AppRoutes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Landing} />
				<Route path="/study" component={TeacherList} />
				<Route path="/give-classes" component={TeacherForm} />
				<Route path="/user" component={UserPerfil} />
				<Route component={Page404} />
			</Switch>
		</BrowserRouter>
	);
}

export default AppRoutes;
