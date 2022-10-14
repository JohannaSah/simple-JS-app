
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

  // writes function forEach pokemon in the pokemonRepository,
  // adding it to a button within a listItem within the unorderedPokemonList
  function addListItem(pokemon){
    let unorderedPokemonList = document.querySelector('.pokemon-list');

    let listItemPokemon = document.createElement('li');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemonButton');

    listItemPokemon.appendChild(button);

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
