let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function loadList () {
    return fetch(apiUrl).then(function (response) {
      return response.json();
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

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

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
    let pokemonList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#myModal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  function showModal (pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let titleElement = document.querySelector('.modal-title');
      titleElement.innerHTML = pokemon.name;
      let imageElement = document.querySelector('.img-fluid.pokemon-image');
      imageElement.src = pokemon.imageUrl;
      let heightElement = document.querySelector('.pokemon-height');
      heightElement.innerText = 'HEIGHT: ' + pokemon.height;
      let weightElement = document.querySelector('.pokemon-weight');
      weightElement.innerText = 'WEIGHT: ' + pokemon.weight;
      let typesElement = document.querySelector('.pokemon-types');
      typesElement.innerText = 'TYPES: ' + pokemon.types.map(getAllTypes).join(' & ');
         function getAllTypes(item) {
           return [item.type.name]}
    });
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
  });



  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  }
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
