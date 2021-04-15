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
    for (var i = 9; i > -1; i--) {
      var book = renderEntry(booksArray[i]);
      $row.appendChild(book);
    }
  });
  request.send(null);
}

function renderEntry(entry) {
  var card = document.createElement('div');
  var firstRow = document.createElement('row');
  var secondRow = document.createElement('row');
  var header = document.createElement('h3');
  var boldAuthor = document.createElement('b');
  var titleSpan = document.createElement('span');
  var titleParagraphElement = document.createElement('p');
  var image = document.createElement('img');
  var cardTextHolder = document.createElement('div');
  var bookImage = entry.book_image;

  var numberHeading = document.createTextNode('#' + entry.rank);
  var authorSlot = document.createTextNode('Author: '); // entry.author
  var titleEntry = document.createTextNode('Title:  '); // entry.title
  var authorNode = document.createTextNode(entry.author);
  var titleNode = document.createTextNode(entry.title);

  boldAuthor.appendChild(authorSlot);

  titleSpan.appendChild(titleEntry);
  // titleSpan.appendChild(titleNode);
  titleParagraphElement.appendChild(titleEntry);

  titleParagraphElement.appendChild(titleSpan);
  header.appendChild(numberHeading);
  titleParagraphElement.appendChild(titleNode);

  titleSpan.appendChild(titleEntry);

  card.setAttribute('class', 'card-container');
  header.setAttribute('class', 'card-header');
  image.setAttribute('src', bookImage);
  cardTextHolder.setAttribute('class', 'card-text-holder');
  titleSpan.setAttribute('class', 'title');

  card.appendChild(header);
  card.appendChild(image);
  firstRow.appendChild(boldAuthor);
  firstRow.appendChild(authorNode);
  cardTextHolder.appendChild(firstRow);
  secondRow.appendChild(titleParagraphElement);
  cardTextHolder.appendChild(secondRow);
  card.appendChild(cardTextHolder);
  return card;
}
