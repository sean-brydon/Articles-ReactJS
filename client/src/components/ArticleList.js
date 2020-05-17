import './Article.css';

import React, { Component } from 'react';
import {Button} from 'reactstrap';
import { LeaveAComment } from './LeaveAComment';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {tokenConfig} from '../actions/authActions'
const axios = require('axios').default;

export class ArticleList extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired
	};

	state = {
		articles: [],
		refresh: false,
    comments: [],
    update: false
	};
	componentDidMount = async () => {
		await this.reloadHandler();
	};

	reloadHandler = async () => {
		axios.get('http://localhost:5000/articles/').then((res) => {
			const articles = res.data;
			this.setState({ articles });
		});
	};

	deleteArticle = async (articles, user) => {
		if (articles.username === user.username || user.securityLevel >= 1 || user.username === "Admin") {
			await axios({
				method: 'DELETE',
				url: 'http://localhost:5000/articles/' + articles._id,
				headers: { 'x-auth-token': localStorage.getItem('token') }
			});
			this.reloadHandler();
		} else {
			console.log('%c Error: You are not authorized to carry out this action', 'color:red');
		}
	};

  likeComment = async (userID,article) =>{
    const {likes} = article;
    const liked = likes.includes(userID);
    console.log(likes)
    let action = "Like";
    if (liked){
      action = "";
    }
    
    axios.post(`http://localhost:5000/articles/like/${article._id}`,{action,userID})
      .then((res)=>{
        this.setState({update: !this.state.update});
      }).catch((err)=>{
        this.setState({err});
      })
  }

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const { articles } = this.state;
		return articles.map((article) => {
      const {likes} = article;
			if (isAuthenticated) {
				if (article.username === user.username || user.username === 'Admin') {
					var perms = true;
				}
			}
			return (
				<div className="card" key={article._id}>
					<div className="card-body">
						<div className="card-content">
							<h1 className="card-title">{article.title}</h1>
							<p>
								<small>
									By <strong>{article.username}</strong>
								</small>
								<small> {article._id}</small>
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
							{isAuthenticated ? <LeaveAComment user={user} id={article._id} /> : ''}
                <Button outline color="primary" className="mr-3"onClick={()=>this.likeComment(user._id,article)}>
                  Likes: {likes.length}
                </Button>
                  
							{perms ? (
								<button
									id="delete"
									className="btn btn-danger"
									onClick={() => this.deleteArticle(article, user)}
								>
									Delete
								</button>
							) : (
								<br />
							)}
						</div>
					</div>
				</div>
			);
		});
	}
}
const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(ArticleList);
