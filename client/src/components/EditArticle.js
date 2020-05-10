import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
export const EditArticle = () => {
	const userInfomation = useSelector((state) => state.auth.user);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ error, setError ] = useState(false);
	const [ articles, setArticles ] = useState(false);
	// console.log(userInfomation);
	if (userInfomation) {
		if (!articles) {
			let articlesApi = '/articles/';
			if (userInfomation.username != 'Admin') {
				articlesApi = `/articles/${userInfomation.username}`;
			} else {
				articlesApi = '/articles/';
			}
			// Axios.get(articlesApi)
			// 	.then((res) => {
			// 		setArticles(res.data);
			// 		setIsLoading(false);
			// 	})
			// 	.catch((err) => setError(err));
		}
	}

	if (isLoading) return <h1>Loading Articles...</h1>;
	if (error) return <h1>There has been an error {error}</h1>;
	return (
		<div>
			<h1>Work in progress</h1>
		</div>
	);
};
