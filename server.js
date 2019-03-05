const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/Item');

const { mongoURI } = require('./config/keys');

// --- Inits
const app = express();

// --- Settings
app.set('port', process.env.PORT || 3000);

// --- Middlewares
app.use(bodyParser.json());

// --- DB Connect
mongoose.connect(mongoURI, { useNewUrlParser: true })
	.then(db => console.log('MongoDB Connected...'))
	.catch(error => console.log(error));

// --- Routes
app.use('/api/items', items);

// --- Server starting
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});
