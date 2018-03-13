let express           = require('express');
let path              = require('path');
let logger            = require('morgan');
let cookieParser      = require('cookie-parser');
let bodyParser        = require('body-parser');
const BookRepository  = require('./src/book/book-repository');
const connection      = require('./database/connection');
const BookFactory     = require('./src/book/book-factory');
const Searcher        = require('./src/search-services/searcher');
const PublisherSearch = require('./src/search-services/search-publisher-id');
const nunjucks        = require('nunjucks');

let index = require('./routes/index');

let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('books.repo', new BookRepository(connection));
app.set('book.searcher', new Searcher(connection, new BookFactory()));
app.set('publisher.searcher',new PublisherSearch(connection));

app.use('/', index);

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  next();
});

module.exports = app;
