import React, { Component, Redirect } from 'react';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const axios = require('axios').default;

class CreateArticle extends Component {
	state = {
		username: '',
		title: '',
		body: '',
		date: Date.now()
	};

	static propTypes = {
		auth: PropTypes.object.isRequired
	};
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = (e) => {
		window.location.href = '/';
		const { user } = this.props.auth;
		e.preventDefault();
		// const{ title, body } = this.state;
		const article = {
			title: this.state.title,
			username: user.username,
			body: this.state.body,
			img: '',
			date: '',
			likes: 0
		};

		axios({
			method: 'post',
			url: 'http://localhost:5000/articles/add',
			data: {
				title: this.state.title,
				username: user.username,
				body: this.state.body,
				img: '',
				date: todaysDate(),
				likes: 0
			}
		});
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;
		if (isAuthenticated) {
			return (
				<form className="form-horizontal" onSubmit={this.onSubmit}>
					<legend className="col-md">Create a new article</legend>

					<label className="col-md-4 control-label" htmlFor="username">
						Welcome <strong>{user.username}</strong>
					</label>
					<div className="col-md-4" />

					<div className="form-group">
						<label className="col-md-4 control-label" htmlFor="title">
							Title
						</label>
						<div className="col-md-4">
							<input
								id="title"
								name="title"
								type="text"
								onChange={this.onChange}
								className="form-control input-md"
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-md-4 control-label" htmlFor="body">
							Body Content
						</label>
						<div className="col-md">
							<textarea className="form-control" id="body" name="body" onChange={this.onChange} />
						</div>
					</div>

					<div className="form-group">
						<label className="col-md-4 control-label" htmlFor="submit" />
						<div className="col-md-4">
							<button id="submit" name="Submit" className="btn btn-primary">
								Submit
							</button>
						</div>
					</div>
				</form>
			);
		} else {
			return <br />;
		}
	}
}
const todaysDate = () => {
	var today = new Date();
	var dd = today.getDate();

	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}
	today = yyyy + '-' + mm + '-' + dd;
	return today;
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(CreateArticle);
