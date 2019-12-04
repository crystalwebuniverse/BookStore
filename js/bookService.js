'use strict'
var gCurrBookId;
var gBooks = [];
var gGetNextId = 0;
var gToggleSort = [0, 0];

function getBooksToRender() {
    return gBooks;
}

function createBook(title, cover, price, rating) {
    return {
        id: getRandomID(),
        title,
        cover,
        price,
        rating: 0

    }
}

function createBooks() {

    gBooks.push(createBook("The gifts Of imperfection", '../img/gifts.jpg', "10"));
    gBooks.push(createBook("Daring Greatly", '../img/daring.jpg', "15"));
}

function deleteBook(bookId) {

    for (var i = 0; i < gBooks.length; i++) {
        if (gBooks[i].id === bookId) {
            gBooks.splice(i, 1);
            renderBooks();
        }
    } return;
}

function updateBookPrice(bookId, newPrice) {

    var bookIdx = getBookIdx(bookId);
    gBooks[bookIdx].price = newPrice;
    renderBooks();

}

function updateBookRating(bookId, diff) {
    var bookIdx = getBookIdx(bookId);
    var bookRating = gBooks[bookIdx].rating;
    if (bookRating > 0 && diff < 0) gBooks[bookIdx].rating += diff;
    if (bookRating < 10 && diff > 0) gBooks[bookIdx].rating += diff;
    renderRating();

}

function addBook(title, price, imgurl) {
    var newBook = createBook(title, imgurl, price);
    gBooks.push(newBook);
    renderBooks();

}

function getBookById(bookId) {
    var result = gBooks.find(function (book) {
        return book.id === bookId
    });
    return result;
}

function getBookIdx(bookId) {
    var index = gBooks.findIndex(function (book) {
        return book.id === bookId;
    });
    return index;
}

function setCurrBookId(bookId) {
    gCurrBookId = bookId;
}

function getCurrBookId() {
    return gCurrBookId;
}

function sortBy(sortId) {
    if (sortId === 'price' && gToggleSort[0] === 0) {
        var sortByDes = gBooks.sort(function (book1, book2) {
            return Number(book1[sortId]) - Number(book2[sortId]);
        });
        if (sortId === 'price') gToggleSort[0]++;
        return gBooks = sortByDes;

    } else if (sortId === 'price' && gToggleSort[0] === 1) {
        var sortByDes = gBooks.sort(function (book1, book2) {
            return Number(book2[sortId]) - Number(book1[sortId]);
        });
        if (sortId === 'price') gToggleSort[0]--;
        return gBooks = sortByDes;
    }

    if (sortId === 'title' && gToggleSort[1] === 0) {
        var sortByTitleDes = gBooks.sort(function (book1, book2) {
            return book1.title.toUpperCase() < book2.title.toUpperCase() ? -1 : (book1.title.toUpperCase() > book2.title.toUpperCase() ? 1 : 0)
        });
        gToggleSort[1]++;
        return gBooks = sortByTitleDes;

    } else if (sortId === 'title' && gToggleSort[1] === 1) {
        var sortByTitleDes = gBooks.sort(function (book1, book2) {
            return book1.title.toUpperCase() > book2.title.toUpperCase() ? -1 : (book1.title.toUpperCase() < book2.title.toUpperCase() ? 1 : 0)
        });
        gToggleSort[1]--;
        return gBooks = sortByTitleDes;
    }

}





//make utils

function getRandomID() {
    var chars = '1234567890'
    var id = ''
    for (let i = 0; i < 10; i++) {
        id += chars[getRandomNumber(chars.length)]
    }
    return id;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}