let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Squirtle',
      height: 0.5,
      types: ['water'],
    }, 
    {
      name: 'Nidoran',
      height: 1.4,
      types: ['poison'],
    }, 
    {
      name: 'Ekans',
      height: 2,
      types: ['poison'],
    }, 
  ];

  function add (pokemon) {
    if (typeof pokemon === "object" && 
      "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Not A Pokemon")
    }
    
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem (pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    pokemonList.appendChild(button);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails (pokemon) {
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  }
})();


pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
