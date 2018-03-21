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
                }
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
            publisher_id : $('span').attr('id'),
            price        : $('#price').val(),
        }).then(()=>{
            var template = $('#authorTemplate').html();
            var resultHTML = function () {
                return template.replace(':message:','success')
            };
            $('#message').html(resultHTML());
        })
    })
})
$(document).ready(function () {
    $('#put').click(function () {
        $.ajax({
            url : '/book/'.concat($('div').attr('id')),
            method : 'PUT',
            data: {
                title: $('#title').val(),
                author: $('#author').val(),
                publisher_id: $('span').attr('id') ? $('span').attr('id') : $('div').attr('publisher-id'),
                price: $('#price').val(),
            }}).then(()=>{
            var template = $('#authorTemplate').html();
            var resultHTML = function () {
                return template.replace(':message:','success')
            };
            $('#message').html(resultHTML());
        })
    })
})