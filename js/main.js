var apiKey = 'vIrkw0zTaB0xGuFESxisI1NuaqV5vJqz';
var defaultCall = 'https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?&api-key=';
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
var $returnHomeButton = document.getElementById('button2');
var $returnHomeButtonCategory = document.getElementById('button3');
var $returnHomeSearch = document.getElementById('button6');
var $authorSearchButton = document.getElementById('authorSearchButton');
var $categorySearchButton = document.getElementById('categorySearchButton');
var $inputForm = document.getElementById('input-form');
var searchByText = document.getElementById('searchBy');

var request;

// default data request.
function requestData(apiKey) {
  if (display === true) {
    request = new XMLHttpRequest();
    request.open('GET', defaultCall + apiKey, true);
    request.responseType = 'json';
    request.addEventListener('load', function () {
      var booksResponse = request.response;
      var booksResponseObject = booksResponse.results;
      var booksArray = booksResponseObject.books;
      for (var i = 9; i >= 0; i--) {
        var book = renderEntry(booksArray[i]);
        event.target.book = book;
        $row.appendChild(book);
      }
    });
    request.send(null);
  }
  return request;
}

function authorRequestData(event) {
  event.preventDefault();
  searchByText.innerHTML = 'Searching...';
  var element = '.searchButtonAuthor';
  document.querySelector(element).disabled = true;
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
    if (booksArray.length === 0) {
      noResultReturnedFromSearch();
      document.querySelector(element).disabled = false;
      return;
    }

    if (searchByText.innerHTML === 'No Results... Try Again...') {
      backToDefault();
      document.querySelector(element).disabled = false;
    }

    backToDefault(booksArray.length);
    for (var i = 0; (i < 10) && (i < booksArray.length); i++) {
      var book = renderAuthorEntry(booksArray[i]);
      $rowAuthor.appendChild(book);
    }
    displayChangeAuthor(authorName1);
    $inputForm.reset();
  });
  request.send();
}

function categoryRequestData(event) {
  event.preventDefault();
  searchByText.innerHTML = 'Searching...';
  var element = '.searchButtonCategory';
  document.querySelector(element).disabled = true;
  var categoryNameSearchInput = $inputForm.search.value;
  var categoryName = generateCategorySearch($inputForm.search.value);
  var categoryCall;
  if (!categoryName.secondWord) {
    categoryCall = `https://api.nytimes.com/svc/books/v3/lists.json?list=${categoryName.firstWord}&api-key=${apiKey}`;
  } else {
    categoryCall = `https://api.nytimes.com/svc/books/v3/lists.json?list=${categoryName.firstWord}-${categoryName.secondWord}&api-key=${apiKey}`;
  }

  var request = new XMLHttpRequest();
  request.open('GET', categoryCall, true);
  document.querySelector(element).removeAttribute('id');
  request.responseType = 'json';
  request.addEventListener('load', function () {
    var booksResponse = request.response;
    var booksArray = booksResponse.results;
    if (booksArray.length === 0) {
      noResultReturnedFromSearch();
      document.querySelector(element).disabled = false;
      return;
    }

    if (searchByText.innerHTML === 'No Results... Try Again...') {
      backToDefault();
      document.querySelector(element).disabled = false;
    }

    for (var i = 0; (i < 10) && (i < booksArray.length); i++) {
      var book = renderCategoryEntry(booksArray[i]);
      $rowCategory.appendChild(book);
    }
    displayChangeCategory(categoryNameSearchInput);
    $inputForm.reset();
  });
  request.send();
}

// when user provides faulty search criteria, page chnages to let them know.
function noResultReturnedFromSearch() {
  var noResult = document.createTextNode('No Results... Try Again...');
  searchByText.innerHTML = '';
  searchByText.appendChild(noResult);
}

// When user provides valid search criteria with results, page is changed back in case they search again.
function backToDefault() {
  var defult = document.createTextNode('Search By...');
  searchByText.innerHTML = '';
  searchByText.appendChild(defult);
}

// display change.
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

// Display chnage from the 'author' cards page.
function displayChangeAuthor(authorName) {
  if (displayAuthor === true) {
    $homeContainer.setAttribute('class', 'container hidden');
    $searchContainer.setAttribute('class', 'container-search hidden');
    $authorContainer.setAttribute('class', 'container-author-results');
    $categoryContainer.setAttribute('class', 'container-category-results hidden');
    attachName(authorName);
    document.querySelector('.searchButtonAuthor').disabled = false;
    displayAuthor = false;
  } else {
    var parentNode = document.getElementById('presentation-row-author');
    $authorContainer.setAttribute('class', 'container-author-results hidden');
    $homeContainer.setAttribute('class', 'container');
    removeCards(parentNode);
    displayAuthor = true;
  }
}

