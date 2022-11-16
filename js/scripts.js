
// Adds a text to the DOM of the HTML h1
let pageTitle = document.querySelector('h1');
pageTitle.innerText = 'Pokedex';

// pokemonRepository contains IIFE with the add() function,  getAll() function,
// the showDetails function and the addListItem function, which in turn contains
// the button and EventListener
let pokemonRepository = ( function () {
  //empty array to be filled with info from the api
  let pokemonList = [];

  // api Url with a limit to 150 pokemons (there are over a 1000)
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // function that lets you add more pokemons to the repository if called
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    }
    else {
      console.log('pokemon is not correct');
    }

  }

  // function prints all the pokemon in the reopsitory when called
  function getAll() {
    return pokemonList;
  }

  // writes function forEach pokemon in the pokemonRepository,
  // adding it to a button within a listItem within the unorderedPokemonList
  function addListItem(pokemon){
    // creates a variable for the ul in the index.html
    let unorderedPokemonList = document.querySelector('.pokemon-list');

    // creates a new li (listItem) for each time the loop is run
    let listItemPokemon = document.createElement('li');
    listItemPokemon.classList.add('group-list-item')

    // creates a button each time the loop is run
    let button = document.createElement('button');
    // adds text to the button, in this case the called pokemon's name
    button.innerText = pokemon.name;
    // adds a class to the button
    button.classList.add('pokemonButton');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    // adds an evenListener to the button, leading to the pokemon details to be
    // shown in the console log
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    })

    // appends the button as a child of the li listItemPokemon
    listItemPokemon.appendChild(button);

    //appends the listItemPokemon as a child of the ul unorderedPokemonList
    unorderedPokemonList.appendChild(listItemPokemon);
  }

  // promise funtion that fetches the pokemon list using the API
  // reponse.json() fetches the information in JSOn from the api
  // for each json.results of the apiUrl the forEach loop creates a Object for
  // each pokemon with the keys name and detailsUrl
  // then the pokemon object is added to the pokemonList
  function loadList() {
    showLoadingMessage();
    return fetch(apiURL).then(function (response) {
      return response.json ();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    })
  }

  // function that loads the details for the pokemon
  // has a promise (fetch(url))
  // .then is a function that fetches the details from the detailsUrl
  // and adds it to the pokemon object
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;

    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types.map(function (item) {
        for ( i = 0; i < details.types.length; i++) {
          return item.type.name;
        }
      }).join(', ');
      hideLoadingMessage();
    }).catch(function (e) {
        console.error(e);
        hideLoadingMessage();
    });
  }
  
  function showModal (pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement ('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.classList.add('pokemon-image');
    pokemonImage.classList.add('pokemon-details');

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
    titleElement.classList.add('pokemon-name');
    titleElement.classList.add('pokemon-details');

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height: ' + pokemon.height + 'm';
    pokemonHeight.classList.add('pokemon-details');

    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = 'Weight: ' + pokemon.weight + 'kg';
    pokemonWeight.classList.add('pokemon-details');

    let pokemonType = document.createElement('p');
    pokemonType.innerText = 'Types: ' + pokemon.types;
    pokemonType.classList.add('pokemon-details');

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonImage);
    modal.appendChild(titleElement);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonWeight);
    modal.appendChild(pokemonType);
    modalContainer.appendChild(modal);

    
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

    modalContainer.classList.add('is-visible');
  }

  function hideModal () {
    let modalContainer = document.querySelector('#modal-container');

    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');

    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  } );
 

  // function needed to display the info about each pokemon
  // logs the details in the console and shows them in a modal
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  // show and hide loading message
  function showLoadingMessage() {
    let messageElement = document.createElement('div');
    messageElement.innerText = 'The data is loading';
    messageElement.classList.add('loading-message');
    messageElement.setAttribute('id', 'loadingMessage');

    let container = document.getElementById('container');
    container.appendChild(messageElement);
    container.insertBefore(messageElement, container.firstChild);

    console.log('loading message shown');
  }

  function hideLoadingMessage () {
    let messageElement = document.getElementById('loadingMessage');
    messageElement.classList.add('hide-loading-message');
    console.log('loading message removed');
  }

  // calls the function and says what the should show in the DOM
  return  {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

}) ();

// first line loads all the pokemon from the api to the repository
// second-thrird line: forEach loop for the pokemonRepository, calling all the pokemon in the repository,
// one at the time and running the addListItem function over each pokemons
// thereby adding each pokemon name to a button within a listItem within the unorderedPokemonList

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
})
