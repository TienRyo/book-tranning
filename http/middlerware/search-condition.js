const AdvanceSearchCondition   = require('../../src/search-services/advance-search-condition');
const KeywordSearchCondition   = require('../../src/search-services/keyword-search-condition');
const UndeletedSearchCondition = require('../../src/search-services/undeleted-search-condition');
const IdSearchCondition        = require('../../src/search-services/id-search-condition');
const SearchKeyword            = require('../../src/search-services/search-keyword');

module.exports = (req, res, next) => {
    req.condition = makeCondition(req);
    next();
};
function makeCondition(request) {
    if(request.path === '/search-advance') {
        return new AdvanceSearchCondition(request.query.title, request.query.author, request.query.publisher);
    }
    else if (request.path === '/api/books'){
        return new KeywordSearchCondition(request.query.keyword);
    }
    else if (request.path === '/books'){
        return new UndeletedSearchCondition();
    }
    else if (request.path.toString().startsWith('/book/') ) {
        return new IdSearchCondition(request.params.id);
    }
    else if (request.path === '/searcher' ) {
        return new SearchKeyword(request.query);
    }
}