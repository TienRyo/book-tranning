const express         = require('express');
const router          = express.Router();
const BookController  = require('../http/controller/book-controller');
const check           = require('../http/middlerware');
const checkAuthor     = require('../http/middlerware/check-author-length');
const checkTitle      =  require('../http/middlerware/check-title-length');

let bookController = new BookController();


router.get('/book/add', (req, res)=> {
    res.render('add.njk')
});


router.get('/book/detail/:id', check.searchCondition, bookController.detail);

router.get('/book/save/:id', check.searchCondition, bookController.save);

router.get('/books', check.searchCondition, bookController.search);

router.post('/book', check.bookRequest, checkTitle, checkAuthor, bookController.createBook);

router.put('/book/:id', check.bookRequest, checkTitle, checkAuthor, bookController.editBook);

router.delete('/book/:id', bookController.deleteBook);

router.get('/search-advance', check.searchCondition, bookController.searchBasic);

router.get('/api/books', check.searchCondition, bookController.searchBasic);

router.get('/searcher', check.searchCondition, bookController.searchKeyword);


module.exports = router;
