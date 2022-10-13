
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

  function add(pokemon) {
    pokemonList.push(pokemon)
  }

  function getAll() {
    return pokemonList;
  }

  return  {
    add: add,
    getAll: getAll
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

// writes the if-else statement forEach pokemon in the pokemonRepository
pokemonRepository.getAll().forEach(function(pokemon){
  document.write(pokemon.name)
  if (pokemon.weight < 50 && pokemon.weight > 10) {
    document.write(" is an average sized pokemon ");
  }
  else if (pokemon.weight < 10) {
    document.write(" is a small pokemon ");
  }
  else {
    document.write(" is a really large pokemon. WOW! ");
  }
  document.write("(" + pokemon.weight + "kg). <br>");
})
