import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.module.css';

import { Provider, connect } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { EditArticle } from './components/EditArticle';
import NaviBar from './components/NaviBar.js';
import CreateArticle from './components/CreateArticle';
import Articles from './components/Articles';
import AdminPanel from './components/auth/AdminPanel';
import ProtectedLink from './components/auth/ProtectedLink';

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}
	render() {
		return (
			<Provider store={store}>
				<Router>
					<NaviBar />
					<br />
					<Route path="/" exact component={Articles} />
					<Route path="/article/create" exact component={CreateArticle} />
					<Route path="/article/edit/:id" exact component={EditArticle} />
					<Route path="/Admin/promote" component={AdminPanel} />
				</Router>
			</Provider>
		);
	}
}
export default App;
