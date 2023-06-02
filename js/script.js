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
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('listitem');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
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
      
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal)
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
      let imageElement = document.createElement('img');
      imageElement.classList.add('pokemon-image');
      imageElement.src = pokemon.imageUrl;
      let contentElement = document.createElement('p');
      contentElement.innerText = 'HEIGHT: ' + pokemon.height;
      let contentElement2 = document.createElement('p');
      contentElement2.innerText = 'WEIGHT: ' + pokemon.weight;
      let typesElement = document.createElement('p');
      for (let i = 0; i < pokemon.types.length; i++) {
      typesElement.innerText = pokemon.types[i].type.name
      }
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      modal.appendChild(contentElement);
      modal.appendChild(contentElement2);
      modal.appendChild(typesElement);
      modalContainer.appendChild(modal);
      modalContainer.classList.add('is-visible');
      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      })
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
