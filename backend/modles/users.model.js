const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		default: ''
	},
	password: {
		type: String,
		default: '',
		require: true
	},
	securityLevel: {
		type: Number,
		default: 0
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
