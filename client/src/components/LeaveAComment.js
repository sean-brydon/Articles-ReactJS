import React, { useState } from 'react';

import axios from 'axios';

export const LeaveAComment = (props) => {
	// This is my first time using hooks :)
	const [ comment, setComment ] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();

		handleAxios();
	};

	const handleAxios = async () => {
		const req = {
			articleID: props.id,
			username: props.user.username,
			text: comment
		};
		await axios.post(`/articles/addComment/`, req);
		props.refresh();
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Comment:
				<input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
};
