import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import RegisterRealized from '../pages/RegisterRealized';

function AuthRoutes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/register-success" component={RegisterRealized} />
        </BrowserRouter>
    )
}

export default AuthRoutes;