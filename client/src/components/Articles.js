import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { ArticleList } from './ArticleList';
import { Input } from 'reactstrap';
import './Article.css';
const Articles = () => {
	const [ searchValue, setSearchValue ] = useState(null);
	const [ articles, setArticles ] = useState(null);
	const [ filteredArticles, setFilteredArticles ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ refresh, setRefresh ] = useState(false);

	//Get Articles
	useEffect(
		() => {
			setIsLoading(true);
			Axios.get('http://localhost:5000/articles/').then((res) => {
				setArticles(res.data);
				setFilteredArticles(res.data);
				setIsLoading(false);
			});
		},
		[ refresh ]
	);
	// Search Feature
	// Not sure if to uppercase is needed however this allows me to search for the value no matter what the case is
	// REGEX would have been easier g/value/ however i can't find any nice  ways of doing regex
	function search(articles, value) {
		return articles.filter((articleArray) =>
			Object.keys(articleArray).some((key) => articleArray[key].toString().toUpperCase().includes(value))
		);
	}

	const onChange = (e) => {
		setSearchValue(e.target.value);
		setFilteredArticles(search(articles, e.target.value.toUpperCase()));
	};

	const refreshPage = () => {
		setRefresh(!refresh);
	};

	if (isLoading) return <h1>Loading Articles...</h1>;
	if (!isLoading) {
		return (
			<React.Fragment>
				<div className="searchBar">
					<strong>To search by date please use the following format: YYYY-MM-DD</strong>
					<Input placeholder="Search..." onChange={onChange} />
				</div>
				{filteredArticles ? <ArticleList articles={filteredArticles} refresh={refreshPage} /> : ''}
				{/* <ArticleList articles={articles} isLoading={isLoading} /> */}
			</React.Fragment>
		);
	}
};

export default Articles;
