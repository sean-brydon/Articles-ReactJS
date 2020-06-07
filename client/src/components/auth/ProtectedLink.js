import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const user = useSelector((state) => state.auth.user);
	return (
		<Route
			{...rest}
			render={(props) => (user.securityLevel >= 1 ? <Component {...props} /> : <Redirect to="/" />)}
		/>
	);
};

export default PrivateRoute;
