const BookFactory = require('../../src/book/book-factory');

module.exports    = function (req, res, next) {

    let bookFactory = new BookFactory();
    console.log(req.body);
    bookFactory.makeFromRequest(req).then(result=> {
        req.book = result;
        next();
    });
    };