// Display change from the 'categories' page.
function displayChangeCategory(categoryName) {
  if (displayCategory === true) {
    $homeContainer.setAttribute('class', 'container hidden');
    $searchContainer.setAttribute('class', 'container-search hidden');
    $authorContainer.setAttribute('class', 'container-author-results hidden');
    $categoryContainer.setAttribute('class', 'container-category-results');
    attachCategory(categoryName);
    document.querySelector('.searchButtonCategory').disabled = false;
    displayCategory = false;
  } else {
    var parentNode = document.getElementById('presentation-row-category');
    $categoryContainer.setAttribute('class', 'container-category-results hidden');
    $homeContainer.setAttribute('class', 'container');
    removeCards(parentNode);
    displayCategory = true;
  }
}

// Functionality for attaching successful results to the HTML.
function attachName(name) {
  name = document.createTextNode(name.firstName + ' ' + name.lastName);
  $searchResultAuthor.innerHTML = '';
  $searchResultAuthor.appendChild(name);
}

function attachCategory(name) {
  var catName = { categoryName: name };
  var nameEntry = document.createTextNode(catName.categoryName);
  $searchResultCategory.innerHTML = '';
  $searchResultCategory.appendChild(nameEntry);
}

// Card set up.
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
  image.setAttribute('class', 'card-image');
  headerRow.setAttribute('class', 'row header');
  firstRow.setAttribute('class', 'row display');
  secondRow.setAttribute('class', 'row display');
  thirdRow.setAttribute('class', 'row display');
  authorSpan.setAttribute('class', 'author-font-size text-overflow');
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
  cardTextHolder.appendChild(secondRow);
  card.appendChild(cardTextHolder);
  outerCard.appendChild(card);
  return outerCard;
}

// Results that come through for author and category are different,
// so different functions were made to accomodate that.
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

// Remove cards when page is changed, so they don't accumulate.
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
      anchorElement.setAttribute('target', '_blank');
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

function openModal(event) {

  const selectedElement = event.srcElement.className;
  if (selectedElement === 'far fa-heart' || selectedElement === 'fas fa-heart') {
    return;
  }
  const card = event.target.closest('.card-container');
  card.querySelector('.card-header');
  const bookTitle = card.querySelector('.title-font-size').textContent;
  document.getElementById('modal').style.display = 'block';

  const arrayOfBooks = request.response.results.books;

  for (let i = 0; i < arrayOfBooks.length - 5; i++) {
    for (var key in arrayOfBooks[i]) {
      if (arrayOfBooks[i][key] === bookTitle) {
        var bookInformation = arrayOfBooks[i];
      }
    }

  }
  var $modalImage = document.querySelector('.modal-photo');
  $modalImage.setAttribute('src', bookInformation.book_image);
  const $modalWindow = document.querySelector('.modal-window');
  const $link = $modalWindow.querySelector('a');
  if (bookInformation.author) {
    $modalWindow.querySelector('span.author-modal').textContent = bookInformation.author;
  } else {
    $modalWindow.querySelector('span.author-modal').textContent = 'Not Available';
  }

  if (bookInformation.primary_isbn13) {
    $modalWindow.querySelector('span.ISBN-modal').textContent = bookInformation.author;
  } else {
    $modalWindow.querySelector('span.ISBN-modal').textContent = 'Not Available';
  }

  if (bookInformation.publisher) {
    $modalWindow.querySelector('span.Publisher-modal').textContent = bookInformation.publisher;
  } else {
    $modalWindow.querySelector('span.Publisher-modal').textContent = 'Not Available';
  }

  if (bookInformation.description) {
    $modalWindow.querySelector('span.book-description').textContent = bookInformation.description;
  } else {
    $modalWindow.querySelector('span.book-description').textContent = 'Not Available';
  }

  if (bookInformation.weeks_on_list) {
    $modalWindow.querySelector('span.NOW-modal').textContent = ' ' + bookInformation.weeks_on_list;
  } else {
    $modalWindow.querySelector('span.NOW-modal').textContent = 'Not Available';
  }

  if (bookInformation.amazon_product_url) {
    $link.setAttribute('href', bookInformation.amazon_product_url);
  } else {
    $link.setAttribute('href', 'https://www.amazon.com/gp/product/0');
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
  categoryName.firstWord = name[0];
  if (name[1]) {
    categoryName.secondWord = name[1];
  }
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
$returnHomeButton.addEventListener('click', displayChangeAuthor);
$returnHomeSearch.addEventListener('click', displayChange);
$returnHomeButtonCategory.addEventListener('click', displayChangeCategory);
$row.addEventListener('click', openModal);
window.addEventListener('DOMContentLoaded', function () {
  requestData(apiKey);
});
