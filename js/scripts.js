
// pokemonRepository contains IIFE with the add() function and getAll() function
let pokemonRepository = ( function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      types: ['grass', 'poison'],
      height: 0.7,
      weight: 6.9
    },
    {
      name: "Butterfree",
      types: ['bug', 'flying'],
      height: 1.1,
      weight: 32
    },
    {
      name: "Starmie",
      types: ['psychic', 'water'],
      height: 1.1,
      weight: 80
    },
    {
      name: "Ducklett",
      types: ['water', 'flying'],
      height: 0.5,
      weight: 5.5
    }
  ];

  // function that lets you add more pokemons to the repository if called
  function add(pokemon) {
    pokemonList.push(pokemon)
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

    // creates a button
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

  // calls the function and says what the should show in the DOM
  return  {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

}) ();

// array that contains more pokemons
let pokemonList2 = [
  {
    name: "Caterpie",
    types: ['bug'],
    height: 0.3,
    weight: 2.9
  },
  {
    name: "Charizard",
    types: ['fire', 'flying'],
    height: 1.7,
    weight: 90.5
  },
  {
    name: "Rapidash",
    types: ['fire'],
    height: 1.7,
    weight: 95
  },
  {
    name: "Lapras",
    types: ['water', 'ice'],
    height: 2.5,
    weight: 220
  }
];

// adds pokemons from pokemonList2 to the pokemonList in the pokemonRepository
pokemonList2.forEach(function (pokemon) {
    pokemonRepository.add(pokemon)
  });

// lists all the pokemon in the console
console.log(pokemonRepository.getAll())

// Adds a test to the DOM of the HTML h1
let pageTitle = document.querySelector('h1')
pageTitle.innerText = 'Pokedex'

// forEach loop for the pokemonRepository, calling all the pokemon in the repository,
// one at the time and running the addListItem function over each pokemons
// thereby adding each pokemon name to a button within a listItem within the unorderedPokemonList
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
})

let listTitle = document.querySelector('h2')
listTitle.innerText = 'List of Pokemons'
