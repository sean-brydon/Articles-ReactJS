const router = require('express').Router();
let User = require('../modles/users.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) => {
	User.find().then((users) => res.json(users)).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
	console.log(req.body);
	User.findByIdAndUpdate(req.body._id, { securityLevel: 1 }, (err, res) => {
		if (err) console.log(err);
		if (res) console.log(res);
	});
});

router.route('/signup').post((req, res) => {
	const { username, password, secuityLevel } = req.body;

	if (!username || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	User.findOne({ username }).then((user) => {
		if (user) return res.status(400).json({ msg: 'This user already excists!' });

		const newUser = new User({ username, password, secuityLevel });

		//Create hash somehow?
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
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
	});
});
module.exports = router;
