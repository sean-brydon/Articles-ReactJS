import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import { Input, Label, Form, FormGroup, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
export const EditArticle = (props) => {
	const articleID = props.match.params.id;
	const [ articleInfo, setArticleInfo ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ error, setError ] = useState(null);

	const [ title, setTitle ] = useState(null);
	const [ body, setBody ] = useState(null);
	const [ response, setResponse ] = useState(null);
	useEffect(
		() => {
			setIsLoading(true);
			Axios.get(`http://localhost:5000/articles/${articleID}`)
				.then((res) => {
					setArticleInfo(res.data);
					setTitle(res.data.title);
					setBody(res.data.body);
					setIsLoading(false);
				})
				.catch((error) => {
					setError(error);
				});
		},
		[ articleID ]
	);

	const onSubmit = (e) => {
		e.preventDefault();
		const data = {
			...articleInfo,
			title,
			body
		};
		Axios.post(`/articles/update/${articleID}`, data, tokenConfig()).then((res) => {
			setResponse(res);
			history.push('/');
		});
	};
	const history = useHistory();
	if (isLoading) return <h1>Loading Article...</h1>;
	if (error) return <h1>There has been an error {error}</h1>;
	if (articleInfo) {
		return (
			<div className="container">
				{response ? 'Post updated' : ''}
				<Form>
					<h1>Editing Article with the id {articleID}</h1>
					<h3>Title</h3>
					<Input value={title} onChange={(e) => setTitle(e.target.value)} />
					<br />
					<FormGroup>
						<Label for="ArticleBody">Body</Label>
						<Input
							type="textarea"
							name="text"
							id="ArticleBody"
							value={body}
							className="h-300"
							rows={30}
							cols={50}
							onChange={(e) => setBody(e.target.value)}
						/>
					</FormGroup>
					<Button outline color="primary" type="submit" onClick={onSubmit}>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
};
