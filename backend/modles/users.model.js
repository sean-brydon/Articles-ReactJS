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

// userSchema.pre('save',function(next) {
//     var user = this;
//     bcrypt.hash(user.password,10,function(err,hash){
//         if(err){
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     });
// });

// userSchema.statics.authenticate = function (username, password, callback) {
//     User.findOne({ username: username })
//       .exec(function (err, user) {
//         if (err) {
//           return callback(err)
//         } else if (!user) {
//           var err = new Error('User not found.');
//           err.status = 401;
//           return callback(err);
//         }
//         bcrypt.compare(password, user.password, function (err, result) {
//           if (result === true) {
//             return callback(null, user);
//           } else {
//             return callback();
//           }
//         })
//       });
//   }

const User = mongoose.model('User', userSchema);

module.exports = User;
