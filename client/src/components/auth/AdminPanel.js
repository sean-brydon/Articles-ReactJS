import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { History, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Table, Input, Button } from 'reactstrap';

function AdminPanel() {
	let state = useSelector((state) => state);
	let history = useHistory();
	const [ isLoading, setIsLoading ] = useState(true);
	const [ isError, setIsError ] = useState(null);
	const [ users, setUsers ] = useState(null);
	const [ input, setInput ] = useState(null);
	const [ action, setAction ] = useState(null);

	useEffect(() => {
		Axios.get('/users/')
			.then((res) => {
				setUsers(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsError(err);
				setIsLoading(false);
			});
	}, []);

	function userList() {
		return users.map((currentUser, index) => {
			return (
				<tr key={currentUser._id}>
					<th>{currentUser._id}</th>
					<th>{currentUser.username}</th>
					<th>{currentUser.securityLevel}</th>
				</tr>
			);
		});
	}
	const user = state.auth.user;
	async function onSubmit() {
		Axios.post(`http://localhost:5000/users/update`, { _id: input }).then((res) => {
			console.log(res);
		});
	}
	if (!users && isLoading && !user) return <h1>Loading all users...</h1>;
	if (isError) return <h1> You have an error {isError}</h1>;
	if (user && users) {
		return (
			<React.Fragment>
				{user.securityLevel != 1 ? history.push('/') : ''}
				{action ? <h1>{action}</h1> : ''}
				<Table>
					<thead>
						<tr>
							<th>_ID</th>
							<th>Username</th>
							<th>Security Level</th>
						</tr>
					</thead>
					<tbody>{userList()}</tbody>
				</Table>

				<Input onChange={(e) => setInput(e.target.value)} placeholder="ID:" className="w-25" />
				<Button onClick={onSubmit} outline>
					Submit
				</Button>
			</React.Fragment>
		);
	}
	return <React.Fragment />;
}

export default AdminPanel;
