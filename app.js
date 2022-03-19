var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const languagesRouter = require('./routes/languages');
const publisherRouter = require('./routes/publisher');
const authorsRouter = require('./routes/authors');

var app = express();

//app.set('views', path.join(__dirname, 'public'));
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//descomente se precisar de uma view engine
//app.set('view engine', 'jade');

app.use(logger('[:date[iso]] - :method :url HTTP/:http-version :status  - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/languages', languagesRouter);
app.use('/publishers', publisherRouter);
app.use('/authors', authorsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals,ll only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
