
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


/*
- the following for loop contains if-else conditionals
    -chose the weight as the property for the conditionals, as there was a larger spread
    -added more than required to make the sentences nicer
- the function has the function parameter 'list', which is a placeholder for the arrays of pokemon
  that are supposed to be put through the function
    - when calling the function input the array name as the function argument (variable) in the parentheses
*/
function printArrayDetails (list){
  for ( let i = 0; i < list.length; i++){
    document.write(list[i].name)
    if (list[i].weight < 50 && list[i].weight > 10) {
      document.write(" is an average sized pokemon ");
    }
    else if (list[i].weight < 10) {
      document.write(" is a small pokemon ");
    }
    else {
      document.write(" is a really large pokemon. WOW! ");
    }
    document.write("(" + list[i].weight + "kg). <br>");
  }
}

printArrayDetails(pokemonList);
printArrayDetails(pokemonList2);
