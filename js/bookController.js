'use strict'
function init() {
    createBooks();
    renderBooks();
    addTouchEvent();
}

function renderBooks() {
    var books = getBooksToRender();
    var divs = books.map(function (book) {
        return `<tr tr-id="${book.id}">
        <td class="bookId">${book.id}</td>
        <td>${book.title}</td>
        <td>$${book.price}</td>
        <td><button class="btn-primary" data-id="${book.id}" data-toggle="modal" data-target="#bookDetailsModal" onclick="onShowBookInfo(this)" >Read</button></td>
        <td><button class="btn-warning" data-id="${book.id}" data-toggle="modal" data-target="#updateBookModal" onclick="onUpdateBookModal(this)" >Update</button></td>
        <td><button class="btn-danger" data-id="${book.id}" onclick="onDeleteBook(this)">Delete</button></td>
        </tr>`
    })
    document.querySelector('.bookMenu').innerHTML = divs.join('');

}

function onDeleteBook(el) {
    var bookId = el.getAttribute('data-id');
    deleteBook(bookId);
}

function onUpdateBookModal(el) {
    var bookId = el.getAttribute('data-id');
    var book = getBookById(bookId);
    var currPrice = book.price;
    $('#updateBookButton').attr('data-id', bookId);
    $('#updatePrice').attr('placeholder', currPrice);
    $('.updateBook').show();
}

function onUpdateBook(el) {
    var bookId = el.getAttribute('data-id');
    var newPrice = $('#updatePrice').val();
    updateBookPrice(bookId, newPrice);
    $('#updatePrice').val('');
}



function onAddBookForm() {
    $('.addBook').show();
}

function onAddBook() {
    var title = $('#title').val();
    var price = $('#price').val();
    var imgurl = $('#imgurl').val();
    addBook(title, price, imgurl);
    $('#imgurl').val('');
    $('#price').val('');
    $('#title').val('');
}

function onShowBookInfo(el, bookIdMan) {
    var bookId = bookIdMan || el.getAttribute('data-id');
    $('#bookCover').attr('data-id', bookId);
    var book = getBookById(bookId);
    var imgurl = book.cover;
    $('#bookCover').attr('src', imgurl);
    $('.bookDetails').show();
    setCurrBookId(bookId);
    renderRating();
}

function onChangeRating(el, diff) {
    var bookId = getCurrBookId();
    updateBookRating(bookId, diff);

}

function renderRating() {
    var bookId = getCurrBookId();
    var book = getBookById(bookId);
    $('#bookRating').text(book.rating);
}

function onSortBy(el) {
    var sortId = $(el).attr('sort-id');
    toggleSortOrder(sortId)
    sortBy(sortId);
    renderBooks();

}

function addTouchEvent() {
   
    const elContainer = document.querySelector('.bookMenu');
    const hmrContainer = new Hammer(elContainer);

    hmrContainer.on('panleft panright', (ev) => {
        const bookId = (ev.target.closest('TR')).getAttribute('tr-id');
        if (ev.target.nodeName !== ('TD')) return;
        if (ev.type === 'panright') {
            ev.target.closest('TR').classList.add('animated', `fadeOutRight`)
            setTimeout(() => {
                deleteBook(bookId);
            }, 500)
        } else {
            ev.target.closest('TR').classList.add('animated', `flip`)
            $('#bookDetailsModal').modal('show')
            onShowBookInfo( elContainer,bookId);
            setTimeout(() => {
                ev.target.closest('TR').classList.remove('animated', `flip`)
            }, 2000)

        }
        var txt = (ev.type === 'panright') ? 'Delete' : 'Read';


    });

}