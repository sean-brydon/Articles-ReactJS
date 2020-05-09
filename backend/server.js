const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = config.get('mongoURI');
mongoose.connect('mongodb://localhost:27017/CMP109', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('\n---MongoDB database connection found---');
});

app.use('/users', require('./routes/users'));
app.use('/articles', require('./routes/articles'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
	console.log(`server is running on port : ${port}`);
});
