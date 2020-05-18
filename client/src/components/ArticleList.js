import './Article.css';

import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { LeaveAComment } from './LeaveAComment';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
const axios = require('axios').default;

export const ArticleList = (props) => {
	const auth = useSelector((state) => state.auth);
	const [ error, setError ] = useState(null);

	const deleteArticle = async (articles, user) => {
		if (articles.username === user.username || user.securityLevel >= 1 || user.username === 'Admin') {
			await axios({
				method: 'DELETE',
				url: 'http://localhost:5000/articles/' + articles._id,
				headers: { 'x-auth-token': localStorage.getItem('token') }
			});
			props.refresh();
		} else {
			console.log('%c Error: You are not authorized to carry out this action', 'color:red');
		}
	};

	const likeComment = async (userID, article) => {
		if (!userID) {
			setError('You must be logged in to preform this action');
			return;
		}
		const { likes } = article;
		const liked = likes.includes(userID);
		let action = 'Like';
		if (liked) {
			action = '';
		}

		axios
			.post(`http://localhost:5000/articles/like/${article._id}`, {
				action,
				userID
			})
			.then((res) => {
				props.refresh();
			})
			.catch((err) => {
				setError(err);
			});
	};

	const { isAuthenticated, user } = auth;
	const articles = props.articles;
	return articles.map((article, index) => {
		const { likes } = article;
		if (isAuthenticated) {
			if (article.username === user.username || user.username === 'Admin') {
				var perms = true;
			}
		}
		const editLink = `/article/edit/${article._id}`;
		return (
			<React.Fragment key={index}>
				{error ? alert(error) : ''}
				<div className="card">
					<div className="card-body">
						<div className="card-content">
							<h1 className="card-title">{article.title}</h1>
							<p>
								<small>
									By <strong>{article.username}</strong>
								</small>
								<small> {article._id}</small>
								{perms ? (
									<Link className="ml-2" to={editLink}>
										Edit
									</Link>
								) : (
									''
								)}
							</p>
							<p className="card-text">{article.body}</p>
							<h5>Comments</h5>
							<hr />
							{article.comments.map((comment, i) => {
								const [ username, body ] = comment;
								return (
									<div key={i}>
										<strong className="commentTitle">{username}</strong>
										<p>"{body}"</p>
										<hr />
									</div>
								);
							})}
							{isAuthenticated ? (
								<LeaveAComment user={user} id={article._id} refresh={props.refresh} />
							) : (
								''
							)}
							{console.log(user)}
							{user ? (
								<Button
									outline
									color="primary"
									className="mr-3"
									onClick={() => likeComment(user._id, article)}
								>
									Likes: {likes.length}
								</Button>
							) : (
								<Button
									outline
									color="primary"
									className="mr-3"
									onClick={() => setError('You must be logged in to preform this action')}
								>
									Likes: {likes.length} Not logged
								</Button>
							)}
							{perms ? (
								<React.Fragment>
									<Button
										id="delete"
										color="danger "
										outline
										onClick={() => deleteArticle(article, user)}
									>
										Delete
									</Button>
								</React.Fragment>
							) : (
								<br />
							)}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	});
};

export default ArticleList;
