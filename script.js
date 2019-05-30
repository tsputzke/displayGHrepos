'use strict';

const searchUrl = 'https://api.github.com/users/';

function displayResults(repos) {
  $('#results-list').empty();

  let userRepository = [];
  
  repos.map(function(repo) {
    userRepository.push(`<li><h2><a href="${repo.html_url}">${repo.name}</a></h2></li>`)
  })

  $('#results-list').append(userRepository);

  $('#results').removeClass('hidden');
}

function getRepos(userName) {
  const url = searchUrl + userName + '/repos'

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);;
    })
    .then(repos => displayResults(repos))
    .catch(err => {
      alert(`something went wrong: ${err.message}`)
    })
}

function handleSearch() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('input').val();
    getRepos(userName);
  })
}

$(handleSearch);