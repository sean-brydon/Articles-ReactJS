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
				<div className="container">
					<h1>New COVID-19 Lockdown Proposal Poses Unique Threat to Bitcoin’s Ongoing Momentum</h1>
					<img
						src="https://www.newsbtc.com/wp-content/uploads/2020/05/bitcoin-covid-19-lockdown-shutterstock_1729440418-860x573.jpg"
						alt="Headline"
						className="w-100"
					/>
					<h3>
						Fear, uncertainty, and doubt. FUD is among the most commonly used terms in the crypto space, as
						those three powerful emotions have the potential to cause massive, panic-induced selloffs. The
						fear of the novel coronavirus in early Q1 2020 and uncertainty over how it would impact the
						economy caused investors to doubt their investments and dumped holdings for cash in a
						catastrophic collapse and liquidity crisis. The selloff was so strong, the day is now referred
						to as Black Thursday. During the selloff, the stock market tumbled, Bitcoin crashed over 50%,
						and even safe haven assets like gold fell from highs. Later on, as things got worse, oil prices
						fell into the negative for the first time in recorded history.
					</h3>
					<h5 />
				</div>
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
