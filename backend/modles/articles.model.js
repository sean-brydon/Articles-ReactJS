const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  title: { type: String, required: true },
  username: { type: String, required: true },
  body: { type: String, required: true },
  img: String,
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: { type: Array }
});

const Articles = mongoose.model('Articles', articlesSchema);

module.exports = Articles;
