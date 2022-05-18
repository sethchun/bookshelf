// var books = [
//     {
//         title: 'Harry Potter',
//         author: 'J.K. Rowling',
//         imageURL: 'https://books.google.com/books/content?id=WV8pZj_oNBwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
//         isbn: '9781921479311',
//         pageCount: 268
//     }
// ];

var renderBooks = function () {
    // First, we empty the .books <div>
    $('.books').empty();
    // Next we loop through all the books in our 'books' arr
    for (var i = 0; i < books.length; i++) {
        var source = $('#book-template').html();
        var template = Handlebars.compile(source);
        var newHTML = template(books[i]);
        $('.books').append(newHTML);
    }
};

// renderBooks();

$('.search').on('click', function() {
    var search = $("#search-query").val();

    fetch(search);
});

var fetch = function(query) {
    $.ajax({
        method: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q=" + query,
        dataType: "json",
        success: function(data) {
            addBooks(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

var addBooks = function (data) {
    books = [];

    for (var i = 0; i < data.items.length; i++) {
        var bookData = data.items[i];

        var book = {
            title: bookData.volumeInfo.title || null,
            author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors[0] : null,
            imageURL: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : null,
            pageCount: bookData.volumeInfo.pageCount || null,
            isbn: bookData.volumeInfo.industryIdentifiers ?
            bookData.volumeInfo.industryIdentifiers[0].identifier : null
        };

        books.push(book);
    }

    renderBooks();
};
