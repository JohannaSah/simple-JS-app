
/*
this variable is in the form of an array
 the array is made up of 4 objects
 each object has 4 properties
 the properties have values in the form of string, an array of string values
 and numbers
 */
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

/*
the following is a for loop that contains if-else conditionals
chose the weight as the property for the conditionals, as there was a larger spread
added more than required to make the sentences nicer
*/
for ( let i = 0; i < pokemonList.length; i++){
  if (pokemonList[i].weight < 50 && pokemonList[i].weight > 10) {
    document.write(pokemonList[i].name + " is an average sized pokemon " + "(" + pokemonList[i].weight + "kg)" + ". ");
  }
  else if (pokemonList[i].weight < 10) {
    document.write(pokemonList[i].name + " is a small pokemon " + "(" + pokemonList[i].weight + "kg)" + ". ");
  }
  else {
    document.write("Wow, "+ pokemonList[i].name + " is a really large pokemon " + "(" + pokemonList[i].weight + "kg)" + ". ");
  }
}
