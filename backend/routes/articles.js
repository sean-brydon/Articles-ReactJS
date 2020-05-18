const express = require('express');
const router = express.Router();
let Articles = require('../modles/articles.model');
const auth = require('./middleware/auth');

router.get('/', (req, res) => {
	Articles.find().then((articles) => res.json(articles)).catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
	const title = req.body.title;
	const username = req.body.username;
	const body = req.body.body;
	const img = req.body.img;
	const date = Date.parse(req.body.date);
	const likes = Number(req.body.likes);

	const newArticle = new Articles({
		title,
		username,
		body,
		img,
		date,
		likes
	});

	newArticle.save().then(() => res.json('Article Added!')).catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
	Articles.findById(req.params.id)
		.then((articles) => res.json(articles))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:username', (req, res) => {
	Articles.find({ username: req.params.username })
		.then((articles) => res.json(articles))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
	Articles.findByIdAndDelete(req.params.id)
		.then((articles) => res.json(articles))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', auth, (req, res) => {
	Articles.findById(req.params.id)
		.then((articles) => {
			articles.title = req.body.title;
			articles.username = req.body.username;
			articles.body = req.body.body;
			articles.img = req.body.img;
			articles.date = Date.parse(req.body.date);
			articles.likes = Number(req.body.likes);

			articles
				.save()
				.then(() => res.json('Article Updated'))
				.catch((err) => res.status(400).json('Error : ' + err));
		})
		.catch((err) => res.status(400).json('Error : ' + err));
});

router.post('/addComment/', (req, res) => {
	Articles.findOneAndUpdate(
		{ _id: req.body.articleID },
		{
			$push: {
				comments: [ [ req.body.username, req.body.text ] ]
			}
		},
		{ upset: true },
		(err, result) => {
			if (err) {
				res.send(err);
			} else {
				res.send(result);
			}
		}
	);
});

router.post('/like/:id', (req, res, next) => {
	const { action, userID } = req.body;
	const articleID = req.params.id;
	const counter = action === 'Like' ? 1 : -1;
	if (counter === 1) {
		Articles.updateOne(
			{ _id: req.params.id },
			{
				$push: {
					likes: [ userID ]
				}
			},
			{},
			(err, numberAffected) => {
				res.send(`Liked Post ${req.params.id}`);
			}
		);
	} else {
		Articles.updateOne({ _id: req.params.id }, { $pull: { likes: userID } }, {}, (err, affected) => {
			res.send(`Unliked posted ${req.params.id}`);
		});
	}
});

module.exports = router;
