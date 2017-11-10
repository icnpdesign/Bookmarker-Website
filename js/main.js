// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save a bookmark
function saveBookmark(e){
  // Get values from the form
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;
  // If form isn't complete, then it can't be submitted
  if (!checkForm(siteName,siteUrl)) {
    return false;
  }

  // Create a bookmark object
  let bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Test to see if bookmark array is empty
  if (localStorage.getItem('bookmarks') === null){
    // Make an array
    let bookmarks = [];
    // Add bookmark to the array
    bookmarks.push(bookmark);
    // Set bookmark to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  } else {
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to the array
    bookmarks.push(bookmark);
    // Set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }
  // Clear the form
  document.getElementById('myForm').reset();
  // Refetch bookmarks
  fetchBookmarks();
  // Prevent the form from submitting
  e.preventDefault();
}


// Deleting a bookmark
function deleteBookmark(url){
  // Fetch bookmarks
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for(let i = 0; i < bookmarks.length; i++){
    if (bookmarks[i].url === url){
      // Remove from the array
      bookmarks.splice(i, 1);
    }
    // Set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Refetch bookmarks
    fetchBookmarks();
  }
}

// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  let bookmarksResults = document.getElementById('bookmarksResults');

  // Build output div for each result
  bookmarksResults.innerHTML = "";
  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;
    // Add the HTML for the results
    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>' +name+
                                    '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                    '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}

// Check the form to make sure values aren't missing/not correct
function checkForm (siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }
  // Regular Expression to verify it's in url format (opensource)
  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);
  // If website isn't in url format
  if (!siteUrl.match(regex)){
    alert('Please use a valid url');
    return false;
  } else {
    return true;
  }
}
