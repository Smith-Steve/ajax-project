/* exported data */
var data = {
  view: 'favorited-book',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousToDoJSON = localStorage.getItem('favorited-books');

if (previousToDoJSON !== null) {
  data = JSON.parse(previousToDoJSON);
}

window.addEventListener('beforeunload', function (event) {
  var transformToJSON = JSON.stringify(data);
  localStorage.setItem('favorited-books', transformToJSON);
});
