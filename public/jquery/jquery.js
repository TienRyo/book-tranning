$(document).ready(function () {
    $('#advance').toggle();
});
$(document).ready(function(){
    $("#search").change(function(){
        var keyword = $(this).val();
            $.get("/api/books",{
            keyword : keyword,
        }).then(template);
    });
});

$(document).ready(function(){
    $("#searchBasic").click(function(){
        var keyword = $('#search').val();
        $.get("/api/books",{
            keyword : keyword,
        }).then(template);
    });
});

$(document).ready(function () {
    $('#btn').click(function () {
        $('#advance').toggle();
    })
});


$(document).ready(function(){
    $("#searchAdvance").click(function(){
        var title = $('#title').val();
        var author = $('#author').val();
        var publisher = $('#publisher').val();
        $.get("/search-advance",{
            title : title,
            author: author,
            publisher : publisher
        }).then(template);
    });
});
function template(books) {
    var template = $('#bookTemplate').html();
    var resultHTML = books.map(function (book) {
        return template.replace(':bookTitle:',book.title).replace(':id:',book.id).replace(':bookAuthor:', book.author)
    }).join('');
    $('#viewBooks').html(resultHTML);
}