var apiKey = 'vIrkw0zTaB0xGuFESxisI1NuaqV5vJqz';
var defaultCall = 'https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?author=Bill%Clinton&api-key=';
var defaultImage = 'https://demo.publishr.cloud/uploads/demo/books/493/edition/823/sale-test.png?1586175097';
var display = true;
var displayAuthor = true;
var displayCategory = true;
var $row = document.querySelector('#presentation-row');
var $rowAuthor = document.querySelector('#presentation-row-author');
var $rowCategory = document.getElementById('presentation-row-category');
var $homeContainer = document.querySelector('.container');
var $searchContainer = document.querySelector('.container-search');
var $authorContainer = document.querySelector('.container-author-results');
var $categoryContainer = document.querySelector('.container-category-results');
var $searchResultAuthor = document.getElementById('search-result-author');
var $searchResultCategory = document.getElementById('search-result-category');
var $tags = document.querySelector('a');
var $homeButton = document.getElementById('button1');
var $returnHomeAuthorButton = document.getElementById('button2');
// var $returnHomeCategoryButton = document.getElementById('button3');
var $authorSearchButton = document.getElementById('authorSearchButton');
var $categorySearchButton = document.getElementById('categorySearchButton');
var $inputForm = document.getElementById('input-form');

function requestData(apiKey) {
  if (display === true) {
    var request = new XMLHttpRequest();
    request.open('GET', defaultCall + apiKey, true);
    request.responseType = 'json';
    request.addEventListener('load', function () {
      var booksResponse = request.response;
      var booksResponseObject = booksResponse.results;
      var booksArray = booksResponseObject.books;
      for (var i = 9; i >= 0; i--) {
        var book = renderEntry(booksArray[i]);
        $row.appendChild(book);
      }
    });
    request.send(null);
  }
}

function authorRequestData(event) {
  event.preventDefault();
  var authorName = $inputForm.search.value;
  var authorName1 = generateFirstLastName(authorName);
  var authorCall = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?author=${authorName1.firstName}%${authorName1.lastName}&api-key=${apiKey}`;
  var request = new XMLHttpRequest();
  request.open('GET', authorCall, true);
  request.responseType = 'json';
  request.addEventListener('load', function () {
    var booksResponse = request.response;
    var booksResponseObject = booksResponse.results;
    var booksArray = booksResponseObject;
    for (var i = 9; i >= 0; i--) {
      var book = renderAuthorEntry(booksArray[i]);
      $rowAuthor.appendChild(book);
    }
    displayChangeAuthor(authorName);
  });
  $inputForm.reset();
  request.send(null);
}

function categoryRequestData(event) {
  event.preventDefault();
  var categoryNameSearchInput = $inputForm.search.value;
  var categoryName = generateCategorySearch($inputForm.search.value);
  var categoryCall = `https://api.nytimes.com/svc/books/v3/lists.json?list=${categoryName.firstWord}-${categoryName.secondWord}&api-key=${apiKey}`;
  var request = new XMLHttpRequest();
  request.open('GET', categoryCall, true);
  request.responseType = 'json';
  request.addEventListener('load', function () {
    var booksResponse = request.response;
    var booksArray = booksResponse.results;
    for (var i = 9; i >= 0; i--) {
      var book = renderCategoryEntry(booksArray[i]);
      $rowCategory.appendChild(book);
    }
    displayChangeCategory(categoryNameSearchInput);
  });
  $inputForm.reset();
  request.send();
}

function displayChange() {
  if (display === true) {
    $homeContainer.setAttribute('class', 'container hidden');
    $searchContainer.setAttribute('class', 'container-search');
    $authorContainer.setAttribute('class', 'container-author-results hidden');
    $categoryContainer.setAttribute('class', 'container-category-results hidden');
    display = false;
  } else {
    $homeContainer.setAttribute('class', 'container');
    $searchContainer.setAttribute('class', 'container-search hidden');
    display = true;
  }
}

function displayChangeAuthor(authorName) {
  if (displayAuthor === true) {
    $homeContainer.setAttribute('class', 'container hidden');
    $searchContainer.setAttribute('class', 'container-search hidden');
    $authorContainer.setAttribute('class', 'container-author-results');
    attachName(authorName);
    $categoryContainer.setAttribute('class', 'container-category-results hidden');
    displayAuthor = false;
  } else {
    var parentNode = document.getElementById('presentation-row-author');
    $authorContainer.setAttribute('class', 'container-author-results hidden');
    $homeContainer.setAttribute('class', 'container');
    removeCards(parentNode);
    displayAuthor = true;
  }
}

