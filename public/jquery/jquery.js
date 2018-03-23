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
$(document).ready(function () {
    $('#formAdvance').click(function () {
        $('#advance').toggle();
        $('#Basic').toggle();
    })
});
$(document).ready(function () {
    $('#advance').toggle();
});

$(document).ready(function(){
    $("#author").change(function(){
        var author = $(this).val();
        $.get("/searcher",{
            author : author,
        }).then(result => {
            var template = $('#authorTemplate').html();
            if(result[0]) {
                var resultHTML = function () {
                    return template.replace(':message:','true')
                };
                $('#messageAuthor').html(resultHTML());
            }
            else {
                var resultHTML = function () {
                    return template.replace(':message:','false')
                };
                $('#messageAuthor').html(resultHTML());
            }

        });
    })
});
$(document).ready(function(){
    $("#publisher").change(function(){
        var publisher = $(this).val();
        $.get("/searcher",{
            'publishers.name' : publisher
        }).then(result => {
            var template = $('#publisherTemplate').html();
            if(result[0]) {
                var resultHTML = function () {
                    return template.replace(':message:','true').replace(':id:', result[0].id)
                };
                $('#messagePublisher').html(resultHTML());
            }
            else {
                var resultHTML = function () {
                    return template.replace(':message:','false')
                };
                $('#messagePublisher').html(resultHTML());
            }
        });
    })
});
$(document).ready(function () {
    $('#post').click(function () {
        $.post('/book', {
            title        : $('#title').val(),
            author       : $('#author').val(),
            publisher_id : $('#publisherId').attr('data-id'),
            price        : $('#price').val(),
        }).then(()=>{
            var template = $('#authorTemplate').html();
            var resultHTML = function () {
                return template.replace(':message:','success')
            };
            $('#message').html(resultHTML());
            $('#title').val('');
            $('#author').val('');
            $('#publisher').val('');
            $('#price').val('');
        })
    })
});
$(document).ready(function () {
    $('#put').click(function () {
        $.ajax({
            url : '/book/'.concat($('#book').attr('data-bookId')),
            method : 'PUT',
            data: {
                title: $('#title').val(),
                author: $('#author').val(),
                publisher_id: $('#publisherId').attr('data-id') ? $('#publisherId').attr('data-id') : $('#book').attr('data-publisherId'),
                price: $('#price').val(),
            }}).then(()=>{
            var template = $('#authorTemplate').html();
            var resultHTML = function () {
                return template.replace(':message:','success')
            };
            $('#message').html(resultHTML());
        })
    })
});
$('#formSearch').submit(function (e) {
        e.preventDefault();
});
