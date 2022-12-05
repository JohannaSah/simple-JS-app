
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

  // function to search the repository
  function search(query) {
    return pokemonRepository.getAll().filter(function(pokemon){
      return pokemon.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  // writes function forEach pokemon in the pokemonRepository,
  // adding it to a button within a listItem within the unorderedPokemonList
  function addListItem(pokemon){
    // creates a variable for the ul in the index.html
    let unorderedPokemonList = document.querySelector('.pokemon-list');

    // creates a new li (listItem) for each time the loop is run
    let listItemPokemon = document.createElement('li');
    listItemPokemon.classList.add('group-list-item', 'list-item');

    // creates a button each time the loop is run
    let button = document.createElement('button');
    // adds text to the button, in this case the called pokemon's name
    button.innerText = pokemon.name;
    // add attributes to connect it to the modal
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemon-details-modal');
    // adds a class to the button
    button.classList.add('pokemonButton', 'btn', 'btn-primary');
    // adds an evenListener to the button, leading to the pokemon details to be
    // shown in the console log
    button.addEventListener('click', function(){
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
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // function that loads the details for the pokemon
  // has a promise (fetch(url))
  // .then is a function that fetches the details from the detailsUrl
  // and adds it to the pokemon object
  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.imgUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types.map(function (item) {
        for ( i = 0; i < details.types.length; i++) {
          return item.type.name;
        }
      }).join(', ');
    }).catch(function (e) {
        console.error(e);
    });
  }
  
  function showModal (pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    // clear the modal at beginning of each loop
    modalTitle.empty();
    modalBody.empty();

    let titleElement = $('<h1>' + pokemon.name + '</h1>');
    titleElement.addClass('pokemon-name', 'pokemon-details');

    let pokemonImage = $('<img class="modal-img" style="width:50%">');
    pokemonImage.addClass('pokemon-image', 'pokemon-details');
    pokemonImage.attr('src', pokemon.imageUrl);

    let pokemonImageBack = $('<img class="modal-img" style="width:50%">');
    pokemonImageBack.addClass('pokemon-image', 'pokemon-details');
    pokemonImageBack.attr('src', pokemon.imageUrlBack);

    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + 'm' +'</p>' );
    pokemonHeight.addClass('pokemon-details');

    let pokemonWeight = $('<p>' + 'weight: ' + pokemon.weight + 'kg' +'</p>' );
    pokemonWeight.addClass('pokemon-details');

    let pokemonType = $('<p>' + 'Types: ' + pokemon.types +'</p>' )
    pokemonType.addClass('pokemon-details');

    modalTitle.append(titleElement);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonImageBack);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonType);
  } 

  // function needed to display the info about each pokemon
  // logs the details in the console and shows them in a modal
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    })
  };
  
  
  $(document).ready(function () {
    $("#search_input").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#poke_doc *").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  return{
      add : add,
      getAll : getAll,
      addListItem:addListItem,
      showDetails:showDetails,
      loadList:loadList,
      loadDetails: loadDetails,
      search: search
    }
  })();


// first line loads all the pokemon from the api to the repository
// second-thrird line: forEach loop for the pokemonRepository, calling all the pokemon in the repository,
// one at the time and running the addListItem function over each pokemons
// thereby adding each pokemon name to a button within a listItem within the unorderedPokemonList

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
