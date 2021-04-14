var apiKey = 'vIrkw0zTaB0xGuFESxisI1NuaqV5vJqz';
var defaultCall = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=';
requestData(apiKey);
var $row = document.querySelector('#presentation-row');

// var $row = document.querySelector('.row');
// 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=vIrkw0zTaB0xGuFESxisI1NuaqV5vJqz'

function requestData(apiKey) {
  var request = new XMLHttpRequest();
  request.open('GET', defaultCall + apiKey, true);
  request.responseType = 'json';
  request.addEventListener('load', function () {
    var booksResponse = request.response;
    var booksResponseObject = booksResponse.results;
    var booksArray = booksResponseObject.books;
    for (var i = 0; i < 10; i++) {
      var book = renderEntry(booksArray[i]);
      $row.appendChild(book);
    }
  });
  request.send(null);
}

function renderEntry(entry) {
  var finalCard = document.createElement('div');
  var column = document.createElement('div');
  var header = document.createElement('h3');
  var author = document.createElement('p');
  var title = document.createElement('p');
  var image = document.createElement('img');
  var cardTextHolder = document.createElement('div');
  var bookImage = entry.book_image;

  var numberHeading = document.createTextNode('#' + entry.rank);
  var authorEntry = document.createTextNode('Author: ' + entry.author);
  var titleEntry = document.createTextNode('Title: ' + entry.title);
  header.appendChild(numberHeading);
  author.appendChild(authorEntry);
  title.appendChild(titleEntry);

  finalCard.setAttribute('class', 'display-card');
  header.setAttribute('class', 'card-header');
  column.setAttribute('class', 'column-full');
  image.setAttribute('src', bookImage);
  cardTextHolder.setAttribute('class', 'card-text-holder');

  finalCard.appendChild(header);
  finalCard.appendChild(image);
  cardTextHolder.appendChild(author);
  cardTextHolder.appendChild(title);
  finalCard.appendChild(cardTextHolder);
  return finalCard;
}
