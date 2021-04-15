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
  var row1 = document.createElement('row');
  var row2 = document.createElement('row');
  var header = document.createElement('h3');
  var boldAuthor = document.createElement('b');
  var title1 = document.createElement('span');
  var boldTitle = document.createElement('b');
  var author1 = document.createElement('span');
  var title = document.createElement('b');
  var image = document.createElement('img');
  var cardTextHolder = document.createElement('div');
  var bookImage = entry.book_image;

  var numberHeading = document.createTextNode('#' + entry.rank);
  var authorSlot = document.createTextNode('Author: '); // entry.author
  var titleEntry = document.createTextNode('Title: '); // entry.title
  var authorNode = document.createTextNode(entry.author);
  var titleNode = document.createTextNode(entry.title);

  author1.appendChild(authorNode);
  title1.appendChild(titleNode);

  boldAuthor.appendChild(authorSlot);
  boldTitle.appendChild(titleEntry);
  header.appendChild(numberHeading);
  title.appendChild(boldTitle);

  // author.appendChild(authorEntry);

  finalCard.setAttribute('class', 'card-container');
  header.setAttribute('class', 'card-header');
  image.setAttribute('src', bookImage);
  cardTextHolder.setAttribute('class', 'card-text-holder');
  boldTitle.setAttribute('class', 'title');

  finalCard.appendChild(header);
  finalCard.appendChild(image);
  row1.appendChild(boldAuthor);
  row1.appendChild(authorNode);
  cardTextHolder.appendChild(row1);
  // cardTextHolder.appendChild(boldAuthor); row1
  // cardTextHolder.appendChild(authorNode);
  row2.appendChild(boldTitle);
  row2.appendChild(titleNode);
  cardTextHolder.appendChild(row2);
  // cardTextHolder.appendChild(boldTitle); row2
  // cardTextHolder.appendChild(titleNode);
  finalCard.appendChild(cardTextHolder);
  return finalCard;
}
