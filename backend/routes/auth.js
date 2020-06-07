const router = require('express').Router();
let User = require('../modles/users.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

router.route('/').post((req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	User.findOne({ username }).then((user) => {
		if (!user) return res.status(400).json({ msg: 'your username or password is incorrect' });

		//Vlidate password
		// Compare Hash
		bcrypt.compare(password, user.password).then((isValid) => {
			if (!isValid) return res.status(400).json({ msg: 'your username or password is incorrect' });

			jwt.sign(
				{ id: user.id, username: user.username },
				config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({
						token,
						user: {
							id: user.id,
							username: user.username,
							secuityLevel: user.secuityLevel
						}
					});
				}
			);
		});
	});
});

//GET Auth/user
// get users data
// private
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id).select('-password').then((user) => res.json(user));
});
module.exports = router;
