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

  return {
    add: add,
    getAll: getAll
  }
})();



// for (let i = 0; i < pokemonList.length; i++) { 
//   if (pokemonList[i].height >= 2) {
//     document.write(pokemonList[i].name + " " + "\(height: " + pokemonList[i].height + "\)" + " - Wow, that’s big!" + "<br>");
//   } else {
//     document.write(pokemonList[i].name + " " + "\(height: " + pokemonList[i].height + "\)" + "<br>");
//   }
// }

pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height >= 2) {
        document.write(pokemon.name + " " + "\(height: " + pokemon.height + "\)" + " - Wow, that’s big!" + "<br>");
      } else {
        document.write(pokemon.name + " " + "\(height: " + pokemon.height + "\)" + "<br>");
      }
});
