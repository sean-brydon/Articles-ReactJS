import axios from 'axios';
import { returnErrors } from './errorActions';
import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT_SUCCESS
} from './types';

export const loadUser = () => (dispatch, getState) => {
	//Load user
	dispatch({ type: USER_LOADING });

	// Get cached cookie

	axios
		.get('/auth/user', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({ type: AUTH_ERROR });
		});
};

//Creating a new user with axios
export const register = ({ username, password }) => (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	//Handles request
	const body = JSON.stringify({ username, password });

	axios
		.post('/users/signup', body, config)
		.then((res) =>
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));

			dispatch({
				type: REGISTER_FAIL
			});
		});
};

//Login
//---- Check username check input hash with hash associated with username
export const login = ({ username, password }) => (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	//Handles request
	const body = JSON.stringify({ username, password });

	axios
		.post('/auth', body, config)
		.then((res) =>
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));

			dispatch({
				type: LOGIN_FAIL
			});
		});
};

//Logout
//---- In theory should be just the same as removing errors when user enters a wrong passsword. Calling LOGOUT_SUCCESS
export const logout = () => {
	// Why does this work without dispatching the error ? is it because dispatch works
	// TODO https://redux.js.org/basics/actions/
	// After around 2 hours of trying to figure this out i have no idea why this doesn't need to be dispatched.
	// Hmmm => only reason i can think is because dispatch in my case is only used during axios calls? But documentation shows
	// being used normally. agh
	return {
		type: LOGOUT_SUCCESS
	};
};

// Gets tokens
// Kinda ^ Doesn't always work? -> Somtimes user can get two tokens and i have no idea how

// ------ TODO --> Refactor this somehow.  and or work on the token assign

//Help
export const tokenConfig = (getState) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	if (token) {
		config.headers['x-auth-token'] = token; // sets header token from local storage to client's local storage
	}
	return config;
};
