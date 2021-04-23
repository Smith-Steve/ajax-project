/* exported data */
var data = {
  view: 'favorited-book',
  entries: [],
  nextEntryId: 1
};

// these are confusing
var previousToDoJSON = localStorage.getItem('favorited-books');

if (previousToDoJSON !== null) {
  data = JSON.parse(previousToDoJSON);
}

window.addEventListener('click', function (event) {
  var transformToJSON = JSON.stringify(data);
  localStorage.setItem('favorited-books', transformToJSON);
});
