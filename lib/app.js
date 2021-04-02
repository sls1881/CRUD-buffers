const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/../public`))
app.use(express.json());

//this path needs to start with a slash
app.use('/api/v1/students', require('./controllers/students'))

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
