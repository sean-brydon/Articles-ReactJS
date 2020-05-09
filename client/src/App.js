import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.module.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import NaviBar from './components/NaviBar.js';
import ArticleList from './components/ArticleList';
import CreateArticle from './components/CreateArticle';

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
					<Route path='/' exact component={ArticleList} />
					<Route path='/article/create' exact component={CreateArticle} />
				</Router>
			</Provider>
		);
	}
}

export default App;
