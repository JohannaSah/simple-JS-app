
// Adds a text to the DOM of the HTML h1
let pageTitle = document.querySelector('h1');
pageTitle.innerText = 'Pokedex';

//TItle of the pokemon list that follows
let listTitle = document.querySelector('h2');
listTitle.innerText = 'List of Pokemons';

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
      typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon)
    }
    else {
      console.log('pokemon is not correct');
    }

  }

  // function prints all the pokemon in the reopsitory when called
  function getAll() {
    return pokemonList;
  }

  // function needed to add the evenListener to button in the next function
  // will lead to the pokemon details being shown in the console log, when the
  //button is clicked
  function showDetails(pokemon) {
    console.log(pokemon)
  }

  // writes function forEach pokemon in the pokemonRepository,
  // adding it to a button within a listItem within the unorderedPokemonList
  function addListItem(pokemon){
    // creates a variable for the ul in the index.html
    let unorderedPokemonList = document.querySelector('.pokemon-list');

    // creates a new li (listItem) for each time the loop is run
    let listItemPokemon = document.createElement('li');

    // creates a button each time the loop is run
    let button = document.createElement('button');
    // adds text to the button, in this case the called pokemon's name
    button.innerText = pokemon.name;
    // adds a class to the button called pokemonButton
    button.classList.add('pokemonButton');
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
    return fetch(apiURL).then(function (response) {
      return response.json ();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // function that loads the details for the pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (repsonse) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // calls the function and says what the should show in the DOM
  return  {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
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

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}