function displayChangeCategory(categoryName) {
  if (displayCategory === true) {
    $homeContainer.setAttribute('class', 'container hidden');
    $searchContainer.setAttribute('class', 'container-search hidden');
    $authorContainer.setAttribute('class', 'container-author-results hidden');
    $categoryContainer.setAttribute('class', 'container-category-results');
    attachCategory(categoryName);
    displayCategory = false;
  } else {
    var parentNode = document.getElementById('presentation-row-category');
    $categoryContainer.setAttribute('class', 'container-category-results hidden');
    removeCards(parentNode);
    $homeContainer.setAttribute('class', 'container');
    displayCategory = true;
  }
}

function attachName(name) {
  var authorName = document.createTextNode(name);
  $searchResultAuthor.appendChild(authorName);
}

function attachCategory(name) {
  var categoryName = document.createTextNode(name);
  $searchResultCategory.appendChild(categoryName);
}

function renderEntry(entry) {
  var outerCard = document.createElement('div');
  var card = document.createElement('div');
  var headerRow = document.createElement('div');
  var firstRow = document.createElement('div');
  var secondRow = document.createElement('div');
  var thirdRow = document.createElement('div');
  var header = document.createElement('h3');
  var boldAuthor = document.createElement('b');
  var titleSpan = document.createElement('span');
  var authorSpan = document.createElement('span');
  var titleSpanElement = document.createElement('span');
  var titleParagraphElement = document.createElement('p');
  var image = document.createElement('img');
  var cardTextHolder = document.createElement('div');
  var bookImage = entry.book_image === undefined ? defaultImage : entry.book_image;

  // <button type="submit" id="button1">SEARCH</button>

  var button = document.createElement('button');
  var buttonText = document.createTextNode('Open Profile');
  button.setAttribute('class', 'modalButton');
  button.appendChild(buttonText);

  var numberHeading = document.createTextNode('#' + entry.rank);
  var authorSlot = document.createTextNode('Author: ');
  var titleEntry = document.createTextNode('Title:  ');
  var authorNode = document.createTextNode(entry.author);
  var titleNode = document.createTextNode(entry.title);

  boldAuthor.appendChild(authorSlot);

  authorSpan.appendChild(authorNode);
  var iconElement = document.createElement('i');
  var currentFavoritedBooks = data.entries;

  if (currentFavoritedBooks.includes(entry.title)) {
    iconElement.setAttribute('class', 'fas fa-heart');
  } else {
    iconElement.setAttribute('class', 'far fa-heart');
  }

  titleParagraphElement.appendChild(titleSpan);
  header.appendChild(numberHeading);

  titleSpanElement.appendChild(titleNode);
  titleParagraphElement.appendChild(titleSpanElement);

  titleSpan.appendChild(titleEntry);

  outerCard.setAttribute('class', 'card');
  titleSpanElement.setAttribute('class', 'title-font-size');

  card.setAttribute('class', 'card-container');
  headerRow.setAttribute('class', 'row header');
  firstRow.setAttribute('class', 'row display');
  secondRow.setAttribute('class', 'row display');
  thirdRow.setAttribute('class', 'row display');
  authorSpan.setAttribute('class', 'author-font-size');
  header.setAttribute('class', 'card-header');
  image.setAttribute('src', bookImage);
  cardTextHolder.setAttribute('class', 'card-text-holder');
  titleSpan.setAttribute('class', 'title');

  headerRow.appendChild(header);
  headerRow.appendChild(iconElement);
  card.appendChild(headerRow);
  card.appendChild(image);
  firstRow.appendChild(boldAuthor);
  firstRow.appendChild(authorSpan);
  cardTextHolder.appendChild(firstRow);
  secondRow.appendChild(titleParagraphElement);
  thirdRow.appendChild(button);
  cardTextHolder.appendChild(secondRow);
  card.appendChild(cardTextHolder);
  card.appendChild(button);
  outerCard.appendChild(card);
  return outerCard;
}

function renderAuthorEntry(entry) {
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
  var cardTextHolder = document.createElement('div');

  var authorSlot = document.createTextNode('Author: ');
  var titleEntry = document.createTextNode('Title:  ');
  var authorNode = document.createTextNode(entry.author);
  var titleNode = document.createTextNode(entry.title);

  boldAuthor.appendChild(authorSlot);
  authorSpan.appendChild(authorNode);
  var review = reviewAddorNot(entry.reviews);

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
  header.setAttribute('class', 'card-header');
  cardTextHolder.setAttribute('class', 'card-text-holder');
  titleSpan.setAttribute('class', 'title');

  card.appendChild(header);
  firstRow.appendChild(boldAuthor);
  firstRow.appendChild(authorSpan);
  cardTextHolder.appendChild(firstRow);
  secondRow.appendChild(titleParagraphElement);
  cardTextHolder.appendChild(secondRow);
  cardTextHolder.appendChild(review);
  card.appendChild(cardTextHolder);
  outerCard.appendChild(card);
  return outerCard;
}

