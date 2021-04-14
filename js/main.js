var apiKey = 'vIrkw0zTaB0xGuFESxisI1NuaqV5vJqz';
// var $row = document.querySelector('.row');

function getNYTimesData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?author=Cormac%20McCarthy&offset=20&api-key=' + apiKey);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
  });
  xhr.send();
}

getNYTimesData();
