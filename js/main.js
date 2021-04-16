var apiKey = 'vIrkw0zTaB0xGuFESxisI1NuaqV5vJqz';
var defaultCall = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=';
var developAuthorCall = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?author=Cormac%McCarthy&api-key=${apiKey}`;
requestData(apiKey);
var $row = document.querySelector('#presentation-row');
var $homeContainer = document.querySelector('.container');
var $searchContainer = document.querySelector('.container-search');
var $authorContainer = document.querySelector('.container-author-results');
var $homeButton = document.getElementById('button1');
var $authorSearchButton = document.getElementById('authorSearchButton');
var $inputForm = document.getElementById('input-form');
var display = true;
var displayAuthor = true;

function authorRequestData(event) {
  event.preventDefault();
  var authorName = generateFirstLastName($inputForm.search.value);
  var authorCall = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?author=${authorName.firstName}%${authorName.lastName}&api-key=${apiKey}`;
  var request = new XMLHttpRequest();
  request.open('GET', authorCall, true);
  request.responseType = 'json';
  request.addEventListener('load', function () {
    var booksResponse = request.response;
    var booksResponseObject = booksResponse.results;
    var booksArray = booksResponseObject;
    console.log(booksArray);
    for (var i = booksArray.length; i >= 0; i--) {
      var book = renderAuthorEntry(booksArray[i]);
      $row.appendChild(book);
    }
  });
  $inputForm.reset();
  request.send(null);
  displayChangeAuthor();
}

function generateFirstLastName(name) {
  var authorName = {}; name = name.split(' '); authorName.firstName = name[0]; authorName.lastName = name[1];
  return authorName;
}

function requestData(apiKey) {
  var request = new XMLHttpRequest();
  request.open('GET', defaultCall + apiKey, true);
  request.responseType = 'json';
  request.addEventListener('load', function () {
    var booksResponse = request.response;
    console.log(booksResponse);
    var booksResponseObject = booksResponse.results;
    var booksArray = booksResponseObject.books;
    for (var i = 9; i >= 0; i--) {
      var book = renderEntry(booksArray[i]);
      $row.appendChild(book);
    }
  });
  request.send(null);
}

function displayChange() {
  if (display === true) {
    $homeContainer.setAttribute('class', 'container hidden');
    $searchContainer.setAttribute('class', 'container-search');
    display = false;
  } else {
    $homeContainer.setAttribute('class', 'container');
    $searchContainer.setAttribute('class', 'container-search hidden');
    display = true;
  }
}

function displayChangeAuthor() {
  if (displayAuthor === true) {
    $homeContainer.setAttribute('class', 'container hidden'); // this is already done.
    $searchContainer.setAttribute('class', 'container-search hidden'); //
    $authorContainer.setAttribute('class', 'container-author-results');
    displayAuthor = false;
  } else {
    $authorContainer.setAttribute('class', 'container-author-results hidden');
  }
}

function renderAuthorEntry(entry) {
  var outerCard = document.createElement('div');
  var card = document.createElement('div');
  var firstRow = document.createElement('div');
  var secondRow = document.createElement('div');

  var boldAuthor = document.createElement('b');
  var titleSpan = document.createElement('span');
  var authorSpan = document.createElement('span');
  var titleSpanElement = document.createElement('span');
  var titleParagraphElement = document.createElement('p');

  var cardTextHolder = document.createElement('div');

  var authorSlot = document.createTextNode('Author: ');
  var titleEntry = document.createTextNode('Title:  ');
  var authorNode = document.createTextNode(entry.author);
  var titleNode = document.createTextNode(entry.title);

  boldAuthor.appendChild(authorSlot);

  authorSpan.appendChild(authorNode);

  titleParagraphElement.appendChild(titleSpan);
  titleSpanElement.appendChild(titleNode);
  titleParagraphElement.appendChild(titleSpanElement);

  titleSpan.appendChild(titleEntry);

  outerCard.setAttribute('class', 'card');
  titleSpanElement.setAttribute('class', 'title-font-size');

  card.setAttribute('class', 'card-container');
  firstRow.setAttribute('class', 'row display');
  secondRow.setAttribute('class', 'row display');
  authorSpan.setAttribute('class', 'author-font-size');

  cardTextHolder.setAttribute('class', 'card-text-holder');
  titleSpan.setAttribute('class', 'title');

  firstRow.appendChild(boldAuthor);
  firstRow.appendChild(authorSpan);
  cardTextHolder.appendChild(firstRow);
  secondRow.appendChild(titleParagraphElement);
  cardTextHolder.appendChild(secondRow);
  card.appendChild(cardTextHolder);
  outerCard.appendChild(card);
  return outerCard;
}

function renderEntry(entry) {
  var outerCard = document.createElement('div');
  var card = document.createElement('div');
  var firstRow = document.createElement('div');
  var secondRow = document.createElement('div');
  var header = document.createElement('h3');
  var boldAuthor = document.createElement('b');
  var titleSpan = document.createElement('span');
  var authorSpan = document.createElement('span');
  var titleSpanElement = document.createElement('span');
  var titleParagraphElement = document.createElement('p');
  var image = document.createElement('img');
  var cardTextHolder = document.createElement('div');
  var bookImage = entry.book_image;

  var numberHeading = document.createTextNode('#' + entry.rank);
  var authorSlot = document.createTextNode('Author: ');
  var titleEntry = document.createTextNode('Title:  ');
  var authorNode = document.createTextNode(entry.author);
  var titleNode = document.createTextNode(entry.title);

  boldAuthor.appendChild(authorSlot);

  authorSpan.appendChild(authorNode);

  titleParagraphElement.appendChild(titleSpan);
  header.appendChild(numberHeading);
  titleSpanElement.appendChild(titleNode);
  titleParagraphElement.appendChild(titleSpanElement);

  titleSpan.appendChild(titleEntry);

  outerCard.setAttribute('class', 'card');
  titleSpanElement.setAttribute('class', 'title-font-size');

  card.setAttribute('class', 'card-container');
  firstRow.setAttribute('class', 'row display');
  secondRow.setAttribute('class', 'row display');
  authorSpan.setAttribute('class', 'author-font-size');
  header.setAttribute('class', 'card-header');
  image.setAttribute('src', bookImage);
  cardTextHolder.setAttribute('class', 'card-text-holder');
  titleSpan.setAttribute('class', 'title');

  card.appendChild(header);
  card.appendChild(image);
  firstRow.appendChild(boldAuthor);
  firstRow.appendChild(authorSpan);
  cardTextHolder.appendChild(firstRow);
  secondRow.appendChild(titleParagraphElement);
  cardTextHolder.appendChild(secondRow);
  card.appendChild(cardTextHolder);
  outerCard.appendChild(card);
  return outerCard;
}

$homeButton.addEventListener('click', displayChange);
$authorSearchButton.addEventListener('click', authorRequestData);
// $categorySearchButton.addEventListener('click', )