function renderCategoryEntry(entry) {
  var bookDetails = entry.book_details;
  var reviews = entry.reviews;
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
  var cardTextHolder = document.createElement('div');

  var authorSlot = document.createTextNode('Author: ');
  var titleEntry = document.createTextNode('Title:  ');
  var authorNode = document.createTextNode(bookDetails[0].author);
  var titleNode = document.createTextNode(bookDetails[0].title);

  var thirdRow = reviewAddorNot(reviews);

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
  header.setAttribute('class', 'card-header');
  cardTextHolder.setAttribute('class', 'card-text-holder');
  titleSpan.setAttribute('class', 'title');

  card.appendChild(header);

  firstRow.appendChild(boldAuthor);
  firstRow.appendChild(authorSpan);
  cardTextHolder.appendChild(firstRow);
  secondRow.appendChild(titleParagraphElement);
  cardTextHolder.appendChild(secondRow);
  cardTextHolder.appendChild(thirdRow);
  card.appendChild(cardTextHolder);
  outerCard.appendChild(card);
  return outerCard;
}

function removeCards(workingParentNode) {
  while (workingParentNode.querySelector('.card')) {
    workingParentNode.removeChild(workingParentNode.querySelector('.card'));
  }
}

function reviewAddorNot(reviews) {
  var row = document.createElement('row');
  var spanReviewPrompt = document.createElement('span');
  var spanIconHolder = document.createElement('span');
  row.setAttribute('class', 'row display');
  spanReviewPrompt.setAttribute('class', 'title');
  row.appendChild(spanReviewPrompt);
  var reviewsNode = document.createTextNode('Reviews: ');
  spanReviewPrompt.appendChild(reviewsNode);
  row.appendChild(spanIconHolder);
  var reviewsObject = reviews[0];
  for (var key in reviewsObject) {
    if (reviewsObject[key]) {
      var bookIcon = document.createElement('i');
      bookIcon.setAttribute('class', 'fa fa-book');
      var anchorElement = document.createElement('a');
      var link = reviewsObject[key];
      anchorElement.setAttribute('href', link);
      anchorElement.append(bookIcon);
      spanIconHolder.appendChild(anchorElement);
      row.appendChild(spanIconHolder);
    }
  }
  if (spanIconHolder.hasChildNodes($tags) === false) {
    var noResults = document.createTextNode('No Results');
    spanIconHolder.appendChild(noResults);
    spanReviewPrompt.appendChild(spanIconHolder);

    row.appendChild(spanIconHolder);
    return row;
  }
  return row;
}

function changeHeart(event) {
  var $closestAncestor = event.target.closest(event.target.tagName);
  var $closestCard = event.target.closest('.card');
  var book = $closestCard.querySelector('.title-font-size').textContent;

  var $targetClass = event.target.getAttribute('class');

  if (event.target.tagName === 'I' && $targetClass === 'far fa-heart') {
    $closestAncestor.setAttribute('class', 'fas fa-heart');
    addStorage(data, book);
  } else if (event.target.tagName === 'I' && $targetClass === 'fas fa-heart') {
    $closestAncestor.setAttribute('class', 'far fa-heart');
    removeStorage(data, book);
  }

}

function addStorage(dataObject, book) {
  dataObject.entries.push(book);
}

function removeStorage(dataObject, book) {
  var index = dataObject.entries.indexOf(book);
  dataObject.entries.splice(index, 1);
}

function generateCategorySearch(name) {
  var categoryName = {}; name = name.split(' ');
  categoryName.firstWord = name[0]; categoryName.secondWord = name[1];
  return categoryName;
}

function generateFirstLastName(name) {
  var authorName = {}; name = name.split(' '); authorName.firstName = name[0]; authorName.lastName = name[1];
  return authorName;
}

$homeButton.addEventListener('click', displayChange);
$authorSearchButton.addEventListener('click', authorRequestData);
$categorySearchButton.addEventListener('click', categoryRequestData);
$row.addEventListener('click', changeHeart);
$returnHomeAuthorButton.addEventListener('click', displayChangeAuthor);
window.addEventListener('DOMContentLoaded', function () {
  requestData(apiKey);
});
