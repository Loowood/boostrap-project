const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./config/db')
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api')
const viewRouter = require('./routes/view');
const app = express();
const passport = require('passport');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/hatshop/views', viewRouter);
app.use('/api', apiRouter)

process.on('SIGINT', (next) => {
	db.close(function () {
		process.exit(0)
	})
})
module.exports = app;