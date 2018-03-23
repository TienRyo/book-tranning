const PublisherSearchCondition = require('../../src/publisher/publisher-provider');
const connection = require('../../database/connection');
class BookController {

    createBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.add(request.book).then(result=> {
            response.status(201).render('home.njk', { books :result[0]});
        }).catch(next);
    }


    deleteBook(request, response) {
        let repo = request.app.get('books.repo');
        repo.remove(request.params.id).then(()=> {
            response.json({message : 'success'});
        });
    }

    editBook(request, response) {
        let repo = request.app.get('books.repo');
        repo.edit(request.book).then((result)=> {
            response.json(result);
        });
    }

    detail(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then(results => {
                if(results)
                    response.render('detail.njk', {book : results[0]});
            })
            .catch(next)
    }
    searchKeyword(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then((results) => response.json(results.map(books=>books.toJson())))
            .catch(next)
    }
    searchBasic(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then((results) => response.json(results.map(books=>books.toJson())))
            .catch(next)
    }
    search(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then((results) => response.render('home.njk',{books:results}))
            .catch(next)
    }
    save(request, response, next) {
        let publisher = new PublisherSearchCondition(connection);
        publisher.describe().then(publishers =>{
        if(request.params.id) {
            request.app.get('book.searcher').search(request.condition)
                .then((results) => response.render('save.njk', { book : results[0], publishers : publishers}))
        } else {
            response.render('save.njk', { publishers : publishers})
        }}).catch(next);
    }
}

module.exports = BookController;