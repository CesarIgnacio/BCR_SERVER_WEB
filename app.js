var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const dataController = require('./controllers/dataController');
var dataRouter = require('./controllers/dataRouter');

var viewsRouter = require('./routes/viewsRoutes');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/searchRouter');
var addRouter = require('./routes/addRouter');
var deleteRouter = require('./routes/deleteRouter');
var videoRouter = require('./routes/videoRouter');
var audioRouter = require('./routes/audioRouter');
var imageRouter = require('./routes/imageRouter');
var uploadSuccessRouter = require('./routes/uploadSuccessRouter');
var uploadFailRouter = require('./routes/uploadFailRouter');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 'public' dir has the css, js, and images dirs
// These give the html pages access to the resources stored in 
// the directories 'public' and 'dev-data'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dev-data')));

app.use('/', viewsRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/options', dataRouter);
app.use('/add', addRouter);
app.use('/delete', deleteRouter)
app.use('/image', imageRouter);
app.use('/audio', audioRouter);
app.use('/video', videoRouter);
app.use('/upload-success', uploadSuccessRouter);
app.use('/upload-fail', uploadFailRouter);

// Displays the images, videos, and audio individually
// Avoids the need of crating aa separate routing page
app.use('/media-display/:display', (req, res) => {
  const { display } = req.params;
  res.render('mediaDisplay.pug', {
    title: "Media Display",
    display,
  });
});


app.use('/images', express.static(__dirname + '/assets/images'));


// app.use('/images', express.static(__dirname + '/assets/images'));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://abrar_fahim20:Sakib43st@cluster0.n9faamf.mongodb.net/?retryWrites=true&w=majority";

//connect to the database with mongoose
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
module.exports = app;
