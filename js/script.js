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

for (let i = 0; i < pokemonList.length; i++) { 
  if (pokemonList[i].height >= 2) {
    document.write(pokemonList[i].name + " " + "\(height: " + pokemonList[i].height + "\)" + " - Wow, that’s big!" + "<br>");
  } else {
    document.write(pokemonList[i].name + " " + "\(height: " + pokemonList[i].height + "\)" + "<br>");
  }
}

