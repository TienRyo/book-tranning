class SearchKeyword {

    /**
     *
     * @param {string} keyword
     */
    constructor (keyword){
        this.keyword = keyword;
    }

    /**
     *
     * @param sqlQuery
     * @return {Book[]}
     */
    describe(sqlQuery) {
        let keyword = this.keyword;
        return sqlQuery
            .where(keyword)
            .where({'books.deleted_at': null});
    }
}

module.exports = SearchKeyword;
