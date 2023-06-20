let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Not A Pokemon");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#myModal");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  function showModal(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let titleElement = document.querySelector(".modal-title");
      titleElement.innerHTML = pokemon.name;
      let imageElement = document.querySelector(".img-fluid.pokemon-image");
      imageElement.src = pokemon.imageUrl;
      let heightElement = document.querySelector(".pokemon-height");
      heightElement.innerText = "HEIGHT: " + pokemon.height;
      let weightElement = document.querySelector(".pokemon-weight");
      weightElement.innerText = "WEIGHT: " + pokemon.weight;
      let typesElement = document.querySelector(".pokemon-types");
      typesElement.innerText =
        "TYPES: " + pokemon.types.map(getAllTypes).join(" & ");
      function getAllTypes(item) {
        return [item.type.name];
      }
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  function sortByName() {
    pokemonList.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    sortByName: sortByName,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.sortByName();
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

$(document).ready(function () {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".list-group-item").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

//pagination not working

// $("#pagination-container").pagination({
//   dataSource: pokemonRepository.addListItem(pokemon),
//   pageSize: 5,
//   autoHidePrevious: true,
//   autoHideNext: true,
//   callback: function (data, pagination) {
//     // template method of yourself
//     var html = template(data);
//     $("#data-container").html(html);
//   },
// });

(function ($) {
  var paginate = {
    startPos: function (pageNumber, perPage) {
      // determine what array position to start from
      // based on current page and # per page
      return pageNumber * perPage;
    },

    getPage: function (items, startPos, perPage) {
      // declare an empty array to hold our page items
      var page = [];

      // only get items after the starting position
      items = items.slice(startPos, items.length);

      // loop remaining items until max per page
      for (var i = 0; i < perPage; i++) {
        page.push(items[i]);
      }

      return page;
    },

    totalPages: function (items, perPage) {
      // determine total number of pages
      return Math.ceil(items.length / perPage);
    },

    createBtns: function (totalPages, currentPage) {
      // create buttons to manipulate current page
      var pagination = $('<div class="pagination" />');

      // add a "first" button
      pagination.append('<span class="pagination-button">&laquo;</span>');

      // add pages inbetween
      for (var i = 1; i <= totalPages; i++) {
        // truncate list when too large
        if (totalPages > 5 && currentPage !== i) {
          // if on first two pages
          if (currentPage === 1 || currentPage === 2) {
            // show first 5 pages
            if (i > 5) continue;
            // if on last two pages
          } else if (
            currentPage === totalPages ||
            currentPage === totalPages - 1
          ) {
            // show last 5 pages
            if (i < totalPages - 4) continue;
            // otherwise show 5 pages w/ current in middle
          } else {
            if (i < currentPage - 2 || i > currentPage + 2) {
              continue;
            }
          }
        }

        // markup for page button
        var pageBtn = $('<span class="pagination-button page-num" />');

        // add active class for current page
        if (i == currentPage) {
          pageBtn.addClass("active");
        }

        // set text to the page number
        pageBtn.text(i);

        // add button to the container
        pagination.append(pageBtn);
      }

      // add a "last" button
      pagination.append($('<span class="pagination-button">&raquo;</span>'));

      return pagination;
    },

    createPage: function (items, currentPage, perPage) {
      // remove pagination from the page
      $(".pagination").remove();

      // set context for the items
      var container = items.parent(),
        // detach items from the page and cast as array
        items = items.detach().toArray(),
        // get start position and select items for page
        startPos = this.startPos(currentPage - 1, perPage),
        page = this.getPage(items, startPos, perPage);

      // loop items and readd to page
      $.each(page, function () {
        // prevent empty items that return as Window
        if (this.window === undefined) {
          container.append($(this));
        }
      });

      // prep pagination buttons and add to page
      var totalPages = this.totalPages(items, perPage),
        pageButtons = this.createBtns(totalPages, currentPage);

      container.after(pageButtons);
    },
  };

  // stuff it all into a jQuery method!
  $.fn.paginate = function (perPage) {
    var items = $(this);

    // default perPage to 5
    if (isNaN(perPage) || perPage === undefined) {
      perPage = 5;
    }

    // don't fire if fewer items than perPage
    if (items.length <= perPage) {
      return true;
    }

    // ensure items stay in the same DOM position
    if (items.length !== items.parent()[0].children.length) {
      items.wrapAll('<div class="pagination-items" />');
    }

    // paginate the items starting at page 1
    paginate.createPage(items, 1, perPage);

    // handle click events on the buttons
    $(document).on("click", ".pagination-button", function (e) {
      // get current page from active button
      var currentPage = parseInt($(".pagination-button.active").text(), 10),
        newPage = currentPage,
        totalPages = paginate.totalPages(items, perPage),
        target = $(e.target);

      // get numbered page
      newPage = parseInt(target.text(), 10);
      if (target.text() == "«") newPage = 1;
      if (target.text() == "»") newPage = totalPages;

      // ensure newPage is in available range
      if (newPage > 0 && newPage <= totalPages) {
        paginate.createPage(items, newPage, perPage);
      }
    });
  };
})(jQuery);

$(".list-group-item").paginate(20);
